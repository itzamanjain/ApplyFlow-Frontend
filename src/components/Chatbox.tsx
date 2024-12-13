import React, { useState, useRef, useEffect } from 'react'
import { askQuestion } from '../api'

interface Message {
  text: string
  isUser: boolean
}

interface ChatboxProps {
  resumeText: string
}

const Chatbox: React.FC<ChatboxProps> = ({ resumeText }) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(scrollToBottom, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = { text: input, isUser: true }
    setMessages((prevMessages) => [...prevMessages, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await askQuestion(input, resumeText)
      const aiMessage: Message = { text: response, isUser: false }
      setMessages((prevMessages) => [...prevMessages, aiMessage])
    } catch (error) {
      console.error('Error asking question:', error)
      const errorMessage: Message = {
        text: 'Sorry, I encountered an error. Please try again.',
        isUser: false,
      }
      setMessages((prevMessages) => [...prevMessages, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg h-[350px] flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto mb-4 pr-4 scrollbar-hide">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-lg max-w-[80%] ${
              message.isUser
                ? 'bg-blue-100 text-blue-800 ml-auto'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {message.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex ">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your resume..."
          className="flex-1 p-2 border-t rounded-md border-l border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="bg-blue-500 rounded-md ml-2 text-white px-4 py-2 border-t border-r border-blue-600 disabled:bg-gray-400 disabled:border-gray-500"
          disabled={isLoading}
        >
          {isLoading ? 'Thinking...' : 'Send'}
        </button>
      </form>
    </div>
  )
}

export default Chatbox

