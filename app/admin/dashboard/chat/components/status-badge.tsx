'use client'

export const StatusBadge: React.FC<{ status: 'online' | 'offline' }> = ({ status }) => {
  const isOnline = status === 'online'

  return (
    <div
      className={`inline-flex px-3 py-1 items-center gap-1 rounded-full border ${
        isOnline ? 'bg-green-100 border-green-600' : 'bg-gray-100 border-gray-400'
      }`}
    >
      <div
        className={`size-2 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}
      />
      <span
        className={`font-semibold text-sm tracking-wide ${isOnline ? 'text-green-900' : 'text-gray-700'}`}
      >
        {isOnline ? 'Online' : 'Offline'}
      </span>
    </div>
  )
}
