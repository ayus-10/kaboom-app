import { QueryProvider } from '@/providers/query-provider'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kaboom',
  description: 'Make your website go Kaboom...',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
