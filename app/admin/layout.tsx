import { getCurrentUser } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if we're on login page
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  
  // If on login page, don't check auth
  if (pathname.includes("/admin/login")) {
    return <>{children}</>;
  }

  const user = await getCurrentUser();

  // Only redirect if not authenticated
  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader user={user} />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-8 max-w-7xl mx-auto w-full">{children}</main>
      </div>
    </div>
  );
}
