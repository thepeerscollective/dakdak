# DAKDAK · 닭닭

korean fried chicken + soju bar, paris 10. a concept restaurant site by the peers collective. next.js static export, no backend: ordering, booking and the forms are working demos.

- `lib/data.ts` – the menu (01–16 + banban), hours, address. the open sign, hours board and booking days all read the hours from here.
- `lib/state.tsx` – sauce colour (recolours the whole site, saved per visitor), pick-up cart, booking sheet.
- `app/globals.css` – tokens. the sauce modes are at the top: `html[data-sauce=…]`.
- `public/img` – photos (webp).

```
npm install
npm run dev
```

deploys to github pages on every push to `main` (`.github/workflows/pages.yml`).
