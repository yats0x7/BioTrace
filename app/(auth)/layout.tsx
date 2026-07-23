import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid place-items-center bg-muted/30 p-4 md:p-8">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
