"use client"

import React from "react"
import { useState, useRef, useEffect } from "react"
import { askQuestion } from "../api"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, User, Bot } from "lucide-react"

interface Message {
  text: string
  isUser: boolean
}

interface ChatboxProps {
  resumeText: string
}

const Chatbox: React.FC<ChatboxProps> = ({ resumeText }) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = { text: input, isUser: true }
    setMessages((prevMessages) => [...prevMessages, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await askQuestion(input, resumeText)
      const aiMessage: Message = { text: response, isUser: false }
      setMessages((prevMessages) => [...prevMessages, aiMessage])
    } catch (error) {
      console.error("Error asking question:", error)
      const errorMessage: Message = {
        text: "Sorry, I encountered an error. Please try again.",
        isUser: false,
      }
      setMessages((prevMessages) => [...prevMessages, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-[800px]  mx-auto">
      <CardHeader>
        <CardTitle>Resume Assistant</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[350px] pr-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex mb-4 ${message.isUser ? "justify-end" : "justify-start"}`}>
              {!message.isUser && (
                <Avatar className="mr-2">
                  <AvatarFallback>
                    <Bot size={24} />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`p-3 rounded-lg max-w-[80%] ${
                  message.isUser ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                {message.text}
              </div>
              {message.isUser && (
                <Avatar className="ml-2">
                  <AvatarFallback>
                    <User size={24} />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center text-muted-foreground">
              <Bot size={24} className="mr-2" />
              <span>Thinking...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit} className="flex w-full space-x-2">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your resume..."
            className="flex-1 h-16 bg-transparent"
            disabled={isLoading}
          />
          <Button type="submit" className="text-lg h-12 rounded-xl justify-center items-center"  disabled={isLoading}>
            {isLoading ? (
              "Thinking..."
            ) : (
              <>
                Send
                <Send className="text-2xl" />
              </>
            )}
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}

export default Chatbox
