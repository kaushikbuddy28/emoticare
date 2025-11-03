'use client';

import { useApiKey } from '@/components/api-key-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { KeyRound } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const { apiKey, setApiKey } = useApiKey();
  const [keyInput, setKeyInput] = useState(apiKey || '');
  const { toast } = useToast();

  const handleSave = () => {
    setApiKey(keyInput);
    toast({
      title: 'API Key Saved',
      description: 'Your Gemini API key has been updated.',
    });
  };

  return (
    <div className="flex flex-col h-full">
      <header className="bg-card p-4 sm:p-6 border-b">
        <h1 className="text-2xl font-bold font-headline">Settings</h1>
        <p className="text-muted-foreground">Manage your application settings.</p>
      </header>
      <div className="flex-1 p-4 sm:p-6">
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <KeyRound />
              API Configuration
            </CardTitle>
            <CardDescription>
              Manage your Google Gemini API Key. This key is stored securely in your browser and is never shared.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <Label htmlFor="api-key">Gemini API Key</Label>
              <Input
                id="api-key"
                type="password"
                placeholder="Enter your Gemini API key"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Your API key is used to communicate with the Gemini models. Get your key from Google AI Studio.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave}>Save Key</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
