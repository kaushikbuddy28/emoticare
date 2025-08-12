"use client"

import { Phone, MessageSquare, User, ShieldCheck } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const helplines = [
  { name: "National Suicide Prevention Lifeline", number: "988" },
  { name: "Crisis Text Line", number: "Text HOME to 741741" },
  { name: "The Trevor Project", number: "1-866-488-7386" },
  { name: "Veterans Crisis Line", number: "988 then press 1" },
]

export default function EmergencySupportClient() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
       <Alert variant="destructive">
        <ShieldCheck className="h-4 w-4" />
        <AlertTitle>You Are Not Alone</AlertTitle>
        <AlertDescription>
          If you are in immediate danger, please call 911. For urgent support, the resources below are available 24/7.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone />
            National Helplines
          </CardTitle>
          <CardDescription>
            These services are free, confidential, and available anytime.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {helplines.map((line) => (
              <li key={line.name} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-muted/50 rounded-lg">
                <span className="font-medium">{line.name}</span>
                <span className="text-primary font-semibold text-lg mt-1 sm:mt-0">{line.number}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User />
            Contact a Trusted Person
          </CardTitle>
          <CardDescription>
            Reach out to someone you trust. You can pre-configure contacts in your settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-lg">
                <div>
                    <p className="font-semibold">Jane Doe</p>
                    <p className="text-sm text-muted-foreground">Trusted Contact</p>
                </div>
                <div className="flex gap-2 mt-2 sm:mt-0">
                    <Button variant="outline"><Phone className="mr-2 h-4 w-4"/> Call</Button>
                    <Button><MessageSquare className="mr-2 h-4 w-4"/> Send Alert</Button>
                </div>
           </div>
           <p className="text-xs text-muted-foreground">
             Sending an alert will message your trusted contact with a pre-defined message asking them to check in on you. This action requires your explicit confirmation.
           </p>
        </CardContent>
      </Card>
    </div>
  )
}
