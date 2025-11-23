"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Loader2, Save, Upload, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface BiologicalsData {
  enabled: boolean;
  leftBgColor: string;
  accentColor: string;
  buttonColor: string;
  imageUrl: string;
  tr: {
    title: string;
    subtitle: string;
    description: string;
    buttonText: string;
  };
  en: {
    title: string;
    subtitle: string;
    description: string;
    buttonText: string;
  };
  ru: {
    title: string;
    subtitle: string;
    description: string;
    buttonText: string;
  };
  fa: {
    title: string;
    subtitle: string;
    description: string;
    buttonText: string;
  };
  az: {
    title: string;
    subtitle: string;
    description: string;
    buttonText: string;
  };
  ar: {
    title: string;
    subtitle: string;
    description: string;
    buttonText: string;
  };
}

export default function BiologicalsSectionPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [data, setData] = useState<BiologicalsData | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/admin/biologicals-section");
      const result = await response.json();
      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!data) return;

    setSaving(true);
    try {
      const response = await fetch("/api/admin/biologicals-section", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });

      const result = await response.json();
      if (result.success) {
        alert("Bölüm başarıyla kaydedildi!");
      } else {
        alert("Hata: " + result.message);
      }
    } catch (error) {
      alert("Bir hata oluştu");
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/admin/biologicals-section", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        setData({ ...data!, imageUrl: result.imageUrl });
        alert("Resim başarıyla yüklendi!");
      } else {
        alert("Hata: " + result.message);
      }
    } catch (error) {
      alert("Bir hata oluştu");
    } finally {
      setUploading(false);
    }
  };

  const updateField = (path: string[], value: string | boolean) => {
    if (!data) return;

    const newData = { ...data };
    let current: any = newData;

    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }

    current[path[path.length - 1]] = value;
    setData(newData);
  };

  if (loading) {
    return <div className="text-center py-12">Yükleniyor...</div>;
  }

  if (!data) {
    return <div className="text-center py-12">Veri yüklenemedi</div>;
  }

  const currentLang = data.tr;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-text-dark">Biologicals Section Yönetimi</h1>
        <Button variant="primary" size="lg" onClick={handleSave} disabled={saving}>
          {saving ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Kaydediliyor...
            </>
          ) : (
            <>
              <Save className="w-5 h-5 mr-2" />
              Kaydet
            </>
          )}
        </Button>
      </div>

      {/* Enable/Disable Toggle */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Bölüm Durumu</CardTitle>
        </CardHeader>
        <CardContent>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.enabled}
              onChange={(e) => updateField(["enabled"], e.target.checked)}
              className="w-5 h-5"
            />
            <span className="text-sm font-medium">Bölümü göster</span>
          </label>
        </CardContent>
      </Card>

      {/* Colors */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Sol Panel Arka Plan Rengi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={data.leftBgColor}
                onChange={(e) => updateField(["leftBgColor"], e.target.value)}
                className="w-20 h-10 rounded border border-gray-300 cursor-pointer"
              />
              <Input
                value={data.leftBgColor}
                onChange={(e) => updateField(["leftBgColor"], e.target.value)}
                placeholder="#0c4a6e"
                className="max-w-xs"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vurgu Rengi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={data.accentColor}
                onChange={(e) => updateField(["accentColor"], e.target.value)}
                className="w-20 h-10 rounded border border-gray-300 cursor-pointer"
              />
              <Input
                value={data.accentColor}
                onChange={(e) => updateField(["accentColor"], e.target.value)}
                placeholder="#f97316"
                className="max-w-xs"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Buton Rengi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={data.buttonColor}
                onChange={(e) => updateField(["buttonColor"], e.target.value)}
                className="w-20 h-10 rounded border border-gray-300 cursor-pointer"
              />
              <Input
                value={data.buttonColor}
                onChange={(e) => updateField(["buttonColor"], e.target.value)}
                placeholder="#f97316"
                className="max-w-xs"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Image Upload */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Sağ Panel Görseli</CardTitle>
        </CardHeader>
        <CardContent>
          {data.imageUrl && (
            <div className="mb-4">
              <Image
                src={data.imageUrl}
                alt="Biologicals section"
                width={400}
                height={300}
                className="object-cover rounded-lg"
              />
            </div>
          )}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <ImageIcon className="w-12 h-12 text-text-light mx-auto mb-4" />
            <p className="text-sm text-text-light mb-4">
              PNG, JPG veya WebP formatında, maksimum 5MB
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="biologicals-upload"
              disabled={uploading}
            />
            <label htmlFor="biologicals-upload" className="cursor-pointer">
              <Button variant="outline" size="md" type="button" disabled={uploading}>
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Yükleniyor...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Görsel Seç
                  </>
                )}
              </Button>
            </label>
          </div>
        </CardContent>
      </Card>


      {/* Content Form */}
        <Card>
          <CardHeader>
            <CardTitle>İçerik (Türkçe)</CardTitle>
          </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Başlık</label>
            <Input
              value={currentLang.title}
              onChange={(e) => updateField(["tr", "title"], e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Alt Başlık</label>
            <Input
              value={currentLang.subtitle}
              onChange={(e) => updateField(["tr", "subtitle"], e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Açıklama</label>
            <Textarea
              value={currentLang.description}
              onChange={(e) => updateField(["tr", "description"], e.target.value)}
              rows={4}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Buton Metni</label>
            <Input
              value={currentLang.buttonText}
              onChange={(e) => updateField(["tr", "buttonText"], e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

