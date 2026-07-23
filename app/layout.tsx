import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/shared/theme-provider';
import { Toaster } from 'sonner';

import { AuthProvider } from '@/components/shared/auth-provider';
import { QueryProvider } from '@/components/shared/query-provider';
import { createClient } from '@/lib/supabase/server';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'BioTrace | Biodiversity Platform',
  description: 'AI-powered environmental DNA (eDNA) biodiversity platform.',
  icons: {
    icon: '/frog.png',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  let profile = null;
  if (session?.user) {
    const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
    profile = data;
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <AuthProvider initialSession={session} initialProfile={profile}>
              {children}
              <Toaster richColors position="top-right" />
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
