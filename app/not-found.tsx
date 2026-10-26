import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="wrap nf">
      <div className="board now big">
        <span className="caption">NOW SERVING</span>
        <span className="dot acc glow num nf-num">0404</span>
        <span className="caption muted">WRONG WINDOW</span>
      </div>
      <h1 className="tile acc" style={{ textAlign: 'center', marginTop: 48 }}>THIS CHICKEN FLEW.</h1>
      <p className="body" style={{ textAlign: 'center', margin: '16px auto 0' }}>the page you wanted isn’t here. the wings are.</p>
      <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginTop: 30, flexWrap: 'wrap' }}>
        <Link className="btn fill" href="/menu/">SEE THE MENU</Link>
        <Link className="btn" href="/">HOME</Link>
      </div>
    </div>
  );
}
