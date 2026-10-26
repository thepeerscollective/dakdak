'use client';
import { useEffect, useState } from 'react';
import { SAUCES, img, BOOTH } from '@/lib/data';
import { useInView, useSauce } from '@/lib/state';

/* now serving board: number ticks up while you look at it */
export function NowServing({ start = 412, label = 'NOW SERVING', foot = 'PICK-UP AT THE COUNTER', tick = true, big = false }: { start?: number; label?: string; foot?: string; tick?: boolean; big?: boolean }) {
  const [n, setN] = useState(start);
  const [flip, setFlip] = useState(false);
  useEffect(() => {
    if (!tick) return;
    const id = setInterval(() => {
      setFlip(true);
      setTimeout(() => { setN((x) => x + 1); setFlip(false); }, 180);
    }, 20000);
    return () => clearInterval(id);
  }, [tick]);
  return (
    <div className={`board now ${big ? 'big' : ''}`}>
      <span className="caption">{label}</span>
      <span className={`dot acc glow num ${flip ? 'flip' : ''}`} aria-live="polite">{String(n).padStart(4, '0')}</span>
      <span className="caption muted">{foot}</span>
    </div>
  );
}

export function Ticker({ words }: { words: string[] }) {
  const [paused, setPaused] = useState(false);
  const line = words.join(' · ') + ' · ';
  return (
    <section className="ticker" data-paused={paused ? '' : undefined} aria-label="sign">
      <span className="sr">{words.join(', ')}</span>
      <div className="ticker-track" aria-hidden>
        <span>{line}</span><span>{line}</span>
      </div>
      <button className="ticker-pause caption" onClick={() => setPaused(!paused)} aria-label={paused ? 'play the sign' : 'pause the sign'}>
        {paused ? '▶' : '❚❚'}
      </button>
    </section>
  );
}

export function SaucePicker({ small = false }: { small?: boolean }) {
  const { sauce, setSauce } = useSauce();
  const pick = (id: (typeof SAUCES)[number]['id']) => setSauce(sauce === id ? 'fry-oil' : id);
  return (
    <div className={`cups ${small ? 'small' : ''}`} role="radiogroup" aria-label="pick a sauce, the site turns its colour">
      {SAUCES.map((s) => (
        <button
          key={s.id}
          role="radio"
          aria-checked={sauce === s.id}
          className={`cup cup-${s.id}`}
          onClick={() => pick(s.id)}
          onKeyDown={(e) => {
            const i = SAUCES.findIndex((x) => x.id === s.id);
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); const nx = SAUCES[(i + 1) % 3]; setSauce(nx.id); (e.currentTarget.parentElement?.children[(i + 1) % 3] as HTMLElement)?.focus(); }
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); const nx = SAUCES[(i + 2) % 3]; setSauce(nx.id); (e.currentTarget.parentElement?.children[(i + 2) % 3] as HTMLElement)?.focus(); }
          }}
        >
          <span className="selected caption" aria-hidden>SELECTED</span>
          <span className="rim" aria-hidden />
          <span className="name cond">{s.lines.map((l) => <span key={l}>{l}</span>)}</span>
          <span className="note caption">{s.note}</span>
        </button>
      ))}
    </div>
  );
}

export function Booth({ date }: { date?: string }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.15);
  const [flash, setFlash] = useState<number | null>(null);
  const [d, setD] = useState(date ?? '');
  useEffect(() => {
    if (!date) setD(new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' }).replace('/', '.'));
  }, [date]);
  return (
    <div className={`booth ${seen ? 'in' : ''}`} ref={ref}>
      {BOOTH.map((strip, i) => (
        <figure key={i} className="strip paper" style={{ ['--i' as string]: i }} onMouseEnter={() => { setFlash(i); setTimeout(() => setFlash(null), 120); }}>
          {strip.map(([f, alt]) => (
            <div key={f} className="frame slot">
              <img src={img(f + '.webp')} alt={alt} loading="lazy" width={900} height={720} />
              {flash === i && <span className="flash" aria-hidden />}
            </div>
          ))}
          <figcaption className="caption">DAKDAK · {d}</figcaption>
        </figure>
      ))}
    </div>
  );
}

/* staff wanted poster with tear-off tabs. torn = filled spots */
export function Poster({ role, hours, desc, tabs = 6, torn = [2], onTear, home = false }: { role: string; hours?: string; desc: string; tabs?: number; torn?: number[]; onTear?: (role: string) => void; home?: boolean }) {
  const [gone, setGone] = useState<number[]>(torn);
  const open = tabs - gone.length;
  const tear = (i: number) => {
    setGone((g) => [...g, i]);
    if (onTear) onTear(role);
    else window.location.href = `mailto:jobs@dakdak.fr?subject=${encodeURIComponent('staff wanted · ' + role.toLowerCase())}`;
  };
  return (
    <article className="poster paper">
      <span className="tape" aria-hidden />
      <p className="caption" style={{ margin: 0 }}>STAFF WANTED · <span className="hangul">직원 구함</span></p>
      <h3 className={home ? 'tile' : 'statement'} style={{ margin: '14px 0 0' }}>{role}</h3>
      {hours && <p className="caption" style={{ margin: '18px 0 0' }}>{hours}</p>}
      <p className="desc" style={{ color: 'var(--ink)', marginTop: 12 }}>{desc}</p>
      {!home && <p className="dot" style={{ fontSize: 26, margin: '14px 0 0' }}>{open} OPEN</p>}
      <div className="tabs">
        {Array.from({ length: tabs }).map((_, i) =>
          gone.includes(i) ? (
            <span key={i} className="tab torn" aria-hidden />
          ) : (
            <button key={i} className="tab" onClick={() => tear(i)} aria-label={`apply for ${role.toLowerCase()}`}>
              <span>{home ? 'JOBS@DAKDAK.FR' : `APPLY · ${role}`}</span>
            </button>
          )
        )}
      </div>
    </article>
  );
}
