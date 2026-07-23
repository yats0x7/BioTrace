import { LoginForm } from '@/components/forms/login-form';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Login | BioTrace',
  description: 'Log in to your BioTrace account.',
};

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-6">
      <Link href="/" className="mx-auto font-bold text-2xl text-primary flex items-center gap-2 mb-4">
        <span className="h-8 w-8 rounded-lg bg-primary text-primary-foreground grid place-items-center text-sm shadow-sm">
          B
        </span>
        BioTrace
      </Link>
      <LoginForm />
    </div>
  );
}
