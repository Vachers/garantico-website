import { adminUsers } from "@/lib/db/schema";

type AdminUser = typeof adminUsers.$inferSelect;

interface AdminHeaderProps {
  user: AdminUser;
}

export function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-dark">Yönetim Paneli</h1>
          <p className="text-sm text-text-light">Hoş geldiniz, {user.username}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-text-dark">
              {user.username}
            </p>
            {user.lastLogin && (
              <p className="text-xs text-text-light">
                Son giriş: {new Date(user.lastLogin).toLocaleDateString("tr-TR")}
              </p>
            )}
          </div>
          <div className="w-10 h-10 bg-primary-ocean rounded-full flex items-center justify-center text-white font-semibold">
            {user.username.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
}

