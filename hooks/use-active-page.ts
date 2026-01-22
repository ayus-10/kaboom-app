import { usePathname } from 'next/navigation'

export const useActivePage = () => {
  const pathname = usePathname()

  if (pathname.includes('/project')) return 'project'
  if (pathname.includes('/widget')) return 'widget'
  if (pathname.includes('/chat')) return 'chat'
  if (pathname.includes('/request')) return 'request'
  if (pathname.includes('/account')) return 'account'

  return null
}
