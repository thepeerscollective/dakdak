import Link from 'next/link';
import { img, MENU } from '@/lib/data';
import { NowServing, SaucePicker, Booth, Ticker, Poster } from '@/components/bits';
import Slider from '@/components/Slider';
import { BookButton, Printer } from '@/components/client';

const slides = [MENU[0].dishes[1], MENU[0].dishes[0], MENU[0].dishes[2], MENU[1].dishes[0], MENU[1].dishes[1], MENU[2].dishes[1]];

export default function Home() {
  return (
    <>
      {/* ---------- hero: the sign + the board ---------- */}
      <section className="hero wrap">
        <div className="hero-sign">
          <h1 className="sign hangul acc glow" aria-label="dakdak">
            <span aria-hidden>닭닭</span>
          </h1>
          <p className="caption rice reading">(DAK DAK · CHICKEN CHICKEN)</p>
          <img className="drumstick" src={img('home-drumstick.webp')} alt="" width={900} height={675} />
        </div>
        <div className="hero-side">
          <NowServing />
          <p className="wide acc" style={{ fontSize: 'clamp(32px,3.75vw,54px)', marginTop: 34 }}>DAKDAK</p>
          <p className="body" style={{ fontSize: 18, marginTop: 14 }}>korean fried chicken, cold soju and too much gochujang. open till 2am.</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 26, flexWrap: 'wrap' }}>
            <Link className="btn fill" href="/order/">ORDER PICK-UP</Link>
            <BookButton className="btn">BOOK</BookButton>
          </div>
        </div>
        <p className="rail caption acc" aria-hidden>8 RUE DU COQ · PARIS 10</p>
      </section>

      {/* ---------- pick a sauce ---------- */}
      <section className="wrap sauce" aria-labelledby="sauce-h">
        <div className="sauce-head">
          <h2 id="sauce-h" className="statement acc">PICK A SAUCE</h2>
          <p className="body">the whole site turns the colour of your sauce. change your mind whenever, nobody judges.</p>
        </div>
        <SaucePicker />
      </section>

      {/* ---------- chimaek night: photo booth ---------- */}
      <section className="wrap chimaek">
        <div className="chimaek-text">
          <h2 className="statement acc">CHIMAEK<br />NIGHT</h2>
          <p className="wide acc" style={{ fontSize: 28, marginTop: 26 }}>
            <span className="hangul" style={{ fontSize: 40, verticalAlign: '-4px' }}>치맥</span> = CHICKEN + BEER
          </p>
          <p className="body" style={{ marginTop: 20, maxWidth: 440 }}>a korean ritual: fried chicken, cold beer, a long night. we added soju and a photo booth by the toilets. first strip is on us.</p>
        </div>
        <Booth />
      </section>

      {/* ---------- crunch to go ---------- */}
      <section className="wrap togo">
        <div>
          <h2 className="statement acc">CRUNCH<br />TO GO</h2>
          <p className="wide acc" style={{ fontSize: 'clamp(20px,2.5vw,36px)', marginTop: 34 }}>FRIED HERE,<br />EATEN ANYWHERE.</p>
          <p className="body acc-small" style={{ marginTop: 22, maxWidth: 480 }}>order on the site, pick up in fifteen minutes, your number shows up on the board by the door.</p>
          <Link className="btn" href="/order/" style={{ marginTop: 26 }}>ORDER PICK-UP</Link>
        </div>
        <Printer />
        <div className="slot sq"><img src={img('home-crunch.webp')} alt="a fry basket of double-fried chicken, steam rising" loading="lazy" width={1100} height={1100} /></div>
      </section>

      <Ticker words={['KOREAN FRIED CHICKEN', 'SOJU IS A SIDE', 'OPEN TILL 2AM', 'NO BONES ABOUT IT']} />

      {/* ---------- staff wanted ---------- */}
      <section className="wrap staff">
        <Poster home role="STAFF WANTED" desc="fry cook · floor · bar. nights, thu to sat. we teach the sauces, you bring the energy." />
        <figure className="slot crew">
          <img src={img('home-crew.webp')} alt="the crew in black hoodies, one yellow, backs to the camera" loading="lazy" width={1402} height={1122} />
          <figcaption><Link className="btn fill sm" href="/jobs/">SEE THE ROLES</Link></figcaption>
        </figure>
      </section>

      {/* ---------- slider + reel ---------- */}
      <section className="wrap reelrow">
        <Slider slides={slides} />
        <div className="phone">
          <span className="caption status">23:41</span>
          <div className="slot"><img src={img('home-reel.webp')} alt="a cook lifting a fry basket out of the oil" loading="lazy" width={900} height={1599} /></div>
          <span className="caption reel-cap">FRYER PASS</span>
        </div>
      </section>
    </>
  );
}
