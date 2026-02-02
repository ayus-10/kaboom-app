import { Toaster } from 'sonner'
import { AdminGuard } from './components/admin-guard'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster />
      <AdminGuard>{children}</AdminGuard>
    </>
  )
}
