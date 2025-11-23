"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Loader2, Save } from "lucide-react";

interface ContentData {
  backgroundColor: string;
  tr: {
    companyName: string;
    mainTitle: string;
    introText: string;
    pureFish: {
      title: string;
      description: string;
      contactButton: string;
    };
    benefits: {
      aminoAcid: { title: string; description: string };
      digestibility: { title: string; description: string };
      metabolism: { title: string; description: string };
    };
    features: {
      fcr: { title: string; description: string };
      digestibility: { title: string; description: string };
      quality: { title: string; description: string };
      immune: { title: string; description: string };
    };
  };
  en: {
    companyName: string;
    mainTitle: string;
    introText: string;
    pureFish: {
      title: string;
      description: string;
      contactButton: string;
    };
    benefits: {
      aminoAcid: { title: string; description: string };
      digestibility: { title: string; description: string };
      metabolism: { title: string; description: string };
    };
    features: {
      fcr: { title: string; description: string };
      digestibility: { title: string; description: string };
      quality: { title: string; description: string };
      immune: { title: string; description: string };
    };
  };
}

export default function HomepageContentPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<ContentData | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch("/api/admin/homepage-content");
      const data = await response.json();
      if (data.success) {
        setContent(data.data);
      }
    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!content) return;

    setSaving(true);
    try {
      const response = await fetch("/api/admin/homepage-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: content }),
      });

      const result = await response.json();
      if (result.success) {
        alert("İçerik başarıyla kaydedildi!");
      } else {
        alert("Hata: " + result.message);
      }
    } catch (error) {
      alert("Bir hata oluştu");
    } finally {
      setSaving(false);
    }
  };

  const updateField = (path: string[], value: string) => {
    if (!content) return;

    const newContent = { ...content };
    let current: any = newContent;

    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }

    current[path[path.length - 1]] = value;
    setContent(newContent);
  };

  if (loading) {
    return <div className="text-center py-12">Yükleniyor...</div>;
  }

  if (!content) {
    return <div className="text-center py-12">İçerik yüklenemedi</div>;
  }

  const currentLang = content.tr;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-text-dark">Ana Sayfa İçerik Yönetimi</h1>
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

      {/* Background Color */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Arka Plan Rengi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={content.backgroundColor}
              onChange={(e) => setContent({ ...content, backgroundColor: e.target.value })}
              className="w-20 h-10 rounded border border-gray-300 cursor-pointer"
            />
            <Input
              value={content.backgroundColor}
              onChange={(e) => setContent({ ...content, backgroundColor: e.target.value })}
              placeholder="#e0f2fe"
              className="max-w-xs"
            />
          </div>
        </CardContent>
      </Card>


      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Üst Bölüm</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Şirket Adı</label>
                <Input
                  value={currentLang.companyName}
                  onChange={(e) => updateField(["tr", "companyName"], e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Ana Başlık</label>
                <Input
                  value={currentLang.mainTitle}
                  onChange={(e) => updateField(["tr", "mainTitle"], e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Giriş Metni</label>
                <Textarea
                  value={currentLang.introText}
                  onChange={(e) => updateField(["tr", "introText"], e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>%100 Saf Balık Bölümü</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Başlık</label>
                <Input
                  value={currentLang.pureFish.title}
                  onChange={(e) => updateField(["tr", "pureFish", "title"], e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Açıklama</label>
                <Textarea
                  value={currentLang.pureFish.description}
                  onChange={(e) =>
                    updateField(["tr", "pureFish", "description"], e.target.value)
                  }
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Buton Metni</label>
                <Input
                  value={currentLang.pureFish.contactButton}
                  onChange={(e) =>
                    updateField(["tr", "pureFish", "contactButton"], e.target.value)
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Faydalar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Optimal Amino Asit Dengesi</label>
                <Input
                  value={currentLang.benefits.aminoAcid.title}
                  onChange={(e) =>
                    updateField(["tr", "benefits", "aminoAcid", "title"], e.target.value)
                  }
                  className="mb-2"
                />
                <Textarea
                  value={currentLang.benefits.aminoAcid.description}
                  onChange={(e) =>
                    updateField(
                      ["tr", "benefits", "aminoAcid", "description"],
                      e.target.value
                    )
                  }
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Maksimum Sindirilebilirlik</label>
                <Input
                  value={currentLang.benefits.digestibility.title}
                  onChange={(e) =>
                    updateField(
                      ["tr", "benefits", "digestibility", "title"],
                      e.target.value
                    )
                  }
                  className="mb-2"
                />
                <Textarea
                  value={currentLang.benefits.digestibility.description}
                  onChange={(e) =>
                    updateField(
                      ["tr", "benefits", "digestibility", "description"],
                      e.target.value
                    )
                  }
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Metabolizma ve Enerji Verimliliği
                </label>
                <Input
                  value={currentLang.benefits.metabolism.title}
                  onChange={(e) =>
                    updateField(["tr", "benefits", "metabolism", "title"], e.target.value)
                  }
                  className="mb-2"
                />
                <Textarea
                  value={currentLang.benefits.metabolism.description}
                  onChange={(e) =>
                    updateField(
                      ["tr", "benefits", "metabolism", "description"],
                      e.target.value
                    )
                  }
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Features */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Özellik Kartları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">FCR Performansı</label>
                <Input
                  value={currentLang.features.fcr.title}
                  onChange={(e) =>
                    updateField(["tr", "features", "fcr", "title"], e.target.value)
                  }
                  className="mb-2"
                />
                <Textarea
                  value={currentLang.features.fcr.description}
                  onChange={(e) =>
                    updateField(["tr", "features", "fcr", "description"], e.target.value)
                  }
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Sindirilebilirlik ve Performans
                </label>
                <Input
                  value={currentLang.features.digestibility.title}
                  onChange={(e) =>
                    updateField(
                      ["tr", "features", "digestibility", "title"],
                      e.target.value
                    )
                  }
                  className="mb-2"
                />
                <Textarea
                  value={currentLang.features.digestibility.description}
                  onChange={(e) =>
                    updateField(
                      ["tr", "features", "digestibility", "description"],
                      e.target.value
                    )
                  }
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Kalite Kontrolü</label>
                <Input
                  value={currentLang.features.quality.title}
                  onChange={(e) =>
                    updateField(["tr", "features", "quality", "title"], e.target.value)
                  }
                  className="mb-2"
                />
                <Textarea
                  value={currentLang.features.quality.description}
                  onChange={(e) =>
                    updateField(["tr", "features", "quality", "description"], e.target.value)
                  }
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">İmmün Destek</label>
                <Input
                  value={currentLang.features.immune.title}
                  onChange={(e) =>
                    updateField(["tr", "features", "immune", "title"], e.target.value)
                  }
                  className="mb-2"
                />
                <Textarea
                  value={currentLang.features.immune.description}
                  onChange={(e) =>
                    updateField(["tr", "features", "immune", "description"], e.target.value)
                  }
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

