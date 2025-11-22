import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { productInquiries, products, categories } from "@/lib/db/schema";
import { desc, count } from "drizzle-orm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { FileText, Package, Users, MessageSquare } from "lucide-react";

export default async function AdminDashboard() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/admin/login");
  }

  // Get statistics
  const [inquiriesCount] = await db
    .select({ count: count() })
    .from(productInquiries);

  const [productsCount] = await db
    .select({ count: count() })
    .from(products);

  const [categoriesCount] = await db
    .select({ count: count() })
    .from(categories);

  const recentInquiries = await db
    .select()
    .from(productInquiries)
    .orderBy(desc(productInquiries.createdAt))
    .limit(5);

  return (
    <div>
      <h1 className="text-3xl font-bold text-text-dark mb-8">Dashboard</h1>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-text-light">
              Toplam Teklif
            </CardTitle>
            <MessageSquare className="w-5 h-5 text-primary-ocean" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-text-dark">
              {inquiriesCount.count}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-text-light">
              Ürünler
            </CardTitle>
            <Package className="w-5 h-5 text-primary-ocean" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-text-dark">
              {productsCount.count}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-text-light">
              Kategoriler
            </CardTitle>
            <FileText className="w-5 h-5 text-primary-ocean" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-text-dark">
              {categoriesCount.count}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-text-light">
              Aktif Kullanıcı
            </CardTitle>
            <Users className="w-5 h-5 text-primary-ocean" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-text-dark">1</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Inquiries */}
      <Card>
        <CardHeader>
          <CardTitle>Son Teklifler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentInquiries.length === 0 ? (
              <p className="text-text-light text-center py-8">
                Henüz teklif bulunmuyor
              </p>
            ) : (
              recentInquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div>
                    <p className="font-semibold text-text-dark">
                      {inquiry.customerName}
                    </p>
                    <p className="text-sm text-text-light">{inquiry.email}</p>
                    <p className="text-sm text-text-light">
                      {inquiry.company || "Şirket bilgisi yok"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-text-light">
                      {new Date(inquiry.createdAt!).toLocaleDateString("tr-TR")}
                    </p>
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                        inquiry.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {inquiry.status === "pending" ? "Beklemede" : "Tamamlandı"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

