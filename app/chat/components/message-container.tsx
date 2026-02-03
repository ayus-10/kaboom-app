import { useEffect, useRef } from 'react'

export const MessagesContainer: React.FC<{
  children: React.ReactNode
  scrollTrigger?: number
}> = ({ children, scrollTrigger = 0 }) => {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [scrollTrigger])

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {children}
      <div ref={bottomRef} />
    </div>
  )
}
