import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'jobs', description: 'fry cook, floor, bar. nights in paris 10. tear a tab.' };
export default function L({ children }: { children: React.ReactNode }) {
  return children;
}
