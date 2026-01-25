'use client'

import { useActiveMessagesStore, useVisitorMessagesStore } from '@/hooks/use-messages'
import { useVisitorSocket } from '@/hooks/use-visitor-socket'
import { Send } from 'lucide-react'
import { useState } from 'react'
import { MessagesList } from './message-list'

export const ChatWidget: React.FC = () => {
  const [inputText, setInputText] = useState('')

  const activeMessages = useActiveMessagesStore(state => state.activeMessages)
  const addActiveMessage = useActiveMessagesStore(state => state.addActiveMessage)
  const visitorMessages = useVisitorMessagesStore(state => state.visitorMessages)
  const addVisitorMessage = useVisitorMessagesStore(state => state.addVisitorMessage)

  const { visitorActorId, sendMessage, conversationId } = useVisitorSocket()

  const handleSend = () => {
    const messageStr = inputText.trim()
    if (!messageStr || !visitorActorId) return

    if (conversationId) {
      addActiveMessage({
        conversation_id: conversationId,
        content: messageStr,
        created_at: new Date().toISOString(),
        sender_actor_id: visitorActorId,
        id: crypto.randomUUID(),
      })
      sendMessage(messageStr)
    } else {
      addVisitorMessage({
        content: messageStr,
        id: crypto.randomUUID(),
      })
      sendMessage(messageStr)
    }

    setInputText('')
  }

  return (
    <div className="w-full max-w-[480px] h-[600px] bg-white rounded-lg shadow-lg flex flex-col">
      <div className="bg-indigo-600 text-white px-4 py-3 rounded-t-lg">
        <h2 className="font-semibold">Chat</h2>
        <p className="text-xs text-indigo-200">Active now</p>
      </div>

      {conversationId ? (
        <MessagesList type="ACTIVE" messages={activeMessages} visitorActorId={visitorActorId} />
      ) : (
        <MessagesList type="PENDING" messages={visitorMessages} />
      )}

      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={handleSend}
            className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-full transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
