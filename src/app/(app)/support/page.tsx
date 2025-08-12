import EmergencySupportClient from "@/components/support/emergency-support-client";

export default function SupportPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="bg-card p-4 sm:p-6 border-b">
        <h1 className="text-2xl font-bold font-headline">Emergency Support</h1>
        <p className="text-muted-foreground">If you are in crisis, please reach out. Help is available.</p>
      </header>
      <div className="flex-1 p-4 sm:p-6 overflow-auto">
        <EmergencySupportClient />
      </div>
    </div>
  );
}
