import type { Metadata, Viewport } from 'next';
import '@fontsource/antonio/700.css';
import '@fontsource/black-han-sans/400.css';
import '@fontsource/doto/900.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import '@fontsource/krona-one/400.css';
import './globals.css';
import './pages.css';
import { Providers } from '@/lib/state';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import BookSheet from '@/components/BookSheet';
import { BASE } from '@/lib/data';

export const metadata: Metadata = {
  title: { default: 'DAKDAK · korean fried chicken + soju bar, paris 10', template: '%s · DAKDAK' },
  description: 'korean fried chicken, cold soju and too much gochujang. 8 rue du coq, paris 10. open till 2am.',
  icons: { icon: `${BASE}/favicon.svg` },
  openGraph: { title: 'DAKDAK · 닭닭', description: 'korean fried chicken + soju bar, paris 10. open till 2am.', images: [`${BASE}/og.jpg`] },
};
export const viewport: Viewport = { themeColor: '#0b0a09', width: 'device-width', initialScale: 1 };

const sauceBoot = `try{var s=JSON.parse(localStorage.getItem('dakdak-sauce'));if(s)document.documentElement.dataset.sauce=s}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-sauce="fry-oil" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: sauceBoot }} />
      </head>
      <body>
        <Providers>
          <a className="skip" href="#main">skip to content</a>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
          <BookSheet />
        </Providers>
      </body>
    </html>
  );
}
