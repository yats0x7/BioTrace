import { RegisterForm } from '@/components/forms/register-form';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Register | BioTrace',
  description: 'Create a new BioTrace account.',
};

export default function RegisterPage() {
  return (
    <div className="flex flex-col gap-6">
      <Link href="/" className="mx-auto font-bold text-2xl text-primary flex items-center gap-2 mb-4">
        <span className="h-8 w-8 rounded-lg bg-primary text-primary-foreground grid place-items-center text-sm shadow-sm">
          B
        </span>
        BioTrace
      </Link>
      <RegisterForm />
    </div>
  );
}
