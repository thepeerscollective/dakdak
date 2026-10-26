'use client';
import { useEffect, useState } from 'react';
import { useBook, useInView } from '@/lib/state';

export function BookButton({ className, children }: { className?: string; children: React.ReactNode }) {
  const { setOpen } = useBook();
  return <button className={className} onClick={() => setOpen(true)}>{children}</button>;
}

/* the receipt slides up out of the printer when it scrolls in, order number ticks */
export function Printer() {
  const [ref, seen] = useInView<HTMLDivElement>(0.3);
  const [n, setN] = useState(413);
  useEffect(() => {
    if (!seen) return;
    const id = setInterval(() => setN((x) => x + 1), 7000);
    return () => clearInterval(id);
  }, [seen]);
  return (
    <div className="printer" ref={ref}>
      <div className={`receipt paper ${seen ? 'in' : ''}`}>
        <p className="caption" style={{ margin: 0 }}>ORDER #{String(n).padStart(4, '0')}</p>
        <p style={{ margin: '18px 0', fontSize: 14, lineHeight: 1.7 }}>
          6× soy garlic wings<br />½ yangnyeom chicken<br />1× pickled radish<br />2× soju, peach
        </p>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7 }}>ready 23:40<br />watch the board</p>
        <div className="zig" aria-hidden />
      </div>
    </div>
  );
}
