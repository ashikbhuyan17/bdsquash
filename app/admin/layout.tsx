import { AdminAppShell } from "@/components/admin/admin-app-shell"
import { Toaster } from "sonner"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminAppShell>{children}</AdminAppShell>
      <Toaster richColors position="top-right" closeButton className="sm:max-w-md" />
    </>
  )
}
