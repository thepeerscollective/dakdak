'use client';
import Link from 'next/link';
import { img, ADDRESS } from '@/lib/data';
import { useToast } from '@/lib/state';

export default function Footer() {
  const { toast } = useToast();
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(ADDRESS);
      toast('copied, see you there');
    } catch {
      toast(ADDRESS);
    }
  };
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="big">
            <button onClick={copy} className="wide acc" style={{ textAlign: 'left', lineHeight: 1.75 }} aria-label="copy address: 8 rue du coq, paris 10">
              8 RUE DU COQ, PARIS 10
            </button>
            <Link href="/order/">ORDER PICK-UP</Link>
            <Link href="/parties/">PRIVATE &amp; PARTIES</Link>
            <Link href="/jobs/">JOBS</Link>
            <Link href="/find-us/">FIND US</Link>
            <a href="https://instagram.com/" target="_blank" rel="noreferrer">INSTAGRAM ↗</a>
          </div>
          <div className="box">
            <img src={img('footer-chicken-box.webp')} alt="" width={1400} height={467} loading="lazy" />
          </div>
        </div>
        <div className="small">
          <Link href="/legal/">legal notice · privacy · allergens</Link>
          <span>design · karina beers · the peers collective</span>
        </div>
      </div>
    </footer>
  );
}
