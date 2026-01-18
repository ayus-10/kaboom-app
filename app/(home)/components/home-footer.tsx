import Image from 'next/image'

export const HomeFooter = () => {
  return (
    <footer>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Kaboom logo" width={28} height={28} />
          <span className="font-medium">Kaboom</span>
        </div>

        <p className="text-sm text-gray-500">&copy; 2026 Kaboom. All rights reserved.</p>
      </div>
    </footer>
  )
}
