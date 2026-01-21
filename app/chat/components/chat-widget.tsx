'use client'

import { Send } from 'lucide-react'
import { useState } from 'react'

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

export const shouldShowTimestamp = (
  currentMsgTime: number | string,
  prevMsgTime: number | string
) => {
  const current = new Date(currentMsgTime)
  const prev = new Date(prevMsgTime)
  const diffMins = Math.floor((current.getTime() - prev.getTime()) / 60000)

  return diffMins > 5
}

const MessageBubble: React.FC<{ message: any; isOwnMessage: boolean }> = ({
  message,
  isOwnMessage,
}) => {
  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-2xl ${
          isOwnMessage
            ? 'bg-indigo-500 text-white rounded-br-md'
            : 'bg-gray-100 text-gray-900 rounded-bl-md'
        }`}
      >
        <p className="text-sm">{message.text}</p>
      </div>
    </div>
  )
}

const MessagesList: React.FC<{ messages: any[]; currentUserId: string }> = ({
  messages,
  currentUserId,
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {messages.map((msg, idx) => {
        const isOwnMessage = msg.senderId === currentUserId
        const showTimestamp = shouldShowTimestamp(msg, messages[idx - 1])

        return (
          <div key={msg.id}>
            {showTimestamp && (
              <div className="text-center text-xs text-gray-500 my-4">
                {formatTimestamp(msg.timestamp)}
              </div>
            )}
            <MessageBubble message={msg} isOwnMessage={isOwnMessage} />
          </div>
        )
      })}
    </div>
  )
}

export const ChatWidget: React.FC = () => {
  const [inputText, setInputText] = useState('')

  const currentUserId = 'user1'

  const mockMessages = [
    {
      id: 1,
      senderId: 'user2',
      text: 'Hey! How are you?',
      timestamp: new Date(Date.now() - 3600000 * 2),
    },
    {
      id: 2,
      senderId: 'user1',
      text: "I'm good! Just working on some projects",
      timestamp: new Date(Date.now() - 3600000 * 2 + 120000),
    },
    {
      id: 3,
      senderId: 'user2',
      text: 'Nice! What are you building?',
      timestamp: new Date(Date.now() - 3600000 * 2 + 240000),
    },
    {
      id: 4,
      senderId: 'user1',
      text: 'A chat widget with React and Tailwind',
      timestamp: new Date(Date.now() - 1800000),
    },
    {
      id: 5,
      senderId: 'user2',
      text: "That sounds cool! Can't wait to see it",
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: 6,
      senderId: 'user1',
      text: "Thanks! It's coming together nicely",
      timestamp: new Date(Date.now() - 60000),
    },
  ]

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

      <MessagesList messages={mockMessages} currentUserId={currentUserId} />

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
