import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import MoodTimelineChart from "@/components/dashboard/mood-timeline-chart";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="bg-card p-4 sm:p-6 border-b">
        <h1 className="text-2xl font-bold font-headline">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's a summary of your journey.</p>
      </header>
      <div className="flex-1 p-4 sm:p-6 space-y-6 overflow-auto">
        <Card>
          <CardHeader>
            <CardTitle>Mood Timeline</CardTitle>
            <CardDescription>Your emotional trends over the last 14 days.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <MoodTimelineChart />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
            <Card className="flex flex-col">
                <CardHeader>
                    <CardTitle>Ready for a Check-in?</CardTitle>
                    <CardDescription>Take a moment to connect with your feelings. A quick check-in can provide valuable insights.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex items-end">
                    <Button asChild>
                        <Link href="/check-in">Start Check-in <ArrowRight className="ml-2" /></Link>
                    </Button>
                </CardContent>
            </Card>
            <Card className="flex flex-col">
                <CardHeader>
                    <CardTitle>Continue Journaling</CardTitle>
                    <CardDescription>Your thoughts are important. Write a new entry to explore what's on your mind.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex items-end">
                    <Button variant="secondary" asChild>
                        <Link href="/journal">Open Journal <ArrowRight className="ml-2" /></Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
