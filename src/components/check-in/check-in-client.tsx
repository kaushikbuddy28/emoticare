
"use client"

import { useState, useTransition, useEffect, useRef } from "react"
import { Camera, Mic, FileText, Sparkles, Loader2, ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { predictMoodAction } from "@/lib/actions"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { MoodPredictionOutput } from "@/ai/flows/mood-prediction"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LabelList } from "recharts"
import { useToast } from "@/hooks/use-toast"

type Step = "face" | "voice" | "text" | "result"

const steps: { id: Step; title: string; icon: React.ElementType }[] = [
  { id: "face", title: "Face Scan", icon: Camera },
  { id: "voice", title: "Voice Tone", icon: Mic },
  { id: "text", title: "Your Thoughts", icon: FileText },
  { id: "result", title: "Your Mood", icon: Sparkles },
]

function AudioVisualizer({ stream }: { stream: MediaStream | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!stream || !canvasRef.current) return

    const audioContext = new AudioContext()
    const analyser = audioContext.createAnalyser()
    const source = audioContext.createMediaStreamSource(stream)
    source.connect(analyser)
    analyser.fftSize = 256
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const canvas = canvasRef.current
    const canvasCtx = canvas.getContext("2d")
    let animationFrameId: number;

    const draw = () => {
      animationFrameId = requestAnimationFrame(draw)
      analyser.getByteFrequencyData(dataArray)
      if (canvasCtx) {
        canvasCtx.fillStyle = "hsl(var(--muted))"
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height)
        const barWidth = (canvas.width / bufferLength) * 2.5
        let x = 0
        for (let i = 0; i < bufferLength; i++) {
          const barHeight = dataArray[i] / 2
          canvasCtx.fillStyle = `hsl(var(--primary))`
          canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)
          x += barWidth + 1
        }
      }
    }

    draw()

    return () => {
      cancelAnimationFrame(animationFrameId)
      stream.getTracks().forEach(track => track.stop())
      audioContext.close()
    }
  }, [stream])

  return <canvas ref={canvasRef} className="w-full h-40 rounded-lg" />;
}

export default function CheckInClient() {
  const [currentStep, setCurrentStep] = useState<Step>("face")
  const [textInput, setTextInput] = useState("")
  const [result, setResult] = useState<MoodPredictionOutput | null>(null)
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const [hasCameraPermission, setHasCameraPermission] = useState(false)
  const [hasMicPermission, setHasMicPermission] = useState(false)
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    let stream: MediaStream;
    const getCameraPermission = async () => {
      if (currentStep !== 'face') return;
      try {
        stream = await navigator.mediaDevices.getUserMedia({video: true});
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this feature.',
        });
      }
    };
    
    if (currentStep === 'face') {
        getCameraPermission();
    }

    return () => {
        if(stream) {
            stream.getTracks().forEach(track => track.stop());
        }
    }
  }, [currentStep, toast]);

  useEffect(() => {
    let stream: MediaStream;
    const getMicPermission = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({audio: true});
        setHasMicPermission(true);
        setAudioStream(stream);
      } catch (error) {
        console.error('Error accessing microphone:', error);
        setHasMicPermission(false);
        toast({
          variant: 'destructive',
          title: 'Microphone Access Denied',
          description: 'Please enable microphone permissions in your browser settings to use this feature.',
        });
      }
    };

    if (currentStep === 'voice') {
      getMicPermission();
    } else {
        if(audioStream){
            audioStream.getTracks().forEach(track => track.stop());
            setAudioStream(null);
        }
    }
    
    return () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
    }
  }, [currentStep, toast, audioStream]);
  
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
    if(!textInput.trim()){
      toast({
        variant: 'destructive',
        title: 'Input Required',
        description: 'Please share your thoughts before getting a result.',
      })
      return;
    }
    startTransition(async () => {
      try {
        const prediction = await predictMoodAction({
          faceEmbedding: [], // Mocked
          audioEmbedding: [], // Mocked
          text: textInput,
        })
        setResult(prediction)
        setCurrentStep("result")
      } catch (e: any) {
        toast({
          variant: 'destructive',
          title: 'Prediction Failed',
          description: 'Could not get mood prediction. Please try again later.',
        });
      }
    })
  }
  
  const resetCheckIn = () => {
    setCurrentStep("face");
    setTextInput("");
    setResult(null);
  }
  
  const StepIcon = steps[currentStepIndex].icon;

  const renderStepContent = () => {
    switch (currentStep) {
      case "face":
        return (
          <CardContent className="flex flex-col items-center gap-4 text-center">
             <div className="w-full aspect-video bg-muted rounded-lg flex items-center justify-center overflow-hidden">
               <video ref={videoRef} className="w-full aspect-video rounded-md" autoPlay muted playsInline />
            </div>
            { !hasCameraPermission && (
              <Alert variant="destructive" className="text-left">
                <Camera className="h-4 w-4" />
                <AlertTitle>Camera Access Required</AlertTitle>
                <AlertDescription>
                  Please allow camera access to use this feature. Your browser may be blocking access.
                </AlertDescription>
              </Alert>
            )}
            <p className="text-sm text-muted-foreground">Position your face in the frame. We'll analyze your expression to understand your emotions. This is a simulation.</p>
          </CardContent>
        )
      case "voice":
        return (
          <CardContent className="flex flex-col items-center gap-4 text-center">
            <div className="w-full h-40 bg-muted rounded-lg flex items-center justify-center">
               {hasMicPermission && audioStream ? (
                <AudioVisualizer stream={audioStream} />
               ) : (
                <Mic className="h-16 w-16 text-muted-foreground" />
               )}
            </div>
             { !hasMicPermission && (
              <Alert variant="destructive" className="text-left">
                <Mic className="h-4 w-4" />
                <AlertTitle>Microphone Access Required</AlertTitle>
                <AlertDescription>
                  Please allow microphone access to use this feature. Your browser may be blocking access.
                </AlertDescription>
              </Alert>
            )}
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
          <StepIcon className="h-6 w-6 text-primary" />
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
