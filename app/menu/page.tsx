'use client';
import Link from 'next/link';
import { useState } from 'react';
import { MENU, BANBAN, SAUCES, img, euro, type Dish } from '@/lib/data';
import { useCart, useSauce, useToast } from '@/lib/state';

export default function MenuPage() {
  const { sauce, setSauce } = useSauce();
  const { add } = useCart();
  const { toast } = useToast();
  const filter = sauce === 'fry-oil' ? null : sauce;
  const [hover, setHover] = useState<string | null>(null);

  const addDish = (d: Dish, variant?: 'half' | 'whole') => {
    add({ num: d.num, name: d.name, variant: d.whole ? variant ?? 'half' : undefined, price: variant === 'whole' && d.whole ? d.whole : d.price });
    toast(`${d.num} ${d.name} → your order`);
  };

  return (
    <div className="wrap menu-page">
      <header className="menu-head">
        <h1 className="statement acc">WHAT’S<br />FRYING</h1>
        <div>
          <p className="hangul acc glow" style={{ fontSize: 40, margin: 0 }}>메뉴</p>
          <p className="body" style={{ marginTop: 16 }}>everything is fried to order, twice. wings take twelve minutes, a whole bird thirty. order a soju while you wait.</p>
        </div>
      </header>

      <div className="filter" role="group" aria-label="filter by sauce">
        <span className="caption muted">FILTER BY SAUCE</span>
        <button className="chip" aria-pressed={!filter} onClick={() => setSauce('fry-oil')}>ALL</button>
        {SAUCES.map((s) => (
          <button key={s.id} className="chip" aria-pressed={filter === s.id} onClick={() => setSauce(s.id)}>
            <span className={`swatch cup-${s.id}`} aria-hidden /> {s.name}
          </button>
        ))}
      </div>

      {MENU.map((cat, ci) => (
        <div key={cat.id}>
          <section className="menu-board board" aria-labelledby={`cat-${cat.id}`}>
            <header className="mb-head">
              <span className="dot acc" style={{ fontSize: 32 }}>{cat.range}</span>
              <h2 id={`cat-${cat.id}`} className="wide acc" style={{ fontSize: 'clamp(22px,2.5vw,36px)' }}>{cat.name}</h2>
              <span className="hangul" style={{ fontSize: 34 }}>{cat.hangul}</span>
              <span className="caption muted tag">{cat.tag}</span>
            </header>
            <ul className="dishes">
              {cat.dishes.map((d) => {
                const dim = filter && !d.sauces?.includes(filter);
                return (
                  <li key={d.num} className={`dish ${dim ? 'dim' : ''}`} onMouseEnter={() => setHover(d.num)} onMouseLeave={() => setHover(null)}>
                    <div className="slot tile-img"><img src={img(d.img)} alt="" loading="lazy" width={800} height={800} /></div>
                    <div className="dish-main">
                      <div className="dish-top">
                        <span className="dot acc" style={{ fontSize: 32 }}>{d.num}</span>
                        <span className="price wide acc" style={{ fontSize: 20 }}>{d.whole ? `${euro(d.price)} / ${euro(d.whole)}` : euro(d.price)}</span>
                      </div>
                      <h3 className="cond dish-name">{d.name}</h3>
                      <p className="desc">{d.desc}</p>
                    </div>
                    <button className="add" onClick={() => addDish(d)} aria-label={`add ${d.name} to pick-up order`} data-show={hover === d.num ? '' : undefined}>+</button>
                  </li>
                );
              })}
            </ul>
          </section>
          {ci === 0 && (
            <aside className="banban paper">
              <p className="tile" style={{ margin: 0 }}>BANBAN <span className="hangul" style={{ fontSize: 40 }}>반반</span></p>
              <p className="body" style={{ fontSize: 18 }}>can’t choose? half soy garlic, half yangnyeom. the korean answer to indecision. {euro(BANBAN.price)} half bird, {euro(BANBAN.whole!)} whole.</p>
              <button className="btn ink" onClick={() => addDish(BANBAN)}>ADD BANBAN</button>
            </aside>
          )}
        </div>
      ))}

      <div className="menu-end">
        <p className="body">allergens: ask us, we know every sauce by heart. tofu swap on most plates. the fryer is shared, so not safe for coeliacs, sorry.</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link className="btn fill" href="/order/">ORDER PICK-UP</Link>
          <a className="btn" href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>BACK UP ↑</a>
        </div>
      </div>
    </div>
  );
}
