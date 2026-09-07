import { redirect } from 'next/navigation';

// The real Diet Library implementation lives at /trainer/library.
// This route is kept for backward compatibility but redirects immediately.
export default function TrainerDietPlansPage() {
  redirect('/trainer/library');
}
