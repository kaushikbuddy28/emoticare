"use client"

import { useState, useTransition } from "react"
import { format, parseISO } from "date-fns"
import { Loader2, Sparkles, Wand2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import type { JournalEntry } from "@/lib/types"
import { analyzeJournalEntryAction } from "@/lib/actions"

const mockEntries: JournalEntry[] = [
  {
    id: "1",
    createdAt: "2023-10-26T10:00:00Z",
    content: "Felt a bit overwhelmed today with work, but managed to get through it. A walk in the evening helped clear my head.",
    sentiment: "neutral",
    moodLabel: "Reflective"
  },
  {
    id: "2",
    createdAt: "2023-10-25T21:30:00Z",
    content: "Had a really great day! Spent time with friends and felt genuinely happy and connected. It's moments like these I cherish.",
    sentiment: "positive",
    moodLabel: "Joyful"
  },
]

export default function JournalClient() {
  const [entries, setEntries] = useState<JournalEntry[]>(mockEntries)
  const [newEntry, setNewEntry] = useState("")
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const handleSaveEntry = () => {
    if (!newEntry.trim()) return

    startTransition(async () => {
      const result = await analyzeJournalEntryAction({ text: newEntry })
      const entry: JournalEntry = {
        id: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        content: newEntry,
        sentiment: result.sentiment,
        moodLabel: result.moodLabel,
      }
      setEntries([entry, ...entries])
      setNewEntry("")
      toast({
        title: "Entry Saved!",
        description: `We've analyzed your entry. Mood: ${result.moodLabel}.`,
      })
    })
  }

  const getSentimentBadgeVariant = (sentiment: string) => {
    switch(sentiment.toLowerCase()) {
        case 'positive': return 'default';
        case 'negative': return 'destructive';
        default: return 'secondary';
    }
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>New Entry</CardTitle>
            <CardDescription>What's on your mind?</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={newEntry}
              onChange={(e) => setNewEntry(e.target.value)}
              placeholder="Start writing here..."
              className="min-h-[200px]"
              disabled={isPending}
            />
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveEntry} disabled={!newEntry.trim() || isPending} className="w-full">
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
              Save & Analyze
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Past Entries</CardTitle>
            <CardDescription>Review your previous thoughts and moods.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {entries.length > 0 ? entries.map((entry) => (
                <div key={entry.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{format(parseISO(entry.createdAt), "MMMM d, yyyy")}</p>
                      <p className="text-sm text-muted-foreground">{format(parseISO(entry.createdAt), "h:mm a")}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getSentimentBadgeVariant(entry.sentiment)}>{entry.sentiment}</Badge>
                      <Badge variant="outline">{entry.moodLabel}</Badge>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-foreground/80">{entry.content}</p>
                </div>
              )) : (
                <p className="text-sm text-muted-foreground text-center py-8">You have no journal entries yet.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
