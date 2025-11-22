"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Save, Loader2, MapPin, Phone, Mail, MessageCircle } from "lucide-react";

interface ContactSettings {
  address: string;
  phone: string;
  email: string;
  whatsapp: string;
  officeAddress: string;
  warehouseAddress: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<ContactSettings>({
    address: "",
    phone: "",
    email: "",
    whatsapp: "",
    officeAddress: "",
    warehouseAddress: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/admin/settings");
      const data = await response.json();
      if (data.success) {
        setSettings(data.data);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      const data = await response.json();
      if (data.success) {
        alert("Ayarlar başarıyla kaydedildi!");
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
      <h1 className="text-3xl font-bold text-text-dark mb-8">Site Ayarları</h1>

      <Card>
        <CardHeader>
          <CardTitle>İletişim Bilgileri</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-text-dark mb-2">
                <MapPin className="w-4 h-4" />
                Ofis Adresi
              </label>
              <Textarea
                value={settings.officeAddress}
                onChange={(e) =>
                  setSettings({ ...settings, officeAddress: e.target.value })
                }
                rows={3}
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-text-dark mb-2">
                <MapPin className="w-4 h-4" />
                Depo Adresi
              </label>
              <Textarea
                value={settings.warehouseAddress}
                onChange={(e) =>
                  setSettings({ ...settings, warehouseAddress: e.target.value })
                }
                rows={3}
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-text-dark mb-2">
                <Phone className="w-4 h-4" />
                Telefon
              </label>
              <Input
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                placeholder="+90 555 123 45 67"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-text-dark mb-2">
                <Mail className="w-4 h-4" />
                E-posta
              </label>
              <Input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                placeholder="info@garantico.com"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-text-dark mb-2">
                <MessageCircle className="w-4 h-4" />
                WhatsApp Numarası
              </label>
              <Input
                value={settings.whatsapp}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                placeholder="+905551234567"
              />
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={handleSave}
            disabled={saving}
          >
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
        </CardContent>
      </Card>
    </div>
  );
}

