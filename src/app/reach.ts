// Edit this file: it holds the facts only you can supply.

  /** International format, digits only, no + or spaces. Example: 2547XXXXXXXX. Leave '' to hide WhatsApp buttons. */
export const WHATSAPP = '';

/** Cal.com / Calendly / Google Calendar booking link. Leave '' to hide the booking button. */
export const BOOKING_URL = '';

export const WHATSAPP_TEXT = "Hi David, I found your site and I'd like to talk about a project.";

/** "Built for Kenyan businesses". Keep only what is true for your work. */
export const LOCAL = {
  title: 'Built for businesses in Kenya',
  items: [
{
  title: 'Hosted on local infrastructure',
  text: 'I deploy multi-tenant Dolibarr ERP on Safaricom Cloud, so your records sit in-country and one install can serve several branches or companies.',
},
{
  title: 'M-Pesa in the workflow',
  text: 'Customers pay the way they already do. I wire M-Pesa payments into orders, invoices and reconciliation. (Keep this line only if you have shipped it for a client.)',
},
{
  title: 'Same time zone, in person when it helps',
  text: "I'm based in Thika, on East Africa Time. Calls happen in your working day, and I can meet around Nairobi.",
},
// Add one more only if it is true, e.g. KRA eTIMS invoicing, bilingual Swahili/English interfaces.
],
};

/** Evidence for the maths claim. One entry per real piece of work. */
export const PROOFS: {
  title: string; problem: string; method: string; check: string; result: string;
  href?: string; hrefLabel?: string; placeholder?: boolean;
}[] = [
      {
        title: 'Weekly demand forecast for a retail client',
        problem: 'Stock-outs on fast movers and cash tied up in slow ones.',
        method: 'Seasonal model on three years of weekly sales, with a prediction interval per product.',
        check: 'Trained on everything before the last 13 weeks, then scored on those 13 weeks it had never seen.',
        result: 'Average error 11%, against 19% for "same as last year". 9 of 10 actual weeks fell inside the stated interval.',
        // href: 'https://github.com/you/forecast-notebook', hrefLabel: 'Read the notebook',
        placeholder: true,
      },
];
