'use client';
import { useRef, useState } from 'react';
import { Poster } from '@/components/bits';
import { img } from '@/lib/data';

const ROLES = [
  { role: 'FRY COOK', hours: 'THU–SAT · 17:00–01:30', desc: 'you run the fryer and the glaze station. double fry, timing, sauces by heart. we train you, nobody starts alone.', torn: [3, 5, 1] },
  { role: 'FLOOR', hours: 'WED–SUN · 18:00–00:00', desc: 'tables, rounds, the board. you know the menu numbers and you can say no to a sixth soju nicely.', torn: [0, 2, 4, 5] },
  { role: 'BAR', hours: 'THU–SAT · 19:00–02:30', desc: 'soju, somaek towers, makgeolli, the playlist. ID checks at pick-up too.', torn: [1, 2, 3, 5, 0] },
];
const PERKS = ['staff meal every shift. yes, the wings.', 'tips split evenly, kitchen included.', 'two full weekends off a month.', 'taxi home after 1am, on us.', 'sauce training. nobody starts on the fryer alone.', 'a real contract, paid on the 1st.'];

export default function Jobs() {
  const [role, setRole] = useState('FRY COOK');
  const [nights, setNights] = useState<string[]>(['THU', 'FRI', 'SAT']);
  const [sauce, setSauce] = useState('');
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<Record<string, string>>({});
  const [file, setFile] = useState('');
  const form = useRef<HTMLDivElement>(null);
  const open = 6 * 3 - ROLES.reduce((s, r) => s + r.torn.length, 0);

  const tear = (r: string) => {
    setRole(r);
    setTimeout(() => form.current?.scrollIntoView({ behavior: 'smooth' }), 350);
  };
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const er: Record<string, string> = {};
    if (!String(f.get('name')).trim()) er.name = 'your name, please';
    if (!/.+@.+\..+/.test(String(f.get('email')))) er.email = 'an email we can answer to';
    if (!nights.length) er.nights = 'pick at least one night';
    setErr(er);
    if (!Object.keys(er).length) setSent(true);
  };
  const toggle = (n: string) => setNights((x) => (x.includes(n) ? x.filter((y) => y !== n) : [...x, n]));

  return (
    <div className="jobs">
      <div className="wrap jobs-head">
        <h1 className="statement acc">FRY<br />CREW</h1>
        <div>
          <p className="hangul acc glow" style={{ fontSize: 40, margin: 0 }}>직원 구함</p>
          <p className="body" style={{ marginTop: 14 }}>three roles, nights thursday to saturday plus wednesday and sunday evenings. tear a tab to apply.</p>
        </div>
        <p className="dot acc spots">{open} SPOTS OPEN</p>
      </div>

      <div className="wall" style={{ backgroundImage: `linear-gradient(rgba(11,10,9,.55), rgba(11,10,9,.55)), url(${img('jobs-wall.webp')})` }}>
        <div className="wrap posters">
          {ROLES.map((r) => (
            <Poster key={r.role} role={r.role} hours={r.hours} desc={r.desc} torn={r.torn} onTear={tear} />
          ))}
        </div>
      </div>

      <div className="wrap">
        <section className="board perks">
          <h2 className="wide acc">WHAT YOU GET</h2>
          <ol>{PERKS.map((p, i) => <li key={p}><span className="dot acc">{String(i + 1).padStart(2, '0')}</span><span className="body">{p}</span></li>)}</ol>
        </section>

        <section className="how">
          <p className="caption muted">HOW IT GOES</p>
          <ol>
            {[['APPLY HERE', 'five minutes, no cover letter.'], ['TRIAL SHIFT', 'three hours, paid, you eat after.'], ['WE TEXT YOU', 'within a week either way.']].map(([t, d], i) => (
              <li key={t}><span className="dot acc circle">{i + 1}</span><div><p className="caption acc" style={{ margin: 0, fontSize: 15 }}>{t}</p><p className="desc">{d}</p></div></li>
            ))}
          </ol>
        </section>

        <section className="enquire" ref={form} id="apply">
          <div>
            <h2 className="tile acc">APPLY</h2>
            <p className="body" style={{ marginTop: 18 }}>takes five minutes. we read every one, a person, not a filter.</p>
          </div>
          {sent ? (
            <div className="board" style={{ padding: 32 }} role="status">
              <p className="wide acc" style={{ fontSize: 28 }}>THANKS.</p>
              <p className="body" style={{ marginTop: 12 }}>we text everyone within a week, {role.toLowerCase()} trials happen on wednesdays. (demo: nothing was sent.)</p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate style={{ display: 'grid', gap: 18 }}>
              <div className="grid2">
                <label className="field"><span className="label">name</span><input name="name" autoComplete="name" aria-invalid={!!err.name} />{err.name && <span className="err">{err.name}</span>}</label>
                <label className="field"><span className="label">email</span><input name="email" type="email" autoComplete="email" aria-invalid={!!err.email} />{err.email && <span className="err">{err.email}</span>}</label>
                <label className="field"><span className="label">phone</span><input name="phone" type="tel" autoComplete="tel" /></label>
                <label className="field"><span className="label">start date</span><input name="start" placeholder="asap" /></label>
              </div>
              <fieldset>
                <legend className="label">role</legend>
                <div className="chips" role="radiogroup" aria-label="role">
                  {['FRY COOK', 'FLOOR', 'BAR', 'NOT SURE YET'].map((r) => <button type="button" key={r} role="radio" aria-checked={role === r} className="chip" onClick={() => setRole(r)}>{r}</button>)}
                </div>
              </fieldset>
              <fieldset>
                <legend className="label">nights you can do</legend>
                <div className="chips">
                  {['WED', 'THU', 'FRI', 'SAT', 'SUN'].map((n) => <button type="button" key={n} aria-pressed={nights.includes(n)} className="chip" onClick={() => toggle(n)}>{n}</button>)}
                </div>
                {err.nights && <span className="err" style={{ color: '#ff8b80', fontSize: 14 }}>{err.nights}</span>}
              </fieldset>
              <label className="field"><span className="label">experience, in a few lines</span><textarea name="exp" /></label>
              <label className="field drop">
                <span className="label">cv (optional)</span>
                <span className="dropzone desc">{file || 'drop a pdf or click to choose · max 5 mb'}</span>
                <input type="file" accept=".pdf,.doc,.docx" className="sr" onChange={(e) => setFile(e.target.files?.[0]?.name ?? '')} />
              </label>
              <fieldset>
                <legend className="label">your go-to sauce (no wrong answer)</legend>
                <div className="chips" role="radiogroup" aria-label="go-to sauce">
                  {['SOY GARLIC', 'YANGNYEOM', 'SNOW CHEESE', 'PLAIN CRUNCH'].map((s) => <button type="button" key={s} role="radio" aria-checked={sauce === s} className="chip" onClick={() => setSauce(s)}>{s}</button>)}
                </div>
              </fieldset>
              <label className="check"><input type="checkbox" defaultChecked /> keep my application for 6 months in case a spot opens. then it’s deleted.</label>
              <div><button className="btn fill">SEND APPLICATION</button></div>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
