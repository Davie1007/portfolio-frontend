# David Karanja – Portfolio (Angular 21 + Tailwind CSS 4)

    npm install
    npm start          # dev server at http://localhost:4200
    npm run build      # production build in dist/portfolio/browser

## Edit your content
Everything is in `src/app/content.ts`: contact email, services, work, testimonials,
donation tiers, funding goals and terms. Design tokens (colours, fonts) are in `src/styles.css`.

## Before launch
- Replace the sample testimonials and set `placeholder: false` on each.
- Set `SITE.email`, funding `goal`/`raised`, and confirm the promises, tiers and terms.
- Forms: leave `SITE.apiUrl` empty to open the visitor's email app, or set it to an endpoint
  that accepts a JSON POST (Formspree, your Laravel API, etc.).
- Payments are NOT connected. In `App.pledge()` in `src/app/app.ts`, add M-Pesa (Daraja STK push)
  or a card provider, and only issue the discount code after payment is confirmed.
