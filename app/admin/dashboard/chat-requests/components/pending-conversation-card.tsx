import { useReplyToPendingConversation } from '@/hooks/mutations/use-conversation-mutations'
import { formatTimestamp, handleKeyDown } from '@/lib/utils'
import { PendingConversationWithMessages } from '@/types/conversation'
import { Send } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export const PendingConversationCard: React.FC<{
  conversation: PendingConversationWithMessages
  handleReject: (id: string) => void
}> = ({ conversation, handleReject }) => {
  const [replyText, setReplyText] = useState('')
  const replyMutation = useReplyToPendingConversation()

  const handleReply = () => {
    if (!replyText.trim()) return

    replyMutation.mutate({
      id: conversation.id,
      message: replyText.trim(),
    })

    setReplyText('')
  }

  const pendingMessages = conversation.pending_messages ?? []
  const displayMessages = pendingMessages.slice(0, 5)

  const handleRejectClick = () => {
    toast('Close this conversation?', {
      description: 'This action cannot be undone.',
      action: {
        label: 'Confirm',
        onClick: () => handleReject(conversation.id),
      },
      cancel: {
        label: 'Cancel',
        onClick: () => {},
      },
    })
  }

  return (
    <div className="overflow-hidden w-full max-w-[500px] rounded-xl border border-gray-100 bg-white">
      <div className="flex md:items-center md:flex-row flex-col justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 items-center hidden md:flex justify-center rounded-full bg-indigo-50 text-sm font-medium text-indigo-600">
            V
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Visitor Request</p>
            <p className="text-xs text-gray-400">
              <span className="md:inline hidden">Visitor ID</span>
              <span className="md:inline hidden"> · </span>
              <span>{conversation.visitor_id}</span>
            </p>
          </div>
        </div>
        <span className="text-xs text-gray-400">{formatTimestamp(conversation.created_at)}</span>
      </div>

      {displayMessages.length > 0 && (
        <div className="space-y-1.5 overflow-y-auto px-5 pb-4">
          {displayMessages.map(message => (
            <div key={message.id} className="flex">
              <div className="inline-block max-w-[85%] rounded-2xl bg-gray-100 px-3 py-1.5">
                <p className="text-sm leading-snug text-gray-800">{message.content}</p>
                <span className="mt-0.5 block text-right text-[11px] text-gray-400">
                  {formatTimestamp(message.created_at)}
                </span>
              </div>
            </div>
          ))}

          {pendingMessages.length > 5 && (
            <p className="pt-1 text-xs text-gray-400">
              +{pendingMessages.length - 5} more message
              {pendingMessages.length - 5 !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      )}

      <div className="border-t border-gray-100 px-5 py-4">
        <div className="flex items-end gap-3 relative">
          <textarea
            value={replyText}
            onChange={e => setReplyText(e.target.value)}
            onKeyDown={e => handleKeyDown(e, handleReply)}
            placeholder="Write a reply..."
            rows={2}
            disabled={replyMutation.isPending}
            className="flex-1 resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-0 md:pr-4 pr-12"
          />

          <button
            onClick={handleReply}
            disabled={!replyText.trim() || replyMutation.isPending}
            className="rounded-xl bg-indigo-600 md:px-4 px-2 absolute top-1/2 md:translate-y-0 right-2 -translate-y-1/2 md:static py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:opacity-40"
          >
            <Send size={16} />
          </button>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleRejectClick}
            className="text-xs font-medium text-red-500 transition hover:text-red-600"
          >
            Reject conversation
          </button>
        </div>
      </div>
    </div>
  )
}
