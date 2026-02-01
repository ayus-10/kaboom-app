'use client'

import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

export const EmbedSteps: React.FC = () => {
  const [copied, setCopied] = useState(false)
  const embedCode = `<script src="http://localhost:3000/js/chat-widget.js" data-widget-id="abc123"></script>`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-16">
      <div className="flex gap-8">
        <div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-semibold text-lg">
            1
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Get your embed code</h3>
          <p className="text-gray-700 mb-6">
            Navigate to your project dashboard and copy your unique widget ID. Your embed code will
            look like this:
          </p>

          <div className="relative">
            <pre className="bg-gray-900 text-gray-100 p-4 sm:p-5 rounded-lg overflow-x-auto text-xs sm:text-sm max-w-full">
              <code className="break-all whitespace-pre-wrap">{embedCode}</code>
            </pre>
            <button
              onClick={copyToClipboard}
              aria-label="Copy embed code"
              className="absolute top-2 right-2 sm:top-4 sm:right-4 rounded-md bg-gray-800 p-1.5 sm:p-2 text-gray-400 hover:bg-gray-700 hover:text-white transition"
            >
              {copied ? (
                <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
              ) : (
                <Copy className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        <div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-semibold text-lg">
            2
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Add the script to your site</h3>
          <p className="text-gray-700 mb-6">
            Paste the script tag at the end of your{' '}
            <code className="rounded bg-gray-100 px-2 py-1 font-mono text-sm text-gray-800">
              &lt;body&gt;
            </code>{' '}
            tag, just before the closing{' '}
            <code className="rounded bg-gray-100 px-2 py-1 font-mono text-sm text-gray-800">
              &lt;/body&gt;
            </code>
            .
          </p>
          <div className="rounded-md border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
            Make sure to replace{' '}
            <code className="rounded bg-amber-100 px-1.5 py-0.5 font-mono text-xs">abc123</code>{' '}
            with your actual widget ID from the dashboard.
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        <div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-semibold text-lg">
            3
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">You're done!</h3>
          <p className="text-gray-700">
            That's it! The chat widget will automatically appear on your website. Visit your site to
            see it in action and start chatting with your visitors.
          </p>
        </div>
      </div>
    </div>
  )
}
