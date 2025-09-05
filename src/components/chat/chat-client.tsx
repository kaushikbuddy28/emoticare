"use client"

import { useState, useRef, useEffect, useTransition } from "react"
import { Bot, User, CornerDownLeft, Loader2, BookCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getChatResponse } from "@/lib/actions"
import type { ChatMessage } from "@/lib/types"
import { cn } from "@/lib/utils"

const initialMessages: ChatMessage[] = [
  {
    role: "assistant",
    content: "Hello! I'm your supportive AI companion. How are you feeling today? Feel free to share what's on your mind.",
  },
]

export default function ChatClient() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isPending, startTransition] = useTransition()
  const [suggestedActions, setSuggestedActions] = useState<string[]>([])

  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  }, [messages])
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isPending) return

    const userMessage: ChatMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    startTransition(async () => {
      const res = await getChatResponse({ message: input });
      const assistantMessage: ChatMessage = { role: "assistant", content: res.response };
      setMessages((prev) => [...prev, assistantMessage]);
      if (res.suggested_actions) {
        setSuggestedActions(res.suggested_actions);
      }
    });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 h-full gap-6 p-4 sm:p-6">
      <div className="md:col-span-2 flex flex-col h-full bg-card rounded-lg border">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-6">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-3",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {msg.role === "assistant" && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback><Bot size={20} /></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "max-w-md rounded-lg px-4 py-3 text-sm",
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <p>{msg.content}</p>
                </div>
                 {msg.role === "user" && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback><User size={20} /></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isPending && (
               <div className="flex items-start gap-3 justify-start">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback><Bot size={20} /></AvatarFallback>
                  </Avatar>
                  <div className="max-w-md rounded-lg px-4 py-3 text-sm bg-muted flex items-center">
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    <span>Thinking...</span>
                  </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
              disabled={isPending}
            />
            <Button type="submit" disabled={!input.trim() || isPending}>
              <CornerDownLeft size={16} />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </div>
      </div>
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Suggested Actions</CardTitle>
          </CardHeader>
          <CardContent>
            {suggestedActions.length > 0 ? (
              <ul className="space-y-3">
                {suggestedActions.map((action, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <BookCheck className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                    <p className="text-sm">{action}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                Suggestions from your AI companion will appear here based on your conversation.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}