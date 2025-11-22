"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { Mail, Phone, MapPin, Building, Package } from "lucide-react";

interface Inquiry {
  id: number;
  customerName: string;
  email: string;
  phone: string | null;
  company: string | null;
  quantity: string | null;
  deliveryLocation: string | null;
  message: string | null;
  status: string;
  createdAt: Date;
  productId: number | null;
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetchInquiries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const fetchInquiries = async () => {
    try {
      const url = filter === "all" ? "/api/admin/inquiries" : `/api/admin/inquiries?status=${filter}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        setInquiries(data.data);
      }
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      const response = await fetch(`/api/admin/inquiries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();
      if (data.success) {
        setInquiries((prev) =>
          prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Yükleniyor...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-text-dark">Teklif Yönetimi</h1>
        <Select
          options={[
            { value: "all", label: "Tümü" },
            { value: "pending", label: "Beklemede" },
            { value: "contacted", label: "İletişime Geçildi" },
            { value: "completed", label: "Tamamlandı" },
          ]}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-48"
        />
      </div>

      <div className="space-y-4">
        {inquiries.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-text-light">Henüz teklif bulunmuyor</p>
            </CardContent>
          </Card>
        ) : (
          inquiries.map((inquiry) => (
            <Card key={inquiry.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-text-dark mb-2">
                      {inquiry.customerName}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-text-light">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {inquiry.email}
                      </div>
                      {inquiry.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          {inquiry.phone}
                        </div>
                      )}
                      {inquiry.company && (
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4" />
                          {inquiry.company}
                        </div>
                      )}
                      {inquiry.quantity && (
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4" />
                          {inquiry.quantity}
                        </div>
                      )}
                      {inquiry.deliveryLocation && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {inquiry.deliveryLocation}
                        </div>
                      )}
                    </div>
                    {inquiry.message && (
                      <p className="mt-4 text-sm text-text-light bg-slate-50 p-3 rounded">
                        {inquiry.message}
                      </p>
                    )}
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-xs text-text-light mb-2">
                      {new Date(inquiry.createdAt).toLocaleDateString("tr-TR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <Select
                      options={[
                        { value: "pending", label: "Beklemede" },
                        { value: "contacted", label: "İletişime Geçildi" },
                        { value: "completed", label: "Tamamlandı" },
                      ]}
                      value={inquiry.status}
                      onChange={(e) => updateStatus(inquiry.id, e.target.value)}
                      className="w-40"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

