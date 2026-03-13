"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { createContext, useContext, useCallback } from "react";

/* Context so child components (AdminPanel) can call logout */
type AdminCtx = { logout: () => Promise<void> };
export const AdminContext = createContext<AdminCtx>({ logout: async () => {} });
export const useAdmin = () => useContext(AdminContext);

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }, [router]);

  return (
    <AdminContext.Provider value={{ logout }}>
      {children}
    </AdminContext.Provider>
  );
}