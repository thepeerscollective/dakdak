import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'menu', description: 'numbered like a seoul chicken shop board. soy garlic, yangnyeom, snow cheese, banban, soju.' };
export default function L({ children }: { children: React.ReactNode }) {
  return children;
}
