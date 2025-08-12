import CheckInClient from "@/components/check-in/check-in-client";

export default function CheckInPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="bg-card p-4 sm:p-6 border-b">
        <h1 className="text-2xl font-bold font-headline">Multimodal Check-in</h1>
        <p className="text-muted-foreground">Let's see how you're feeling. This process is private and secure.</p>
      </header>
      <div className="flex-1 p-4 sm:p-6 overflow-auto">
        <CheckInClient />
      </div>
    </div>
  );
}
