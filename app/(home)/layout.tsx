import { HomeFooter } from './components/home-footer'
import { HomeNav } from './components/home-nav'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HomeNav />
      {children}
      <HomeFooter />
    </>
  )
}
