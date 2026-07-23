import { ForgotPasswordForm } from '@/components/forms/forgot-password-form';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Forgot Password | BioTrace',
  description: 'Reset your BioTrace account password.',
};

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col gap-6">
      <Link href="/" className="mx-auto font-bold text-2xl text-primary flex items-center gap-2 mb-4">
        <span className="h-8 w-8 rounded-lg bg-primary text-primary-foreground grid place-items-center text-sm shadow-sm">
          B
        </span>
        BioTrace
      </Link>
      <ForgotPasswordForm />
    </div>
  );
}
