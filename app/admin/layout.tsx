import { AdminAppShell } from "@/components/admin/admin-app-shell"
import { AdminToaster } from "@/components/admin/admin-toaster"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminAppShell>{children}</AdminAppShell>
      <AdminToaster />
    </>
  )
}
