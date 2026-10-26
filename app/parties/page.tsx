'use client';
import { useState } from 'react';
import { img } from '@/lib/data';

const PACKS = [
  { n: '01', name: 'ROUND ONE', pax: 'UP TO 12 · THE BACK TABLE', price: '35€ PP', inc: ['banban for the table', 'two small plates each', 'a soju tower per four', '2 hours, any night'], admit: 'ADMIT 12' },
  { n: '02', name: 'THE WHOLE COQ', pax: 'UP TO 30 · HALF THE ROOM', price: '45€ PP', inc: ['whole birds, all three sauces', 'small plates going round', 'soju + makgeolli included', 'your playlist on the speaker'], admit: 'ADMIT 30' },
  { n: '03', name: 'TAKEOVER', pax: 'UP TO 70 · THE WHOLE PLACE', price: 'FROM 3 500€', inc: ['everything on the board', 'open bar, you set the cap', 'the photo booth, unlimited strips', 'till 2am, your name on the sign'], admit: 'ADMIT 70' },
];

export default function Parties() {
  const [people, setPeople] = useState(24);
  const [pack, setPack] = useState('THE WHOLE COQ');
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<Record<string, string>>({});
  const boxes = Math.ceil(people / 2);
  const banban = Math.round(boxes * 0.25), cheese = Math.round(boxes * 0.25), soy = boxes - banban - cheese;
  const est = Math.round((boxes * 27 + people * 4) / 10) * 10;

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const er: Record<string, string> = {};
    if (!String(f.get('name')).trim()) er.name = 'your name, please';
    if (!/.+@.+\..+/.test(String(f.get('email')))) er.email = 'an email we can answer to';
    setErr(er);
    if (!Object.keys(er).length) setSent(true);
  };
  const choose = (p: string) => {
    setPack(p);
    document.getElementById('enquire')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="wrap parties">
      <section className="p-hero">
        <div>
          <h1 className="statement acc">TAKE<br />OVER</h1>
          <p className="hangul acc glow" style={{ fontSize: 40, margin: '26px 0 0' }}>대관</p>
          <p className="body" style={{ marginTop: 18 }}>birthdays, launches, wrap parties, the office pretending it’s team building. the back table, half the room or the whole place till 2am.</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
            <a className="btn fill" href="#enquire">ENQUIRE</a>
            <a className="btn" href="#packages">SEE PACKAGES</a>
          </div>
        </div>
        <div className="slot p-photo"><img src={img('parties-hero.webp')} alt="a packed room seen from behind the bar, phones up" width={1448} height={1086} /></div>
      </section>

      <p id="packages" className="caption muted" style={{ marginTop: 110 }}>THREE WAYS TO DO IT</p>
      <div className="packs">
        {PACKS.map((p) => (
          <article key={p.n} className="pack paper">
            <span className="dot" style={{ fontSize: 32 }}>{p.n}</span>
            <h2 className="tile" style={{ marginTop: 12 }}>{p.name}</h2>
            <p className="caption" style={{ marginTop: 18 }}>{p.pax}</p>
            <p className="wide" style={{ fontSize: 20, marginTop: 10 }}>{p.price}</p>
            <ul className="desc" style={{ color: 'var(--ink)', paddingLeft: 18, margin: '14px 0 0' }}>{p.inc.map((i) => <li key={i}>{i}</li>)}</ul>
            <div className="stub">
              <span className="caption">{p.admit}</span>
              <button className="btn ink sm" onClick={() => choose(p.name)}>ENQUIRE</button>
            </div>
          </article>
        ))}
      </div>

      <section className="office">
        <div>
          <h2 className="tile acc">CHICKEN FOR<br />THE OFFICE</h2>
          <p className="body" style={{ marginTop: 18 }}>boxes delivered within 3 km, or picked up. we bring napkins, wet wipes and too many pickles.</p>
        </div>
        <div className="board calc">
          <span className="caption">HOW MANY PEOPLE</span>
          <div className="calc-row">
            <button className="arrow" onClick={() => setPeople(Math.max(4, people - 2))} aria-label="fewer people">–</button>
            <output className="dot acc glow" style={{ fontSize: 80, minWidth: 130, textAlign: 'center' }} aria-live="polite">{people}</output>
            <button className="arrow" onClick={() => setPeople(Math.min(200, people + 2))} aria-label="more people">+</button>
            <span className="wide rice" style={{ fontSize: 'clamp(20px,2.5vw,34px)' }}>= {boxes} BOXES</span>
          </div>
          <p className="desc">{banban} banban · {soy} soy garlic · {cheese} snow cheese<br />+ kimchi fries and pickled radish for everyone</p>
          <div className="calc-foot">
            <span className="wide acc" style={{ fontSize: 22 }}>ABOUT {est}€</span>
            <button className="btn fill sm" onClick={() => choose('CATERING')}>GET A QUOTE</button>
          </div>
        </div>
      </section>

      <section id="enquire" className="enquire">
        <div>
          <h2 className="tile acc">ENQUIRE</h2>
          <p className="body" style={{ marginTop: 18 }}>tell us roughly what you want. we answer within a day, usually by text.</p>
        </div>
        {sent ? (
          <div className="board" style={{ padding: 32 }} role="status">
            <p className="wide acc" style={{ fontSize: 28 }}>GOT IT.</p>
            <p className="body" style={{ marginTop: 12 }}>we’ll be in touch within a day about {pack.toLowerCase()}. (demo: nothing was sent.)</p>
          </div>
        ) : (
          <form onSubmit={submit} noValidate style={{ display: 'grid', gap: 18 }}>
            <div className="grid2">
              <label className="field"><span className="label">name</span><input name="name" autoComplete="name" aria-invalid={!!err.name} />{err.name && <span className="err">{err.name}</span>}</label>
              <label className="field"><span className="label">email</span><input name="email" type="email" autoComplete="email" aria-invalid={!!err.email} />{err.email && <span className="err">{err.email}</span>}</label>
              <label className="field"><span className="label">phone</span><input name="phone" type="tel" autoComplete="tel" /></label>
              <label className="field"><span className="label">date</span><input name="date" type="date" /></label>
            </div>
            <fieldset>
              <legend className="label">package</legend>
              <div className="chips" role="radiogroup" aria-label="package">
                {['ROUND ONE', 'THE WHOLE COQ', 'TAKEOVER', 'CATERING', 'NOT SURE'].map((p) => (
                  <button type="button" key={p} role="radio" aria-checked={pack === p} className="chip" onClick={() => setPack(p)}>{p}</button>
                ))}
              </div>
            </fieldset>
            <div className="grid2">
              <label className="field"><span className="label">people</span><input name="people" inputMode="numeric" /></label>
              <label className="field"><span className="label">budget (optional)</span><input name="budget" /></label>
            </div>
            <label className="field"><span className="label">anything else</span><textarea name="msg" placeholder="30th birthday, she loves snow cheese, surprise if possible" /></label>
            <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
              <button className="btn fill">SEND ENQUIRY</button>
              <span className="desc">30% deposit holds the date once we confirm.</span>
            </div>
          </form>
        )}
      </section>

      <section className="faq-mini">
        <p className="caption muted">QUICK ANSWERS</p>
        {[['MUSIC?', 'bring a playlist. decent speaker, terrible karaoke mic, both yours.'], ['DIETARY?', 'tell us in the form. tofu swaps, no-peanut glaze, we sort it.'], ['DECORATIONS?', 'yes, no confetti. it ends up in the fryer.']].map(([q, a]) => (
          <div key={q} className="qa"><span className="caption acc" style={{ fontSize: 15 }}>{q}</span><p className="body">{a}</p></div>
        ))}
      </section>
    </div>
  );
}
