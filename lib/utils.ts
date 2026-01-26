export const formatTimestamp = (timestamp: string) => {
  const now = new Date()
  const msgDate = new Date(timestamp)
  const diffMs = now.getTime() - msgDate.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`

  return msgDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export const handleKeyDown = (
  e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>,
  onKeyDown: VoidFunction
) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    onKeyDown()
  }
}
