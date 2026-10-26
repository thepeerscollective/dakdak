'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Clock from './Clock';
import { useBook } from '@/lib/state';
import { openStatus } from '@/lib/data';

const PAGES = [
  ['01', '/', 'home'],
  ['02', '/menu/', 'menu'],
  ['03', '/order/', 'order'],
  ['04', '#book', 'book'],
  ['05', '/parties/', 'parties'],
  ['06', '/jobs/', 'jobs'],
  ['07', '/find-us/', 'find us'],
] as const;

export default function Nav() {
  const path = usePathname();
  const { setOpen } = useBook();
  const [scrolled, setScrolled] = useState(false);
  const [board, setBoard] = useState(false);
  const [status, setStatus] = useState<ReturnType<typeof openStatus> | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    setStatus(openStatus());
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => setBoard(false), [path]);
  useEffect(() => {
    if (!board) return;
    closeRef.current?.focus();
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setBoard(false);
    document.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', esc);
      document.body.style.overflow = '';
    };
  }, [board]);

  const cur = (href: string) => (href === '/' ? path === '/' : path.startsWith(href.replace(/\/$/, ''))) ? 'page' : undefined;

  return (
    <>
      <header className="nav" data-scrolled={scrolled ? '' : undefined}>
        <div className="nav-bg" />
        <div className="nav-in" style={{ position: 'relative' }}>
          <Link href="/" className="logo" aria-label="dakdak, home">DAKDAK</Link>
          <Clock />
          <nav className="links caption" aria-label="main">
            <Link href="/order/" aria-current={cur('/order/')}>ORDER</Link>
            <Link href="/parties/" aria-current={cur('/parties/')}>PARTIES</Link>
            <Link href="/jobs/" aria-current={cur('/jobs/')}>JOBS</Link>
            <Link href="/find-us/" aria-current={cur('/find-us/')}>FIND US</Link>
          </nav>
          <button className="toggle" aria-label="open menu" aria-expanded={board} onClick={() => setBoard(true)}>
            <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden><path d="M0 1h20M0 7h20M0 13h20" stroke="#0b0a09" strokeWidth="2" /></svg>
          </button>
          <div className="pills">
            <Link href="/menu/" className="btn rice menu-pill">MENU</Link>
            <button className="btn fill" onClick={() => setOpen(true)}>BOOK</button>
          </div>
        </div>
      </header>

      {board && (
        <div className="navboard" role="dialog" aria-modal="true" aria-label="site menu">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link href="/" className="caption acc" style={{ fontSize: 18 }}>DAKDAK</Link>
            <button ref={closeRef} onClick={() => setBoard(false)} aria-label="close menu" style={{ marginLeft: 'auto', width: 44, height: 44, borderRadius: '50%', border: '1.5px solid var(--rice)' }}>✕</button>
          </div>
          <ol>
            {PAGES.map(([n, href, label]) => (
              <li key={n}>
                {href === '#book' ? (
                  <a href="#book" onClick={(e) => { e.preventDefault(); setBoard(false); setOpen(true); }}>
                    <span className="n">{n}</span><span className="t">{label}</span>
                  </a>
                ) : (
                  <Link href={href} aria-current={cur(href)}>
                    <span className="n">{n}</span><span className="t">{label}</span>
                  </Link>
                )}
              </li>
            ))}
          </ol>
          <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 16 }}>
            <span className={`hangul ${status?.open ? 'acc glow' : 'muted'}`} style={{ fontSize: 32 }}>영업중</span>
            <span className="caption">{status ? (status.open ? `OPEN · TILL ${status.until}` : `CLOSED · BACK ${status.next}`) : ''}</span>
          </div>
          <a className="wide acc" href="https://instagram.com/" style={{ marginTop: 20, fontSize: 20 }}>@DAKDAK.PARIS</a>
        </div>
      )}
    </>
  );
}
