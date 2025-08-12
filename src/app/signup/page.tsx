import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import AppLogo from "@/components/app-logo"

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="mx-auto w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mb-4 inline-block">
            <AppLogo />
          </div>
          <CardTitle className="text-2xl font-headline">Create an Account</CardTitle>
          <CardDescription>
            Start your journey with EmotiCare today.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" placeholder="Max" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" placeholder="Robinson" required />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>

            <Separator className="my-2" />

            <div className="space-y-4">
              <h3 className="text-md font-medium">Data & Privacy Consent</h3>
              <p className="text-sm text-muted-foreground">
                To provide you with the most accurate insights, EmotiCare can analyze data from your device. Your data is processed securely. Please provide consent for the features you wish to use.
              </p>
              <div className="items-top flex space-x-2">
                <Checkbox id="consent-webcam" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="consent-webcam"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Webcam Analysis
                  </label>
                  <p className="text-sm text-muted-foreground">
                    Allow the app to analyze facial expressions from your webcam for emotion detection.
                  </p>
                </div>
              </div>
              <div className="items-top flex space-x-2">
                <Checkbox id="consent-audio" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="consent-audio"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Audio Analysis
                  </label>
                  <p className="text-sm text-muted-foreground">
                    Allow the app to analyze your voice for tone and stress detection.
                  </p>
                </div>
              </div>
              <div className="items-top flex space-x-2">
                <Checkbox id="consent-text" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="consent-text"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Text Analysis
                  </label>
                  <p className="text-sm text-muted-foreground">
                    Allow the app to analyze your journal entries for sentiment and mood.
                  </p>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" asChild>
                <Link href="/dashboard">Create an account</Link>
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
