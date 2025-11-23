"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Upload, Loader2, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

export default function HeroManagementPage() {
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [overlayOpacity, setOverlayOpacity] = useState(40);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHeroSettings();
  }, []);

  const fetchHeroSettings = async () => {
    try {
      const response = await fetch("/api/admin/hero");
      const data = await response.json();
      if (data.success) {
        setHeroImage(data.heroImage || "/hero-image.png");
        setOverlayOpacity(data.overlayOpacity || 40);
      }
    } catch (error) {
      console.error("Error fetching hero settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      formData.append("heroImage", file);

      const response = await fetch("/api/admin/hero", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setHeroImage(data.heroImage);
        alert("Hero görseli başarıyla yüklendi!");
      } else {
        alert("Hata: " + data.message);
      }
    } catch (error) {
      alert("Bir hata oluştu");
    } finally {
      setUploading(false);
    }
  };

  const handleSaveOpacity = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/admin/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ overlayOpacity }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Overlay opaklığı başarıyla kaydedildi!");
      } else {
        alert("Hata: " + data.message);
      }
    } catch (error) {
      alert("Bir hata oluştu");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Yükleniyor...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-text-dark mb-8">Hero Section Yönetimi</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Upload */}
        <Card>
          <CardHeader>
            <CardTitle>Hero Görseli</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {heroImage && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <div className="inline-block">
                  <Image
                    src={heroImage}
                    alt="Hero Image"
                    width={400}
                    height={225}
                    className="object-contain rounded-lg"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-text-dark mb-2">
                Yeni Hero Görseli Yükle
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <ImageIcon className="w-12 h-12 text-text-light mx-auto mb-4" />
                <p className="text-sm text-text-light mb-4">
                  PNG, JPG veya WebP formatında, maksimum 5MB
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="hero-upload"
                  disabled={uploading}
                />
                <label htmlFor="hero-upload" className="cursor-pointer">
                  <span className="inline-block">
                    <Button
                      variant="outline"
                      size="md"
                      type="button"
                      disabled={uploading}
                    >
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
                  </span>
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Overlay Opacity */}
        <Card>
          <CardHeader>
            <CardTitle>Overlay Opaklığı</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-dark mb-4">
                Opaklık: {overlayOpacity}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={overlayOpacity}
                onChange={(e) => setOverlayOpacity(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-text-light mt-2">
                <span>0% (Şeffaf)</span>
                <span>100% (Koyu)</span>
              </div>
            </div>

            {/* Preview */}
            <div className="relative h-48 rounded-lg overflow-hidden border-2 border-gray-200">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: heroImage ? `url('${heroImage}')` : "url('/hero-image.png')",
                }}
              >
                <div
                  className="absolute inset-0 bg-gradient-to-r from-primary-blue via-primary-blue to-primary-blue"
                  style={{
                    opacity: overlayOpacity / 100,
                  }}
                ></div>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={handleSaveOpacity}
              disabled={saving}
              className="w-full"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Kaydediliyor...
                </>
              ) : (
                "Opaklığı Kaydet"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

