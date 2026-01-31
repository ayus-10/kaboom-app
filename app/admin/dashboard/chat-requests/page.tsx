import { ChatRequests } from './components/chat-requests-page-body'

export default function ChatRequestsPage() {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Chat Requests</h1>
          <p className="mt-1 text-sm text-gray-600">
            Review and manage pending conversation requests
          </p>
        </div>

        <ChatRequests />
      </div>
    </div>
  )
}
