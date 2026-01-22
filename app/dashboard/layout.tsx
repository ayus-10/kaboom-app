import { QueryProvider } from '@/providers/query-provider'
import { DashboardGuard } from './components/dashboard-guard'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <DashboardGuard>{children}</DashboardGuard>
    </QueryProvider>
  )
}
