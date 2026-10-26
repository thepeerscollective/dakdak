'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MENU, BANBAN, euro, type Dish } from '@/lib/data';
import { useCart } from '@/lib/state';

const PICK: { name: string; hangul: string; dishes: Dish[] }[] = [
  { name: 'chicken', hangul: '치킨', dishes: [...MENU[0].dishes, BANBAN] },
  { name: 'small plates', hangul: '안주', dishes: MENU[1].dishes },
  { name: 'rice & noodles', hangul: '밥 & 면', dishes: MENU[2].dishes },
  { name: 'drinks', hangul: '술', dishes: MENU[3].dishes },
];
const STEPS = ['received', 'frying', 'glazing', 'ready'];

function slots() {
  const d = new Date();
  const m = Math.ceil((d.getHours() * 60 + d.getMinutes() + 20) / 15) * 15;
  return [1, 2, 3].map((k) => {
    const t = (m + (k - 1) * 15) % 1440;
    return `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`;
  });
}

export default function OrderPage() {
  const { lines, add, setQty, total, count, clear } = useCart();
  const [variant, setVariant] = useState<Record<string, 'half' | 'whole'>>({});
  const [time, setTime] = useState('ASAP');
  const [times, setTimes] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [err, setErr] = useState<Record<string, string>>({});
  const [paid, setPaid] = useState<null | { num: number; total: number; ready: string }>(null);
  const [step, setStep] = useState(0);
  const [hasDrink, setHasDrink] = useState(false);

  useEffect(() => setTimes(slots()), []);
  useEffect(() => setHasDrink(lines.some((l) => ['13', '14', '15'].includes(l.num))), [lines]);
  useEffect(() => {
    if (!paid) return;
    window.scrollTo({ top: 0 });
    const id = setInterval(() => setStep((s) => Math.min(s + 1, 3)), 5000);
    return () => clearInterval(id);
  }, [paid]);

  const pay = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!count) er.cart = 'your order is empty. add something from the board.';
    if (!name.trim()) er.name = 'a name for the bag';
    if (phone.replace(/\D/g, '').length < 8) er.phone = 'we text you when it’s ready';
    setErr(er);
    if (Object.keys(er).length) return;
    const d = new Date(Date.now() + 15 * 60000);
    setPaid({ num: 414 + Math.floor(Math.random() * 30), total, ready: time === 'ASAP' ? `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}` : time });
    clear();
  };

  if (paid) {
    return (
      <div className="wrap paid">
        <p className="wide rice" style={{ textAlign: 'center', fontSize: 'clamp(22px,2.5vw,36px)' }}>PAID. NOW WE FRY.</p>
        <div className="board now big paid-board">
          <span className="caption">YOUR NUMBER</span>
          <span className="dot acc glow num">{String(paid.num).padStart(4, '0')}</span>
          <span className="caption muted">READY AROUND {paid.ready} · WE’LL TEXT {phone.replace(/\d(?=\d{2})/g, '•')}</span>
        </div>
        <ol className="steps" aria-live="polite">
          {STEPS.map((s, i) => (
            <li key={s} data-done={i <= step ? '' : undefined}><span className="pip" /><span className="caption">{s}</span></li>
          ))}
        </ol>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginTop: 40 }}>
          <Link className="btn" href="/find-us/">GET DIRECTIONS</Link>
          <Link className="btn" href="/menu/">BACK TO MENU</Link>
        </div>
        <p className="body" style={{ textAlign: 'center', margin: '34px auto 0' }}>while you wait: the photo booth is by the toilets. first strip is on us.</p>
        <p className="desc muted" style={{ textAlign: 'center', marginTop: 10 }}>demo: nothing was charged, no chicken is coming. sorry.</p>
      </div>
    );
  }

  return (
    <div className="wrap order">
      <div className="order-left">
        <h1 className="tile acc">ORDER<br />PICK-UP</h1>
        <p className="body" style={{ marginTop: 20 }}>ready in about 15 minutes at 8 rue du coq. your number shows on the board by the door.</p>
        {PICK.map((c) => (
          <section key={c.name} className="pick">
            <h2 className="caption acc">{c.name} <span className="hangul rice" style={{ fontSize: 20 }}>{c.hangul}</span></h2>
            <ul>
              {c.dishes.map((d) => {
                const v = variant[d.num] ?? 'half';
                const price = d.whole && v === 'whole' ? d.whole : d.price;
                return (
                  <li key={d.num}>
                    <span className="dot acc n">{d.num}</span>
                    <div className="pick-main">
                      <span className="cond nm">{d.name}</span>
                      {d.whole && (
                        <div className="chips" role="radiogroup" aria-label={`${d.name} size`}>
                          {(['half', 'whole'] as const).map((x) => (
                            <button key={x} role="radio" aria-checked={v === x} className="chip sm" onClick={() => setVariant({ ...variant, [d.num]: x })}>
                              {x}{x === 'whole' ? ` ${euro(d.whole!)}` : ''}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="wide acc pr">{euro(price)}</span>
                    <button className="plus" onClick={() => add({ num: d.num, name: d.name, variant: d.whole ? v : undefined, price })} aria-label={`add ${d.name}${d.whole ? ', ' + v : ''}`}>+</button>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
        <Link href="/menu/" className="acc-small">see the full board with photos →</Link>
      </div>
      {count > 0 && <a className="cart-bar" href="#receipt"><span>{count} item{count > 1 ? 's' : ''} · {euro(total)}</span><span>CHECKOUT ↓</span></a>}

      <form id="receipt" className="receipt-cart paper light" onSubmit={pay} noValidate aria-label="your order">
        <div className="rc-head"><span className="caption">YOUR ORDER</span><span className="caption">{count ? `${count} ITEM${count > 1 ? 'S' : ''}` : 'EMPTY'}</span></div>
        <ul className="rc-lines" aria-live="polite">
          {lines.length === 0 && <li className="desc empty">nothing yet. hit + on anything on the board.</li>}
          {lines.map((l) => (
            <li key={l.key}>
              <button type="button" className="step" onClick={() => setQty(l.key, l.qty - 1)} aria-label={`one less ${l.name}`}>–</button>
              <span className="q">{l.qty}</span>
              <button type="button" className="step" onClick={() => setQty(l.key, l.qty + 1)} aria-label={`one more ${l.name}`}>+</button>
              <span className="it">{l.num} {l.name}{l.variant ? ` · ${l.variant}` : ''}</span>
              <span>{euro(l.price * l.qty)}</span>
            </li>
          ))}
        </ul>
        {err.cart && <p className="err" style={{ color: '#a3150d', fontSize: 14 }}>{err.cart}</p>}
        <div className="rc-total"><span className="caption">TOTAL</span><span className="caption">{euro(total)}</span></div>
        {hasDrink && <p className="desc" style={{ color: 'var(--ink)' }}>soju is pick-up with ID, 18+. we check at the counter.</p>}

        <fieldset style={{ marginTop: 18 }}>
          <legend className="label" style={{ color: 'var(--ink)' }}>pick-up time</legend>
          <div className="chips" role="radiogroup" aria-label="pick-up time">
            {['ASAP', ...times].map((t) => (
              <button type="button" key={t} role="radio" aria-checked={time === t} className="chip ink-chip" onClick={() => setTime(t)}>{t === 'ASAP' ? 'ASAP ~15 MIN' : t}</button>
            ))}
          </div>
        </fieldset>
        <div style={{ display: 'grid', gap: 14, marginTop: 18 }}>
          <label className="field"><span className="label" style={{ color: 'var(--ink)' }}>name</span><input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" aria-invalid={!!err.name} />{err.name && <span className="err" style={{ color: '#a3150d' }}>{err.name}</span>}</label>
          <label className="field"><span className="label" style={{ color: 'var(--ink)' }}>phone · we text when it’s ready</span><input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" autoComplete="tel" aria-invalid={!!err.phone} />{err.phone && <span className="err" style={{ color: '#a3150d' }}>{err.phone}</span>}</label>
          <label className="field"><span className="label" style={{ color: 'var(--ink)' }}>note for the kitchen</span><input value={note} onChange={(e) => setNote(e.target.value)} placeholder="extra pickles, no peanuts" /></label>
        </div>
        <div className="pay-embed">
          <span className="caption">PAYMENT</span>
          <span className="desc" style={{ color: 'var(--ink)' }}>card · apple pay · google pay. in the real site the provider’s form sits here. this demo doesn’t charge anything.</span>
        </div>
        <button className="btn ink fill block" style={{ marginTop: 16 }}>PAY {euro(total)}</button>
        <p className="desc" style={{ color: 'var(--ink)', fontSize: 13, marginTop: 12 }}>we start frying when you’re 10 minutes away, or straight away for asap. cancel free until then.</p>
      </form>
    </div>
  );
}
