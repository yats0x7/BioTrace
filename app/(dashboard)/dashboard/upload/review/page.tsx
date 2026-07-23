import { redirect } from 'next/navigation';

export default function UploadReviewRedirect() {
  // The upload wizard is a single-page application using Zustand for state.
  // We redirect to the main upload route to maintain the flow correctly.
  redirect('/dashboard/upload');
}
