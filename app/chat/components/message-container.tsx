import { useEffect, useRef } from 'react'

export const MessagesContainer: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [children])

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3" ref={bottomRef}>
      {children}
    </div>
  )
}
