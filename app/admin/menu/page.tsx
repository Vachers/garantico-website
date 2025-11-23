"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Plus, Edit, Trash2, Save, X, GripVertical } from "lucide-react";

interface MenuItem {
  id?: number;
  labelTr: string;
  labelEn: string;
  href: string;
  order: number;
  menuType: "top" | "main";
  active: boolean;
}

export default function MenuManagementPage() {
  const [topMenuItems, setTopMenuItems] = useState<MenuItem[]>([]);
  const [mainMenuItems, setMainMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<number | null>(null);
  const [formData, setFormData] = useState<MenuItem>({
    labelTr: "",
    labelEn: "",
    href: "",
    order: 0,
    menuType: "main",
    active: true,
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await fetch("/api/admin/menu");
      const data = await response.json();
      if (data.success) {
        setTopMenuItems(data.topMenu || []);
        setMainMenuItems(data.mainMenu || []);
      }
    } catch (error) {
      console.error("Error fetching menu items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const url = editing
        ? `/api/admin/menu/${editing}`
        : "/api/admin/menu";
      const method = editing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        await fetchMenuItems();
        setEditing(null);
        setShowForm(false);
        setFormData({
          labelTr: "",
          labelEn: "",
          href: "",
          order: 0,
          menuType: "main",
          active: true,
        });
        alert(editing ? "Menü öğesi güncellendi!" : "Menü öğesi eklendi!");
      } else {
        alert("Hata: " + data.message);
      }
    } catch (error) {
      alert("Bir hata oluştu");
    }
  };

  const handleEdit = (item: MenuItem) => {
    setEditing(item.id!);
    setFormData(item);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Bu menü öğesini silmek istediğinize emin misiniz?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/menu/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (data.success) {
        await fetchMenuItems();
        alert("Menü öğesi silindi!");
      } else {
        alert("Hata: " + data.message);
      }
    } catch (error) {
      alert("Bir hata oluştu");
    }
  };

  if (loading) {
    return <div className="text-center py-12">Yükleniyor...</div>;
  }

  const renderMenuSection = (
    title: string,
    items: MenuItem[],
    menuType: "top" | "main"
  ) => (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              setFormData({
                labelTr: "",
                labelEn: "",
                href: "",
                order: items.length,
                menuType,
                active: true,
              });
              setEditing(null);
              setShowForm(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Yeni Ekle
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {items.length === 0 ? (
            <p className="text-text-light text-center py-4">Henüz menü öğesi yok</p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center gap-4 flex-1">
                  <GripVertical className="w-5 h-5 text-text-light" />
                  <div>
                    <p className="font-semibold text-text-dark">
                      {item.labelTr} / {item.labelEn}
                    </p>
                    <p className="text-sm text-text-light">{item.href}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(item)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(item.id!)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-text-dark mb-8">Menü Yönetimi</h1>

      <div className="space-y-8 mb-8">
        {renderMenuSection("Top Menü", topMenuItems, "top")}
        {renderMenuSection("Ana Menü", mainMenuItems, "main")}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {editing ? "Menü Öğesi Düzenle" : "Yeni Menü Öğesi"}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowForm(false);
                    setEditing(null);
                    setFormData({
                      labelTr: "",
                      labelEn: "",
                      href: "",
                      order: 0,
                      menuType: "main",
                      active: true,
                    });
                  }}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Türkçe Etiket"
                  value={formData.labelTr}
                  onChange={(e) =>
                    setFormData({ ...formData, labelTr: e.target.value })
                  }
                  placeholder="Ana Sayfa"
                />
                <Input
                  label="English Label"
                  value={formData.labelEn}
                  onChange={(e) =>
                    setFormData({ ...formData, labelEn: e.target.value })
                  }
                  placeholder="Home"
                />
              </div>
              <Input
                label="Link (href)"
                value={formData.href}
                onChange={(e) => setFormData({ ...formData, href: e.target.value })}
                placeholder="/tr veya /tr/about"
              />
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) =>
                      setFormData({ ...formData, active: e.target.checked })
                    }
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-text-dark">Aktif</span>
                </label>
              </div>
              <div className="flex gap-2">
                <Button variant="primary" onClick={handleSave} className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  {editing ? "Güncelle" : "Kaydet"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setEditing(null);
                  }}
                >
                  İptal
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

