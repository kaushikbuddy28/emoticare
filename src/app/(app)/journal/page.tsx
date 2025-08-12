import JournalClient from "@/components/journal/journal-client";

export default function JournalPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="bg-card p-4 sm:p-6 border-b">
        <h1 className="text-2xl font-bold font-headline">Digital Journal</h1>
        <p className="text-muted-foreground">A private space for your thoughts and feelings. Entries are analyzed to help you understand your mood patterns.</p>
      </header>
      <div className="flex-1 p-4 sm:p-6 overflow-auto">
        <JournalClient />
      </div>
    </div>
  );
}
