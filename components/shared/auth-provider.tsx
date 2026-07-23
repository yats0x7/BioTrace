'use client';

import React, { useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuthStore } from '@/store/auth-store';
import { useRouter } from 'next/navigation';

import { Session } from '@supabase/supabase-js';
import type { User as Profile } from '@/lib/types';

export function AuthProvider({ 
  children,
  initialSession,
  initialProfile
}: { 
  children: React.ReactNode;
  initialSession?: Session | null;
  initialProfile?: Profile | null;
}) {
  const { setUser, setProfile, setIsLoading, clearSession, user, profile } = useAuthStore();
  const router = useRouter();
  const supabase = createClient();

  // Hydrate on initial render
  React.useEffect(() => {
    if (initialSession?.user && !user) {
      setUser(initialSession.user);
      if (initialProfile) setProfile(initialProfile);
      setIsLoading(false);
    }
  }, [initialSession, initialProfile, user, setUser, setProfile, setIsLoading]);

  useEffect(() => {
    const initializeAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (session?.user) {
        setUser(session.user);
        // Fetch profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (profile) setProfile(profile);
      } else {
        clearSession();
      }
      setIsLoading(false);
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        if (profile) setProfile(profile);
        
        if (event === 'SIGNED_IN') {
          router.refresh();
        }
      } else {
        clearSession();
        router.refresh();
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, setUser, setProfile, setIsLoading, clearSession, router]);

  return <>{children}</>;
}
