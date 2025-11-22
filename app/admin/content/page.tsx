"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Input } from "@/components/ui/Input";
import { Save, Loader2 } from "lucide-react";

interface PageContent {
  id: number;
  page: string;
  section: string;
  contentTr: string | null;
  contentEn: string | null;
  type: string;
}

export default function ContentManagementPage() {
  const [contents, setContents] = useState<PageContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<number | null>(null);

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      const response = await fetch("/api/admin/content");
      const data = await response.json();
      if (data.success) {
        setContents(data.data);
      }
    } catch (error) {
      console.error("Error fetching contents:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (id: number, contentTr: string, contentEn: string) => {
    setSaving(id);
    try {
      const response = await fetch(`/api/admin/content/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentTr, contentEn }),
      });

      const data = await response.json();
      if (data.success) {
        setContents((prev) =>
          prev.map((c) => (c.id === id ? { ...c, contentTr, contentEn } : c))
        );
        alert("İçerik başarıyla güncellendi!");
      } else {
        alert("Hata: " + data.message);
      }
    } catch (error) {
      alert("Bir hata oluştu");
    } finally {
      setSaving(null);
    }
  };

  const groupedContents = contents.reduce((acc, content) => {
    if (!acc[content.page]) {
      acc[content.page] = [];
    }
    acc[content.page].push(content);
    return acc;
  }, {} as Record<string, PageContent[]>);

  if (loading) {
    return <div className="text-center py-12">Yükleniyor...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-text-dark mb-8">İçerik Yönetimi</h1>

      <div className="space-y-8">
        {Object.entries(groupedContents).map(([page, pageContents]) => (
          <Card key={page}>
            <CardHeader>
              <CardTitle className="capitalize">{page.replace("-", " ")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {pageContents.map((content) => (
                <div key={content.id} className="border-b pb-6 last:border-0">
                  <h3 className="font-semibold text-text-dark mb-4 capitalize">
                    {content.section.replace("-", " ")}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-dark mb-2">
                        Türkçe İçerik
                      </label>
                      <Textarea
                        defaultValue={content.contentTr || ""}
                        rows={4}
                        id={`tr-${content.id}`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-dark mb-2">
                        English Content
                      </label>
                      <Textarea
                        defaultValue={content.contentEn || ""}
                        rows={4}
                        id={`en-${content.id}`}
                      />
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    size="md"
                    className="mt-4"
                    onClick={() => {
                      const trContent = (
                        document.getElementById(`tr-${content.id}`) as HTMLTextAreaElement
                      ).value;
                      const enContent = (
                        document.getElementById(`en-${content.id}`) as HTMLTextAreaElement
                      ).value;
                      handleSave(content.id, trContent, enContent);
                    }}
                    disabled={saving === content.id}
                  >
                    {saving === content.id ? (
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
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

