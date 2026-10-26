'use client';
import { useRef, useState } from 'react';
import { img, type Dish } from '@/lib/data';

export default function Slider({ slides }: { slides: Dish[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const go = (d: number) => {
    const n = (i + d + slides.length) % slides.length;
    setI(n);
    const el = track.current?.children[n] as HTMLElement | undefined;
    track.current?.scrollTo({ left: el?.offsetLeft ?? 0, behavior: 'smooth' });
  };
  return (
    <div className="slider" aria-roledescription="carousel" aria-label="dishes">
      <div
        className="slider-track"
        ref={track}
        onScroll={(e) => {
          const t = e.currentTarget;
          setI(Math.round(t.scrollLeft / t.clientWidth));
        }}
      >
        {slides.map((s, k) => (
          <figure key={s.num} className="slide slot" aria-label={`${k + 1} of ${slides.length}`}>
            <img src={img(s.img)} alt={s.name} loading="lazy" width={800} height={800} />
            <figcaption>
              <span className="dot acc">{s.num}</span>
              <span className="cond">{s.name}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="slider-ui">
        <button onClick={() => go(-1)} aria-label="previous dish" className="arrow">←</button>
        <span className="dot acc count">{String(i + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
        <button onClick={() => go(1)} aria-label="next dish" className="arrow">→</button>
      </div>
    </div>
  );
}
