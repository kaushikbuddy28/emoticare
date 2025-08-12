"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { ChartConfig } from "@/components/ui/chart"

const mockData = [
  { date: "14 days ago", mood: 3 },
  { date: "13 days ago", mood: 4 },
  { date: "12 days ago", mood: 2 },
  { date: "11 days ago", mood: 5 },
  { date: "10 days ago", mood: 4 },
  { date: "9 days ago", mood: 6 },
  { date: "8 days ago", mood: 5 },
  { date: "7 days ago", mood: 7 },
  { date: "6 days ago", mood: 6 },
  { date: "5 days ago", mood: 8 },
  { date: "4 days ago", mood: 7 },
  { date: "3 days ago", mood: 6 },
  { date: "2 days ago", mood: 7 },
  { date: "Yesterday", mood: 9 },
  { date: "Today", mood: 8 },
]

const moodLevels = [
    "Very Low", "Low", "Slightly Low", "Neutral",
    "Slightly Good", "Good", "Very Good", "Excellent", "Peak"
]

const chartConfig = {
  mood: {
    label: "Mood Level",
  },
} satisfies ChartConfig

export default function MoodTimelineChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={mockData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
        <YAxis 
          tickFormatter={(value) => moodLevels[value-1]}
          domain={[1, 9]}
          ticks={[1, 3, 5, 7, 9]}
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            borderColor: 'hsl(var(--border))',
          }}
          labelStyle={{
            color: 'hsl(var(--foreground))'
          }}
          formatter={(value: number) => [moodLevels[value-1], "Mood"]}
        />
        <Area type="monotone" dataKey="mood" stroke="hsl(var(--primary))" fill="url(#colorMood)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
