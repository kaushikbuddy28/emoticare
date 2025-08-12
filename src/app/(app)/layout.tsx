'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookText,
  Bot,
  HeartHandshake,
  LayoutDashboard,
  Scan,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/check-in', label: 'Check-in', icon: Scan },
  { href: '/journal', label: 'Journal', icon: BookText },
  { href: '/chat', label: 'AI Companion', icon: Bot },
  { href: '/support', label: 'Support', icon: HeartHandshake },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2">
              <AppLogo />
              <h1 className="text-xl font-semibold font-headline text-foreground">
                EmotiCare
              </h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <Link href={item.href} legacyBehavior passHref>
                    <SidebarMenuButton
                      isActive={pathname === item.href}
                      tooltip={{ children: item.label }}
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <Separator />
          <SidebarFooter>
            <div className="flex items-center gap-3 p-2">
              <Avatar>
                <AvatarImage src="https://placehold.co/40x40" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">
                  User
                </span>
                <span className="text-xs text-muted-foreground">
                  user@emoticare.app
                </span>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1 bg-secondary/30">{children}</main>
      </div>
    </SidebarProvider>
  );
}
