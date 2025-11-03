'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLogo from '@/components/app-logo';
import { useApiKey } from '@/components/api-key-provider';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const { setApiKey } = useApiKey();
  const router = useRouter();
  const [localApiKey, setLocalApiKey] = useState('');

  const handleLogin = () => {
    if (localApiKey) {
      setApiKey(localApiKey);
    }
    router.push('/dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mb-4 inline-block">
            <AppLogo />
          </div>
          <CardTitle className="text-2xl font-headline">Welcome to EmotiCare</CardTitle>
          <CardDescription>
            Sign in to continue your journey of reflection and growth.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                defaultValue="user@emoticare.app"
              />
            </div>
             <div className="grid gap-2">
              <Label htmlFor="api-key">Gemini API Key (Optional)</Label>
              <Input
                id="api-key"
                type="password"
                placeholder="Enter your API key"
                value={localApiKey}
                onChange={(e) => setLocalApiKey(e.target.value)}
              />
               <p className="text-xs text-muted-foreground">
                You can also add this later in Settings.
              </p>
            </div>
            <Button onClick={handleLogin} type="submit" className="w-full">
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
