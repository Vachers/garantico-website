"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Plus, Edit, Trash2, Save, X, Upload, Image as ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";

interface Product {
  id: number;
  nameTr: string;
  nameEn: string;
  slug: string;
  descriptionTr: string | null;
  descriptionEn: string | null;
  imageUrl: string | null;
  isFeatured: boolean;
  active: boolean;
  categoryId: number | null;
  proteinMin: string | null;
  ashMax: string | null;
  moistureMax: string | null;
}

interface Category {
  id: number;
  nameTr: string;
  nameEn: string;
  slug: string;
}

export default function ProductsManagementPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<number | null>(null);
  const [creating, setCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({});
  const [uploading, setUploading] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

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
    setCreating(false);
    setFormData(product);
  };

  const handleCreate = () => {
    setCreating(true);
    setEditing(null);
    setFormData({
      nameTr: "",
      nameEn: "",
      slug: "",
      descriptionTr: "",
      descriptionEn: "",
      imageUrl: null,
      isFeatured: false,
      active: true,
      categoryId: null,
      proteinMin: null,
      ashMax: null,
      moistureMax: null,
    });
  };

  const handleCancel = () => {
    setEditing(null);
    setCreating(false);
    setFormData({});
  };

  const handleSave = async () => {
    if (!editing && !creating) return;

    setSaving(true);
    try {
      const url = creating
        ? "/api/admin/products"
        : `/api/admin/products/${editing}`;
      const method = creating ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        await fetchData();
        setEditing(null);
        setCreating(false);
        setFormData({});
        alert(creating ? "Ürün başarıyla oluşturuldu!" : "Ürün başarıyla güncellendi!");
      } else {
        alert("Hata: " + data.message);
      }
    } catch (error) {
      alert("Bir hata oluştu");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Bu ürünü silmek istediğinizden emin misiniz?")) return;

    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (data.success) {
        await fetchData();
        alert("Ürün başarıyla silindi!");
      } else {
        alert("Hata: " + data.message);
      }
    } catch (error) {
      alert("Bir hata oluştu");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, productId: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Lütfen bir resim dosyası seçin");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Dosya boyutu 5MB'dan küçük olmalıdır");
      return;
    }

    setUploading(productId);

    try {
      const formData = new FormData();
      formData.append("productImage", file);
      formData.append("productId", productId.toString());

      const response = await fetch("/api/admin/products/image", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        await fetchData();
        alert("Ürün görseli başarıyla yüklendi!");
      } else {
        alert("Hata: " + data.message);
      }
    } catch (error) {
      alert("Bir hata oluştu");
    } finally {
      setUploading(null);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  if (loading) {
    return <div className="text-center py-12">Yükleniyor...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-text-dark">Ürün Yönetimi</h1>
        {!creating && (
          <Button variant="primary" size="md" onClick={handleCreate}>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Ürün
          </Button>
        )}
      </div>

      {/* Create Form */}
      {creating && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Yeni Ürün Ekle</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Türkçe İsim"
                value={formData.nameTr || ""}
                onChange={(e) => {
                  const name = e.target.value;
                  setFormData({
                    ...formData,
                    nameTr: name,
                    slug: formData.slug || generateSlug(name),
                  });
                }}
              />
              <Input
                label="English Name"
                value={formData.nameEn || ""}
                onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
              />
            </div>
            <Input
              label="Slug"
              value={formData.slug || ""}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="urun-adi"
            />
            <div className="grid md:grid-cols-2 gap-4">
              <Textarea
                label="Türkçe Açıklama"
                value={formData.descriptionTr || ""}
                onChange={(e) => setFormData({ ...formData, descriptionTr: e.target.value })}
                rows={4}
              />
              <Textarea
                label="English Description"
                value={formData.descriptionEn || ""}
                onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                rows={4}
              />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <Input
                label="Min Protein (%)"
                type="number"
                step="0.01"
                value={formData.proteinMin || ""}
                onChange={(e) => setFormData({ ...formData, proteinMin: e.target.value })}
              />
              <Input
                label="Max Ash (%)"
                type="number"
                step="0.01"
                value={formData.ashMax || ""}
                onChange={(e) => setFormData({ ...formData, ashMax: e.target.value })}
              />
              <Input
                label="Max Moisture (%)"
                type="number"
                step="0.01"
                value={formData.moistureMax || ""}
                onChange={(e) => setFormData({ ...formData, moistureMax: e.target.value })}
              />
            </div>
            <Select
              label="Kategori"
              value={formData.categoryId?.toString() || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  categoryId: e.target.value ? parseInt(e.target.value) : null,
                })
              }
              options={[
                { value: "", label: "Kategori Seçin" },
                ...categories.map((cat) => ({
                  value: cat.id.toString(),
                  label: `${cat.nameTr} / ${cat.nameEn}`,
                })),
              ]}
            />
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isFeatured || false}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                />
                <span>Öne Çıkan Ürün</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.active !== false}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                />
                <span>Aktif</span>
              </label>
            </div>
            <div className="flex gap-2">
              <Button variant="primary" onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Kaydediliyor...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Kaydet
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />
                İptal
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Products List */}
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
                      onChange={(e) => setFormData({ ...formData, nameTr: e.target.value })}
                    />
                    <Input
                      label="English Name"
                      value={formData.nameEn || ""}
                      onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                    />
                  </div>
                  <Input
                    label="Slug"
                    value={formData.slug || ""}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  />
                  <div className="grid md:grid-cols-2 gap-4">
                    <Textarea
                      label="Türkçe Açıklama"
                      value={formData.descriptionTr || ""}
                      onChange={(e) => setFormData({ ...formData, descriptionTr: e.target.value })}
                      rows={4}
                    />
                    <Textarea
                      label="English Description"
                      value={formData.descriptionEn || ""}
                      onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                      rows={4}
                    />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Input
                      label="Min Protein (%)"
                      type="number"
                      step="0.01"
                      value={formData.proteinMin || ""}
                      onChange={(e) => setFormData({ ...formData, proteinMin: e.target.value })}
                    />
                    <Input
                      label="Max Ash (%)"
                      type="number"
                      step="0.01"
                      value={formData.ashMax || ""}
                      onChange={(e) => setFormData({ ...formData, ashMax: e.target.value })}
                    />
                    <Input
                      label="Max Moisture (%)"
                      type="number"
                      step="0.01"
                      value={formData.moistureMax || ""}
                      onChange={(e) => setFormData({ ...formData, moistureMax: e.target.value })}
                    />
                  </div>
                  <Select
                    label="Kategori"
                    value={formData.categoryId?.toString() || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        categoryId: e.target.value ? parseInt(e.target.value) : null,
                      })
                    }
                    options={[
                      { value: "", label: "Kategori Seçin" },
                      ...categories.map((cat) => ({
                        value: cat.id.toString(),
                        label: `${cat.nameTr} / ${cat.nameEn}`,
                      })),
                    ]}
                  />
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.isFeatured || false}
                        onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      />
                      <span>Öne Çıkan Ürün</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.active !== false}
                        onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                      />
                      <span>Aktif</span>
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="primary" onClick={handleSave} disabled={saving}>
                      {saving ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Kaydediliyor...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Kaydet
                        </>
                      )}
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      <X className="w-4 h-4 mr-2" />
                      İptal
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    {product.imageUrl ? (
                      <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200">
                        <Image
                          src={product.imageUrl}
                          alt={product.nameTr}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-32 h-32 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    <label className="mt-2 block">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, product.id)}
                        disabled={uploading === product.id}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        disabled={uploading === product.id}
                        as="span"
                      >
                        {uploading === product.id ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Yükleniyor...
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4 mr-2" />
                            Resim Yükle
                          </>
                        )}
                      </Button>
                    </label>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-text-dark">
                          {product.nameTr} / {product.nameEn}
                        </h3>
                        <p className="text-sm text-text-light mt-1">Slug: {product.slug}</p>
                        {product.descriptionTr && (
                          <p className="text-sm text-text-light mt-2 line-clamp-2">
                            {product.descriptionTr}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      {product.isFeatured && (
                        <span className="px-2 py-1 bg-primary-ocean text-white text-xs font-semibold rounded">
                          Öne Çıkan
                        </span>
                      )}
                      {!product.active && (
                        <span className="px-2 py-1 bg-gray-400 text-white text-xs font-semibold rounded">
                          Pasif
                        </span>
                      )}
                      {product.proteinMin && (
                        <span className="px-2 py-1 bg-primary-light/20 text-primary-ocean text-xs font-semibold rounded">
                          Protein: {product.proteinMin}%
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex-shrink-0 flex gap-2">
                    <Button variant="outline" size="md" onClick={() => handleEdit(product)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Düzenle
                    </Button>
                    <Button
                      variant="outline"
                      size="md"
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-700 hover:border-red-300"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Sil
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {products.length === 0 && !creating && (
        <div className="text-center py-12">
          <p className="text-text-light text-lg">Henüz ürün eklenmemiş.</p>
          <Button variant="primary" size="md" onClick={handleCreate} className="mt-4">
            <Plus className="w-4 h-4 mr-2" />
            İlk Ürünü Ekle
          </Button>
        </div>
      )}
    </div>
  );
}
