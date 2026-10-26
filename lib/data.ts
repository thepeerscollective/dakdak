export const BASE = process.env.NEXT_PUBLIC_BASE ?? '';
export const img = (name: string) => `${BASE}/img/${name}`;

export const ADDRESS = '8 rue du coq, paris 10';
export const EMAIL = 'hello@dakdak.fr';
export const JOBS_EMAIL = 'jobs@dakdak.fr';
export const PHONE = '01 •• •• •• 47';
export const INSTAGRAM = 'https://instagram.com/';

export type Sauce = 'fry-oil' | 'soy-garlic' | 'yangnyeom' | 'snow-cheese';

export const SAUCES: { id: Exclude<Sauce, 'fry-oil'>; name: string; lines: string[]; note: string }[] = [
  { id: 'soy-garlic', name: 'soy garlic', lines: ['SOY', 'GARLIC'], note: 'sweet · salty · sticky' },
  { id: 'yangnyeom', name: 'yangnyeom', lines: ['YANGNYEOM'], note: 'sweet heat · the classic' },
  { id: 'snow-cheese', name: 'snow cheese', lines: ['SNOW', 'CHEESE'], note: 'powdered · a bit stupid' },
];

export type Dish = {
  num: string;
  name: string;
  price: number;
  whole?: number;
  desc: string;
  img: string;
  sauces?: Exclude<Sauce, 'fry-oil'>[];
};

export type Category = { id: string; range: string; name: string; hangul: string; tag: string; dishes: Dish[] };

export const MENU: Category[] = [
  {
    id: 'chicken', range: '01–04', name: 'chicken', hangul: '치킨', tag: 'half or whole bird',
    dishes: [
      { num: '01', name: 'soy garlic wings', price: 9, desc: 'six wings, double fried, glazed in soy, garlic and sesame.', img: 'menu-01-soy-garlic.webp', sauces: ['soy-garlic'] },
      { num: '02', name: 'yangnyeom', price: 16, whole: 29, desc: 'sweet-hot gochujang glaze, crushed peanuts. half or whole.', img: 'menu-02-yangnyeom.webp', sauces: ['yangnyeom'] },
      { num: '03', name: 'snow cheese', price: 15, whole: 27, desc: 'boneless thighs under a blizzard of cheese powder. a bit stupid, very good.', img: 'menu-03-snow-cheese.webp', sauces: ['snow-cheese'] },
      { num: '04', name: 'plain crunch', price: 14, whole: 25, desc: 'no sauce, salt and pepper, pickled radish. for purists.', img: 'menu-04-plain-crunch.webp' },
    ],
  },
  {
    id: 'small-plates', range: '05–08', name: 'small plates', hangul: '안주', tag: 'good with soju',
    dishes: [
      { num: '05', name: 'tteokbokki', price: 8, desc: 'rice cakes, fish cake, red sauce, a soft egg.', img: 'menu-05-tteokbokki.webp', sauces: ['yangnyeom'] },
      { num: '06', name: 'corn cheese', price: 7, desc: 'sweetcorn, mayo, mozzarella, torched at the table.', img: 'menu-06-corn-cheese.webp', sauces: ['snow-cheese'] },
      { num: '07', name: 'kimchi fries', price: 8, desc: 'fries, aged kimchi, gochujang mayo, spring onion.', img: 'menu-07-kimchi-fries.webp', sauces: ['yangnyeom'] },
      { num: '08', name: 'pickled radish', price: 4, desc: 'cold, sweet, sour. the reset button between wings.', img: 'menu-08-radish.webp' },
    ],
  },
  {
    id: 'rice-noodles', range: '09–12', name: 'rice & noodles', hangul: '밥 & 면', tag: 'the late ones',
    dishes: [
      { num: '09', name: 'kimchi fried rice', price: 11, desc: 'crispy bottom, fried egg, seaweed snow.', img: 'menu-09-fried-rice.webp' },
      { num: '10', name: 'cold noodles', price: 12, desc: 'buckwheat noodles, iced broth, pear, mustard.', img: 'menu-10-cold-noodles.webp' },
      { num: '11', name: 'ramyun + egg', price: 9, desc: 'the 1am one. cheese slice if you’re honest.', img: 'menu-11-ramyun.webp', sauces: ['snow-cheese'] },
      { num: '12', name: 'bibim bowl', price: 13, desc: 'rice, five veg, chilli paste. chicken or tofu.', img: 'menu-12-bibim.webp', sauces: ['soy-garlic'] },
    ],
  },
  {
    id: 'drinks', range: '13–16', name: 'drinks', hangul: '술', tag: 'id at the bar',
    dishes: [
      { num: '13', name: 'soju, flavoured', price: 7, desc: 'peach, grapefruit, green grape. or plain if you mean it.', img: 'menu-13-soju.webp' },
      { num: '14', name: 'somaek tower', price: 22, desc: 'soju dropped into beer, built for the table.', img: 'menu-14-somaek.webp' },
      { num: '15', name: 'makgeolli', price: 6, desc: 'cloudy rice wine, poured into a tin bowl.', img: 'menu-15-makgeolli.webp' },
      { num: '16', name: 'yuja soda', price: 5, desc: 'no alcohol, all citrus. also the hangover cure.', img: 'menu-16-yuja.webp' },
    ],
  },
];

export const BANBAN: Dish = { num: 'B', name: 'banban, half & half', price: 18, whole: 32, desc: 'half soy garlic, half yangnyeom.', img: 'booth-09-box.webp', sauces: ['soy-garlic', 'yangnyeom'] };

export const ALL_DISHES: Dish[] = [...MENU.flatMap((c) => c.dishes), BANBAN];

export const BOOTH = [
  [['booth-01-table', 'the table'], ['booth-02-wings', 'wings up'], ['booth-03-clink', 'clink'], ['booth-04-crew', 'the crew']],
  [['booth-05-sauce', 'sauce'], ['booth-06-soju', 'soju pour'], ['booth-07-faces', 'faces'], ['booth-08-2am', '2am']],
  [['booth-09-box', 'the box'], ['booth-10-bite', 'first bite'], ['booth-11-neon', 'the sign'], ['booth-12-bye', 'bye']],
] as const;

// 0 = sunday. times in minutes from midnight, close past midnight = > 1440
export const HOURS: { day: string; open?: number; close?: number }[] = [
  { day: 'SUN', open: 18 * 60, close: 23 * 60 + 30 },
  { day: 'MON' },
  { day: 'TUE' },
  { day: 'WED', open: 18 * 60, close: 23 * 60 + 30 },
  { day: 'THU', open: 18 * 60, close: 26 * 60 },
  { day: 'FRI', open: 18 * 60, close: 26 * 60 },
  { day: 'SAT', open: 18 * 60, close: 26 * 60 },
];

export const fmt = (m: number) => {
  const mm = m % 1440;
  return `${String(Math.floor(mm / 60)).padStart(2, '0')}:${String(mm % 60).padStart(2, '0')}`;
};

/** paris wall-clock now */
export function parisNow(d = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Paris', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const wd = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  return { day: wd, minutes: Number(get('hour')) * 60 + Number(get('minute')) };
}

export function openStatus(d = new Date()) {
  const { day, minutes } = parisNow(d);
  const today = HOURS[day];
  const yesterday = HOURS[(day + 6) % 7];
  if (yesterday.close && yesterday.close > 1440 && minutes < yesterday.close - 1440) {
    return { open: true, until: fmt(yesterday.close), today: day };
  }
  if (today.open && today.close && minutes >= today.open && minutes < today.close) {
    return { open: true, until: fmt(today.close), today: day };
  }
  // next opening
  for (let i = 0; i < 7; i++) {
    const h = HOURS[(day + i) % 7];
    if (h.open && (i > 0 || minutes < h.open)) return { open: false, next: `${i === 0 ? 'today' : h.day.toLowerCase()} ${fmt(h.open)}`, today: day };
  }
  return { open: false, next: '', today: day };
}

export const euro = (n: number) => `${n}€`;
