import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'find us', description: '8 rue du coq, paris 10. hours, map, walk-ins.' };
export default function L({ children }: { children: React.ReactNode }) {
  return children;
}
