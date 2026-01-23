import { QueryProvider } from '@/providers/query-provider'
import { Toaster } from 'sonner'
import { AdminGuard } from './components/admin-guard'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <Toaster />
      <AdminGuard>{children}</AdminGuard>
    </QueryProvider>
  )
}
