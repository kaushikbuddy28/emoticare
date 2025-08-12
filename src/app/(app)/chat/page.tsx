import ChatClient from "@/components/chat/chat-client";

export default function ChatPage() {
  return (
    <div className="flex flex-col h-full">
       <header className="bg-card p-4 sm:p-6 border-b">
        <h1 className="text-2xl font-bold font-headline">AI Chat Companion</h1>
        <p className="text-muted-foreground">A supportive, non-judgmental space to talk. Powered by CBT-informed AI.</p>
      </header>
      <div className="flex-1 overflow-hidden">
        <ChatClient />
      </div>
    </div>
  );
}
