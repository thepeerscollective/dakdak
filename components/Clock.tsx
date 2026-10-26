'use client';
import { useEffect, useState } from 'react';

/** real seoul time. after 18:00 there it's chimaek o'clock */
export default function Clock({ className = 'caption clock' }: { className?: string }) {
  const [t, setT] = useState<{ hm: string; h: number } | null>(null);
  useEffect(() => {
    const tick = () => {
      const p = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Seoul', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
      const h = Number(p.find((x) => x.type === 'hour')?.value);
      const m = p.find((x) => x.type === 'minute')?.value;
      setT({ hm: `${String(h).padStart(2, '0')}:${m}`, h });
    };
    tick();
    const id = setInterval(tick, 20000);
    return () => clearInterval(id);
  }, []);
  if (!t) return <span className={className}>SEOUL --:--</span>;
  const late = t.h >= 18 || t.h < 4;
  return (
    <span className={className}>
      SEOUL {t.hm} · {late ? "CHIMAEK O'CLOCK" : 'TOO EARLY FOR CHIMAEK'}
    </span>
  );
}
