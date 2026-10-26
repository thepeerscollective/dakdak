'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { HOURS } from '@/lib/data';
import { useBook } from '@/lib/state';

const DAYNAMES = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

function nextOpenDays(n = 5) {
  const out: { key: string; label: string; long: string; date: string; full: boolean }[] = [];
  const d = new Date();
  for (let i = 0; out.length < n && i < 14; i++) {
    const x = new Date(d.getFullYear(), d.getMonth(), d.getDate() + i);
    if (!HOURS[x.getDay()].open) continue;
    out.push({
      key: x.toISOString().slice(0, 10),
      label: `${HOURS[x.getDay()].day} ${x.getDate()}`,
      long: DAYNAMES[x.getDay()],
      date: x.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }).toUpperCase(),
      full: out.length === 2, // the third night is always the busy one, for the demo
    });
  }
  return out;
}

export default function BookSheet() {
  const { open, setOpen } = useBook();
  const days = useMemo(nextOpenDays, []);
  const [people, setPeople] = useState('2');
  const [day, setDay] = useState(days[1]?.key ?? '');
  const [round, setRound] = useState<'19:00' | '21:30'>('21:30');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [wait, setWait] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState<null | { table: string }>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const opener = useRef<Element | null>(null);

  useEffect(() => {
    if (!open) return;
    opener.current = document.activeElement;
    document.body.style.overflow = 'hidden';
    setTimeout(() => sheet.current?.querySelector<HTMLElement>('h2')?.focus(), 30);
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'Tab' && sheet.current) {
        const f = sheet.current.querySelectorAll<HTMLElement>('button, input, textarea, [href], [tabindex]:not([tabindex="-1"])');
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', key);
    return () => {
      document.removeEventListener('keydown', key);
      document.body.style.overflow = '';
      (opener.current as HTMLElement | null)?.focus?.();
    };
  }, [open, setOpen]);

  useEffect(() => {
    if (!open) setTimeout(() => setDone(null), 300);
  }, [open]);

  const chosen = days.find((d) => d.key === day);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!name.trim()) er.name = 'we need a name for the table';
    if (phone.replace(/\D/g, '').length < 8) er.phone = 'a phone number, so we can text you';
    if (chosen?.full && !wait) er.day = 'that night is full. tick the waitlist or pick another day';
    setErrors(er);
    if (Object.keys(er).length) return;
    setDone({ table: String(3 + Math.floor(Math.random() * 9)).padStart(2, '0') });
  };

  if (!open) return null;
  return (
    <div className="sheet-wrap" onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}>
      <div className="sheet" role="dialog" aria-modal="true" aria-labelledby="book-title" ref={sheet}>
        <button className="sheet-x" onClick={() => setOpen(false)} aria-label="close booking">✕</button>
        {!done ? (
          <form onSubmit={submit} noValidate>
            <h2 id="book-title" tabIndex={-1} className="cond acc" style={{ fontSize: 60, lineHeight: 0.9, margin: 0 }}>BOOK A TABLE</h2>
            <p className="desc" style={{ marginTop: 14 }}>two rounds a night, 19:00 and 21:30. you keep the table two hours. the bar after 23:00 is walk-in.</p>

            <fieldset style={{ marginTop: 26 }}>
              <legend className="label">people</legend>
              <div className="chips" role="radiogroup" aria-label="people">
                {['1', '2', '3', '4', '5', '6', '7', '8+'].map((p) => (
                  <button type="button" key={p} role="radio" aria-checked={people === p} className="chip round" onClick={() => setPeople(p)}>{p}</button>
                ))}
              </div>
            </fieldset>

            <fieldset style={{ marginTop: 22 }}>
              <legend className="label">day</legend>
              <div className="chips" role="radiogroup" aria-label="day">
                {days.map((d) => (
                  <button type="button" key={d.key} role="radio" aria-checked={day === d.key} className="chip day" onClick={() => setDay(d.key)}>
                    {d.label}{d.full && <><br /><span style={{ fontSize: 10 }}>FULL</span></>}
                  </button>
                ))}
              </div>
              <p className="desc muted" style={{ fontSize: 14 }}>closed mon + tue.{days.find((d) => d.full) ? ` ${days.find((d) => d.full)!.date.toLowerCase()} is full, join the waitlist.` : ''}</p>
              {errors.day && <p className="err" style={{ color: '#ff8b80', fontSize: 14, margin: 0 }}>{errors.day}</p>}
            </fieldset>

            <fieldset style={{ marginTop: 18 }}>
              <legend className="label">round</legend>
              <div className="rounds" role="radiogroup" aria-label="round">
                {(['19:00', '21:30'] as const).map((r, i) => (
                  <button type="button" key={r} role="radio" aria-checked={round === r} className="round-card" onClick={() => setRound(r)}>
                    <span className="caption">{i ? 'ROUND TWO' : 'ROUND ONE'}</span>
                    <span className="dot" style={{ fontSize: 34 }}>{r}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            <div style={{ display: 'grid', gap: 16, marginTop: 24 }}>
              <label className="field"><span className="label">name</span><input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" aria-invalid={!!errors.name} />{errors.name && <span className="err">{errors.name}</span>}</label>
              <div className="grid2">
                <label className="field"><span className="label">phone</span><input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" autoComplete="tel" aria-invalid={!!errors.phone} />{errors.phone && <span className="err">{errors.phone}</span>}</label>
                <label className="field"><span className="label">email (optional)</span><input value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" /></label>
              </div>
              <label className="field"><span className="label">anything we should know</span><input value={note} onChange={(e) => setNote(e.target.value)} placeholder="birthday, allergies, banban fans" /></label>
              {chosen?.full && (
                <label className="check"><input type="checkbox" checked={wait} onChange={(e) => setWait(e.target.checked)} /> text me if a {chosen.long} table frees up</label>
              )}
            </div>

            <button className="btn fill block" style={{ marginTop: 24 }}>
              CONFIRM · {chosen?.label} · {round} · {people}
            </button>
            <p className="desc muted" style={{ fontSize: 13, marginTop: 14 }}>no deposit for up to 6. can’t make it? cancel by text so someone else gets the wings. this is a demo, nothing is booked.</p>
          </form>
        ) : (
          <div>
            <h2 id="book-title" tabIndex={-1} className="cond" style={{ fontSize: 88, lineHeight: 0.9, margin: '40px 0 0' }}>
              <span className="acc">SEE YOU</span><br />
              <span className="acc glow">{chosen?.full ? 'MAYBE ' : ''}{chosen?.long.toUpperCase()}</span>
            </h2>
            <div className="ticket-card paper" style={{ marginTop: 40 }}>
              <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
                <div>
                  <div className="caption">TABLE</div>
                  <div className="dot" style={{ fontSize: 110, lineHeight: 1 }}>{chosen?.full ? '--' : done.table}</div>
                </div>
                <div className="caption" style={{ lineHeight: 1.9 }}>
                  {chosen?.date} · {round}<br />{people} {people === '1' ? 'PERSON' : 'PEOPLE'} · {round === '19:00' ? 'ROUND ONE' : 'ROUND TWO'}<br />NAME: {name.toUpperCase()}
                </div>
              </div>
              <div style={{ borderTop: '1px dashed var(--ink)', marginTop: 18, paddingTop: 12, fontSize: 14 }}>
                {chosen?.full ? 'you’re on the waitlist. we text the moment a table frees up.' : `you keep the table till ${round === '19:00' ? '21:00' : '23:30'}.`}
              </div>
            </div>
            <a className="btn fill block" style={{ marginTop: 22 }} href={`data:text/calendar;charset=utf8,${encodeURIComponent(`BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:DAKDAK · table for ${people}\nLOCATION:8 rue du coq, 75010 paris\nDTSTART:${(chosen?.key ?? '').replace(/-/g, '')}T${round.replace(':', '')}00\nEND:VEVENT\nEND:VCALENDAR`)}`} download="dakdak.ics">ADD TO CALENDAR</a>
            <button className="btn block" style={{ marginTop: 12 }} onClick={() => setDone(null)}>CHANGE OR CANCEL</button>
            <p className="desc muted" style={{ fontSize: 13, marginTop: 14 }}>we’d also text this. reply C to cancel.</p>
          </div>
        )}
      </div>
    </div>
  );
}
