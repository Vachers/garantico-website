"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Upload, Loader2, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

export default function LogoManagementPage() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogo();
  }, []);

  const fetchLogo = async () => {
    try {
      const response = await fetch("/api/admin/logo");
      const data = await response.json();
      if (data.success && data.logoUrl) {
        setLogoUrl(data.logoUrl);
      }
    } catch (error) {
      console.error("Error fetching logo:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Lütfen bir resim dosyası seçin");
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("Dosya boyutu 2MB'dan küçük olmalıdır");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("logo", file);

      const response = await fetch("/api/admin/logo", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setLogoUrl(data.logoUrl);
        alert("Logo başarıyla yüklendi!");
      } else {
        alert("Hata: " + data.message);
      }
    } catch (error) {
      alert("Bir hata oluştu");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Yükleniyor...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-text-dark mb-8">Logo Yönetimi</h1>

      <Card>
        <CardHeader>
          <CardTitle>Site Logosu</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {logoUrl && (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="inline-block">
                <Image
                  src={logoUrl}
                  alt="Site Logo"
                  width={200}
                  height={100}
                  className="object-contain"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-text-dark mb-2">
              Yeni Logo Yükle
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <ImageIcon className="w-12 h-12 text-text-light mx-auto mb-4" />
              <p className="text-sm text-text-light mb-4">
                PNG, JPG veya SVG formatında, maksimum 2MB
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="logo-upload"
                disabled={uploading}
              />
              <label htmlFor="logo-upload">
                <Button
                  variant="outline"
                  size="md"
                  as="span"
                  disabled={uploading}
                  className="cursor-pointer"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Yükleniyor...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Logo Seç
                    </>
                  )}
                </Button>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

