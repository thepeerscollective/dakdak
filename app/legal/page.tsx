import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'legal' };

const S = [
  ['PUBLISHER', 'dakdak is a concept restaurant by the peers collective, made for a portfolio. it doesn’t exist (yet). a real one would list here: company name, legal form, registered office, SIRET, VAT number and publication director.'],
  ['HOSTING', 'github pages, github inc., 88 colin p kelly jr street, san francisco, ca 94107, usa.'],
  ['WHAT WE KEEP', 'nothing leaves your browser. the sauce colour you picked and the last thing in your basket are stored on your device (local storage). bookings, orders and forms on this site are demos and are not sent anywhere.'],
  ['IN A REAL VERSION', 'bookings: name, phone, email, notes, kept 12 months. pick-up orders kept 12 months for accounting, payments handled by the provider, we never see card numbers. job applications kept 6 months if you agree, otherwise deleted when the role is filled. you could see, correct or delete any of it by writing to hello@dakdak.fr, and complain to the cnil.'],
  ['COOKIES', 'no tracking cookies, no analytics, so no banner.'],
  ['ALLERGENS', 'the full allergen table would be at the counter and on request. the fryer is shared, so nothing could be promised free from gluten, peanut, sesame, soy, egg or milk traces.'],
  ['ALCOHOL', 'sale of alcohol to under-18s is prohibited. l’abus d’alcool est dangereux pour la santé, à consommer avec modération.'],
  ['CREDITS', 'design + build · karina beers, the peers collective. images · ai generated for the concept. type · black han sans, doto, antonio, krona one, inter (all open source).'],
];

export default function Legal() {
  return (
    <div className="wrap legal">
      <h1 className="tile acc">LEGAL</h1>
      <p className="caption muted" style={{ marginTop: 14 }}>LAST UPDATED 26.10.2026</p>
      {S.map(([t, b]) => (
        <section key={t} className="legal-row">
          <h2 className="caption acc">{t}</h2>
          <p className="body">{b}</p>
        </section>
      ))}
    </div>
  );
}
