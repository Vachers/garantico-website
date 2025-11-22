"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import Link from "next/link";

interface Product {
  id: number;
  nameTr: string;
  nameEn: string;
  slug: string;
  descriptionTr: string | null;
  descriptionEn: string | null;
  isFeatured: boolean;
  active: boolean;
  categoryId: number | null;
}

export default function ProductsManagementPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ id: number; nameTr: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch("/api/admin/products"),
        fetch("/api/admin/categories"),
      ]);

      const productsData = await productsRes.json();
      const categoriesData = await categoriesRes.json();

      if (productsData.success) {
        setProducts(productsData.data);
      }
      if (categoriesData.success) {
        setCategories(categoriesData.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditing(product.id);
    setFormData(product);
  };

  const handleSave = async () => {
    if (!editing) return;

    try {
      const response = await fetch(`/api/admin/products/${editing}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setProducts((prev) =>
          prev.map((p) => (p.id === editing ? { ...p, ...formData } : p))
        );
        setEditing(null);
        setFormData({});
        alert("Ürün başarıyla güncellendi!");
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

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-text-dark">Ürün Yönetimi</h1>
        <Link href="/admin/products/new">
          <Button variant="primary" size="md">
            <Plus className="w-4 h-4 mr-2" />
            Yeni Ürün
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {products.map((product) => (
          <Card key={product.id}>
            <CardContent className="p-6">
              {editing === product.id ? (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Türkçe İsim"
                      value={formData.nameTr || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, nameTr: e.target.value })
                      }
                    />
                    <Input
                      label="English Name"
                      value={formData.nameEn || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, nameEn: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Textarea
                      label="Türkçe Açıklama"
                      value={formData.descriptionTr || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, descriptionTr: e.target.value })
                      }
                      rows={3}
                    />
                    <Textarea
                      label="English Description"
                      value={formData.descriptionEn || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, descriptionEn: e.target.value })
                      }
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="primary" onClick={handleSave}>
                      <Save className="w-4 h-4 mr-2" />
                      Kaydet
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditing(null);
                        setFormData({});
                      }}
                    >
                      <X className="w-4 h-4 mr-2" />
                      İptal
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-text-dark">
                      {product.nameTr} / {product.nameEn}
                    </h3>
                    <p className="text-sm text-text-light mt-1">
                      Slug: {product.slug}
                    </p>
                    {product.isFeatured && (
                      <span className="inline-block mt-2 px-2 py-1 bg-primary-ocean text-white text-xs font-semibold rounded">
                        Öne Çıkan
                      </span>
                    )}
                  </div>
                  <Button variant="outline" size="md" onClick={() => handleEdit(product)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Düzenle
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

