'use client';
import { useEffect, useState } from 'react';
import { HOURS, fmt, img, openStatus, ADDRESS, EMAIL, PHONE } from '@/lib/data';
import { useToast } from '@/lib/state';

const FAQ = [
  ['DO YOU TAKE WALK-INS?', 'yes, at the bar all night and at tables if one’s free. after 23:00 it’s walk-in only.'],
  ['CARD OR CASH?', 'both. no cheques, it’s 2026.'],
  ['VEGETARIAN?', 'tofu swaps on most plates, the corn cheese and the fries. the fryer is shared.'],
  ['KIDS?', 'until 21:00, and they get the plain crunch.'],
  ['DOGS?', 'on the terrace, with water.'],
  ['ACCESSIBLE?', 'step-free entrance and an accessible toilet. the photo booth isn’t wheelchair-friendly yet, we’re fixing that.'],
];
const ORDER = [1, 2, 3, 4, 5, 6, 0];

export default function FindUs() {
  const { toast } = useToast();
  const [st, setSt] = useState<ReturnType<typeof openStatus> | null>(null);
  const [open, setOpen] = useState(0);
  useEffect(() => {
    setSt(openStatus());
    const id = setInterval(() => setSt(openStatus()), 60000);
    return () => clearInterval(id);
  }, []);
  const copy = async () => {
    try { await navigator.clipboard.writeText(ADDRESS); toast('copied, see you there'); } catch { toast(ADDRESS); }
  };
  return (
    <div className="wrap find">
      <section className="find-hero">
        <div>
          <div className="open-sign board" aria-hidden>
            <span className={`hangul ${st?.open ? 'acc glow' : 'muted'}`}>영업중</span>
          </div>
          <p className="caption acc" style={{ marginTop: 24, fontSize: 15 }}>{st ? (st.open ? 'OPEN NOW' : 'CLOSED NOW') : ' '}</p>
          <p className="caption muted" style={{ marginTop: 8 }}>{st ? (st.open ? `KITCHEN TILL ${st.until === '02:00' ? '01:30' : st.until} · BAR TILL ${st.until}` : `BACK ${(st.next ?? "").toUpperCase()}`) : ' '}</p>
          <div className="slot shop"><img src={img('extra-shopfront.webp')} alt="the shopfront at night, people eating at the window ledge" width={1122} height={1402} loading="lazy" /></div>
        </div>
        <div>
          <h1 className="statement acc">8 RUE<br />DU COQ</h1>
          <p className="wide acc" style={{ marginTop: 24 }}>PARIS 10</p>
          <p className="body" style={{ marginTop: 18 }}>M° château-landon (line 7), 2 min · gare de l’est, 6 min on foot · vélib on the corner.</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 26, flexWrap: 'wrap' }}>
            <a className="btn fill" href="https://www.openstreetmap.org/?mlat=48.8790&mlon=2.3610#map=17/48.8790/2.3610" target="_blank" rel="noreferrer">DIRECTIONS ↗</a>
            <button className="btn" onClick={copy}>COPY ADDRESS</button>
          </div>
          <div className="map">
            <iframe title="map of the area around rue du coq, paris 10" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=2.3555%2C48.8762%2C2.3665%2C48.8818&layer=mapnik" />
            <span className="pin" aria-hidden />
          </div>
        </div>
      </section>

      <section className="hours-row">
        <div className="board hours">
          <h2 className="wide acc" style={{ fontSize: 30 }}>HOURS</h2>
          <ul>
            {ORDER.map((d) => {
              const h = HOURS[d];
              const today = st?.today === d;
              return (
                <li key={h.day} data-today={today ? '' : undefined} data-closed={!h.open ? '' : undefined}>
                  <span className="dot">{h.day}</span>
                  {today && <span className="caption tt">TODAY</span>}
                  <span className="dot">{h.open ? `${fmt(h.open)}–${fmt(h.close!)}` : 'CLOSED'}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="reach">
          <p className="caption muted">REACH US</p>
          <p className="wide acc">{PHONE}</p>
          <a className="wide acc" href={`mailto:${EMAIL}`}>{EMAIL.toUpperCase()}</a>
          <a className="wide acc" href="https://instagram.com/" target="_blank" rel="noreferrer">@DAKDAK.PARIS</a>
          <p className="body" style={{ marginTop: 22 }}>fastest is an instagram dm. the phone gets answered after 16:00, before that we’re prepping and can’t hear it over the fryer.</p>
          <p className="body" style={{ marginTop: 14 }}>walk-ins: the bar after 23:00 is first come. tables before that, book.</p>
        </div>
      </section>

      <section className="faq">
        <p className="caption muted">BEFORE YOU COME</p>
        {FAQ.map(([q, a], i) => (
          <div key={q} className="faq-item">
            <h3 style={{ margin: 0 }}>
              <button aria-expanded={open === i} aria-controls={`faq-${i}`} onClick={() => setOpen(open === i ? -1 : i)}>
                <span className="caption">{q}</span><span aria-hidden className="pm">{open === i ? '–' : '+'}</span>
              </button>
            </h3>
            <div id={`faq-${i}`} hidden={open !== i}><p className="body">{a}</p></div>
          </div>
        ))}
      </section>
    </div>
  );
}
