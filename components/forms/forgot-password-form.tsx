'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import Link from 'next/link';

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type FormData = z.infer<typeof formSchema>;

export function ForgotPasswordForm() {
  const supabase = createClient();
  const [isLoading, setIsLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      toast.error(error.message);
      setIsLoading(false);
      return;
    }

    setSubmitted(true);
    setIsLoading(false);
  };

  if (submitted) {
    return (
      <div className="bg-card text-card-foreground shadow-sm rounded-xl border p-8 w-full max-w-md mx-auto text-center space-y-4">
        <h2 className="text-xl font-bold">Check your email</h2>
        <p className="text-sm text-muted-foreground">
          We sent a password reset link to your email address.
        </p>
        <div className="pt-4">
          <Link href="/login" className="text-primary hover:underline font-medium text-sm">
            Return to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card text-card-foreground shadow-sm rounded-xl border p-8 w-full max-w-md mx-auto space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Forgot password</h1>
        <p className="text-sm text-muted-foreground">Enter your email to receive a reset link</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">Email</label>
          <input 
            id="email" 
            type="email" 
            className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" 
            placeholder="name@example.com"
            {...register('email')}
            disabled={isLoading}
          />
          {errors.email && <p className="text-[0.8rem] font-medium text-destructive">{errors.email.message}</p>}
        </div>

        <button 
          type="submit" 
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send reset link'}
        </button>
      </form>

      <div className="text-center text-sm">
        Remember your password?{' '}
        <Link href="/login" className="text-primary hover:underline font-medium">
          Log in
        </Link>
      </div>
    </div>
  );
}
