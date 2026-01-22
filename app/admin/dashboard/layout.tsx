import { MainSidebar } from './components/main-sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex w-screen h-screen">
      <MainSidebar />
      {children}
    </main>
  )
}
