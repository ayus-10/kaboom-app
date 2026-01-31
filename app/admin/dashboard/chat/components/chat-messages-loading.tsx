'use client'

export const ChatMessagesLoading: React.FC = () => {
  return (
    <div className="flex flex-col gap-3 py-2">
      {[1, 2, 3].map(i => (
        <div
          key={i}
          className={`h-10 w-40 animate-pulse rounded-2xl bg-gray-200 ${i % 2 === 0 ? 'self-end w-52' : 'self-start'}`}
        />
      ))}
    </div>
  )
}
