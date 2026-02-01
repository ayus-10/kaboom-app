'use client'

import { handleKeyDown } from '@/lib/utils'
import { useState } from 'react'

export const ChatReplyInput: React.FC<{
  onSend: (text: string) => void
  disabled?: boolean
}> = ({ onSend, disabled }) => {
  const [draft, setDraft] = useState('')

  const handleSubmit = () => {
    const trimmed = draft.trim()
    if (!trimmed) return
    onSend(trimmed)
    setDraft('')
  }

  return (
    <div className="shrink-0 border-t border-gray-200 bg-white p-3">
      <div className="flex items-end gap-2">
        <textarea
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => handleKeyDown(e, handleSubmit)}
          placeholder="Type a message..."
          rows={1}
          className="flex-1 resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 min-h-[42px] max-h-32"
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="shrink-0 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none min-h-[42px]"
          disabled={!draft.trim() || disabled}
        >
          Send
        </button>
      </div>
    </div>
  )
}
