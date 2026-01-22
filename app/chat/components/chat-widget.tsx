'use client'

import { useVisitorSocket } from '@/hooks/use-visitor-socket'
import { Send } from 'lucide-react'
import { useState } from 'react'
import { MessagesList } from './message-list'
import { messages } from './messages'

export const ChatWidget: React.FC = () => {
  const [inputText, setInputText] = useState('')

  const currentUserId = 'user1'

  useVisitorSocket()

  const handleSend = () => {
    if (inputText.trim()) {
      console.log('Sending:', inputText)
      setInputText('')
    }
  }

  return (
    <div className="w-full max-w-[480px] h-[600px] bg-white rounded-lg shadow-lg flex flex-col">
      <div className="bg-indigo-600 text-white px-4 py-3 rounded-t-lg">
        <h2 className="font-semibold">Chat</h2>
        <p className="text-xs text-indigo-200">Active now</p>
      </div>

      <MessagesList messages={messages} currentUserId={currentUserId} />

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
