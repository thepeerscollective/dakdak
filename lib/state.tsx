'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Sauce } from './data';

const read = <T,>(k: string, fallback: T): T => {
  try {
    const v = localStorage.getItem(k);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
};
const write = (k: string, v: unknown) => {
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch {}
};

/* ---------- sauce: recolours the whole site ---------- */
type SauceCtx = { sauce: Sauce; setSauce: (s: Sauce) => void };
const SauceContext = createContext<SauceCtx>({ sauce: 'fry-oil', setSauce: () => {} });

/* ---------- cart: the pick-up receipt ---------- */
export type Line = { key: string; num: string; name: string; variant?: 'half' | 'whole'; price: number; qty: number };
type CartCtx = {
  lines: Line[];
  add: (l: Omit<Line, 'qty' | 'key'>) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  total: number;
  count: number;
};
const CartContext = createContext<CartCtx>({ lines: [], add: () => {}, setQty: () => {}, clear: () => {}, total: 0, count: 0 });

/* ---------- booking sheet ---------- */
type BookCtx = { open: boolean; setOpen: (o: boolean) => void };
const BookContext = createContext<BookCtx>({ open: false, setOpen: () => {} });

/* ---------- toast ---------- */
type ToastCtx = { toast: (msg: string) => void };
const ToastContext = createContext<ToastCtx>({ toast: () => {} });

export function Providers({ children }: { children: React.ReactNode }) {
  const [sauce, setSauceState] = useState<Sauce>('fry-oil');
  const [lines, setLines] = useState<Line[]>([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const [ready, setReady] = useState(false);
  useEffect(() => {
    setSauceState(read<Sauce>('dakdak-sauce', 'fry-oil'));
    setLines(read<Line[]>('dakdak-cart', []));
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) document.documentElement.dataset.sauce = sauce;
  }, [sauce, ready]);

  const setSauce = useCallback((s: Sauce) => {
    setSauceState(s);
    write('dakdak-sauce', s);
  }, []);

  const save = (next: Line[]) => {
    setLines(next);
    write('dakdak-cart', next);
  };
  const add: CartCtx['add'] = (l) => {
    const key = `${l.num}${l.variant ? '-' + l.variant : ''}`;
    setLines((prev) => {
      const found = prev.find((p) => p.key === key);
      const next = found ? prev.map((p) => (p.key === key ? { ...p, qty: p.qty + 1 } : p)) : [...prev, { ...l, key, qty: 1 }];
      write('dakdak-cart', next);
      return next;
    });
  };
  const setQty = (key: string, qty: number) => save(qty <= 0 ? lines.filter((l) => l.key !== key) : lines.map((l) => (l.key === key ? { ...l, qty } : l)));
  const clear = () => save([]);
  const total = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const count = lines.reduce((s, l) => s + l.qty, 0);

  const toast = useCallback((m: string) => {
    setMsg(m);
    window.setTimeout(() => setMsg(null), 2600);
  }, []);

  const sauceValue = useMemo(() => ({ sauce, setSauce }), [sauce, setSauce]);

  return (
    <SauceContext.Provider value={sauceValue}>
      <CartContext.Provider value={{ lines, add, setQty, clear, total, count }}>
        <BookContext.Provider value={{ open, setOpen }}>
          <ToastContext.Provider value={{ toast }}>
            {children}
            <div className="toast" role="status" aria-live="polite" data-show={msg ? '' : undefined}>
              {msg}
            </div>
          </ToastContext.Provider>
        </BookContext.Provider>
      </CartContext.Provider>
    </SauceContext.Provider>
  );
}

export const useSauce = () => useContext(SauceContext);
export const useCart = () => useContext(CartContext);
export const useBook = () => useContext(BookContext);
export const useToast = () => useContext(ToastContext);

/** adds data-in when the element scrolls into view, once */
export function useInView<T extends HTMLElement>(threshold = 0.25) {
  const [el, setEl] = useState<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!el || seen) return;
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [el, seen, threshold]);
  return [setEl, seen] as const;
}
