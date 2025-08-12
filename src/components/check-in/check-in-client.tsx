"use client"

import { useState, useTransition } from "react"
import { Camera, Mic, FileText, Sparkles, Loader2, ArrowRight, ArrowLeft } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { predictMoodAction } from "@/lib/actions"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { MoodPredictionOutput } from "@/ai/flows/mood-prediction"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LabelList } from "recharts"

type Step = "face" | "voice" | "text" | "result"

const steps: { id: Step; title: string; icon: React.ElementType }[] = [
  { id: "face", title: "Face Scan", icon: Camera },
  { id: "voice", title: "Voice Tone", icon: Mic },
  { id: "text", title: "Your Thoughts", icon: FileText },
  { id: "result", title: "Your Mood", icon: Sparkles },
]

export default function CheckInClient() {
  const [currentStep, setCurrentStep] = useState<Step>("face")
  const [textInput, setTextInput] = useState("")
  const [result, setResult] = useState<MoodPredictionOutput | null>(null)
  const [isPending, startTransition] = useTransition()
  
  const currentStepIndex = steps.findIndex(s => s.id === currentStep)
  const progressValue = ((currentStepIndex + 1) / steps.length) * 100

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].id)
    }
  }

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id);
    }
  }

  const handleFinish = () => {
    startTransition(async () => {
      const prediction = await predictMoodAction({
        faceEmbedding: [], // Mocked
        audioEmbedding: [], // Mocked
        text: textInput,
      })
      setResult(prediction)
      setCurrentStep("result")
    })
  }
  
  const resetCheckIn = () => {
    setCurrentStep("face");
    setTextInput("");
    setResult(null);
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case "face":
        return (
          <CardContent className="flex flex-col items-center gap-4 text-center">
            <div className="w-full aspect-video bg-muted rounded-lg flex items-center justify-center overflow-hidden">
               <Image src="https://placehold.co/600x400" alt="Webcam preview" width={600} height={400} data-ai-hint="webcam selfie" />
            </div>
            <p className="text-sm text-muted-foreground">Position your face in the frame. We'll analyze your expression to understand your emotions. This is a simulation.</p>
          </CardContent>
        )
      case "voice":
        return (
          <CardContent className="flex flex-col items-center gap-4 text-center">
            <div className="w-full h-40 bg-muted rounded-lg flex items-center justify-center">
              <Mic className="h-16 w-16 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">When you're ready, we'll ask you to speak for a few seconds to analyze your vocal tone for signs of stress. This is a simulation.</p>
          </CardContent>
        )
      case "text":
        return (
          <CardContent className="flex flex-col items-center gap-4">
            <Textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Describe how you're feeling right now. What's on your mind?"
              className="min-h-[150px] w-full"
            />
          </CardContent>
        )
      case "result":
        return (
          <CardContent className="flex flex-col items-center gap-4 text-center">
            {isPending ? (
              <div className="flex flex-col items-center justify-center h-48">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 text-muted-foreground">Fusing insights...</p>
              </div>
            ) : result ? (
              <Alert className="w-full text-left">
                <Sparkles className="h-4 w-4" />
                <AlertTitle>Your predicted mood is: {result.mood}</AlertTitle>
                <AlertDescription className="mt-2">
                  <p className="mb-4">{result.recommendedAction}</p>
                   {result.probabilities && (
                    <div className="h-48 w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={Object.entries(result.probabilities).map(([name, value]) => ({ name, value: Math.round(value * 100) }))} layout="vertical" margin={{ left: 10, right: 30 }}>
                                <XAxis type="number" hide />
                                <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} width={80} tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }} />
                                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]}>
                                    <LabelList dataKey="value" position="right" formatter={(value: number) => `${value}%`} offset={5} fontSize={12} fill="hsl(var(--foreground))" />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            ) : null}
          </CardContent>
        )
      default:
        return null
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <Progress value={progressValue} className="mb-4" />
        <CardTitle className="flex items-center gap-2">
          {steps[currentStepIndex].icon({ className: "h-6 w-6 text-primary" })}
          {steps[currentStepIndex].title}
        </CardTitle>
        <CardDescription>
          Complete each step to get a comprehensive analysis of your current emotional state.
        </CardDescription>
      </CardHeader>

      {renderStepContent()}
      
      <CardContent>
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={handleBack} disabled={currentStepIndex === 0 || currentStep === 'result'}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          {currentStep === "text" ? (
            <Button onClick={handleFinish} disabled={isPending}>
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              Get Result
            </Button>
          ) : currentStep === "result" ? (
             <Button onClick={resetCheckIn}>
              Start New Check-in
            </Button>
          ) : (
            <Button onClick={handleNext}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
