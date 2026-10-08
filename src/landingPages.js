// Swedish landing pages aimed at local Google searches.
// Each page lives at /sv/<slug> and only exists on the Swedish site.
// This file is plain data so the sitemap script can read it too.
// To add a page: copy one of the objects below, change the slug and the text,
// and it gets its own URL, page title, sitemap entry and footer link automatically.

export const landingPages = [
  {
    slug: 'webbyra-goteborg',
    footerLabel: 'Webbyrå i Göteborg',
    title: 'Webbyrå i Göteborg? Ett personligt alternativ | Annie Howells Design',
    description: 'Letar du efter en webbyrå i Göteborg? Jag är fristående webbdesigner, utvecklare och konsult. Du får strategi, design och utveckling, men jobbar direkt med den som gör jobbet.',
    heroImage: '/images/work-hero.jpg',
    eyebrow: 'Webbdesign och utveckling i Göteborg',
    heading: 'Letar du efter en webbyrå i Göteborg?',
    intro: 'Jag är fristående webb- och varumärkesdesigner och konsult i Göteborg. Du får det en byrå erbjuder, strategi, design och utveckling, men jobbar direkt med den som gör jobbet. Inga mellanhänder, korta beslutsvägar.',
    primaryCta: 'Berätta om ditt projekt',
    secondaryCta: { label: 'Se mina projekt', path: '/work' },
    reasonsHeading: 'Varför en fristående designer?',
    reasons: [
      {
        title: 'Du pratar med den som gör jobbet',
        text: 'Ingen projektledare som för vidare dina idéer. Samma person lyssnar på dina mål, tar fram strukturen, designar och bygger. Det blir färre missförstånd och snabbare beslut.',
      },
      {
        title: 'Strategi, design och utveckling i ett',
        text: 'Jag jobbar UX-drivet från första skissen till lanseringen. Hemsidan byggs för att dina kunder ska förstå vad du erbjuder och höra av sig, inte bara för att se bra ut.',
      },
      {
        title: 'Lokalt i Göteborg, på svenska och engelska',
        text: 'Vi kan ses på plats i Göteborg eller ta allt digitalt. Jag jobbar på både svenska och engelska, vilket gör det enkelt att ta fram en tvåspråkig hemsida om du har internationella kunder.',
      },
    ],
    servicesHeading: 'Det här kan jag hjälpa dig med',
    services: [
      'Ny hemsida, från strategi och struktur till design och lansering',
      'Uppfräschning av en befintlig hemsida',
      'E-handel i Shopify',
      'Visuell identitet och grafisk profil',
      'UX-granskning av en hemsida som inte ger resultat',
      'Tvåspråkiga hemsidor på svenska och engelska',
    ],
    servicesLink: { label: 'Läs mer om mina tjänster', path: '/services' },
    projectsHeading: 'Utvalda projekt',
    projects: ['orserio', 'genaura', 'oetker-collection-boutique'],
    faqHeading: 'Vanliga frågor',
    faqs: [
      {
        question: 'Vad är skillnaden mellan en webbyrå och en frilansare?',
        answer: 'En webbyrå har ett team med flera roller, vilket passar stora projekt med många inblandade. Som frilansande konsult gör jag strategi, design och utveckling själv. För de flesta småföretag och växande varumärken betyder det kortare beslutsvägar, en tydlig kontaktperson och att du betalar för arbetet snarare än för flera led.',
      },
      {
        question: 'Kan du både designa och bygga hemsidan?',
        answer: 'Ja. Jag designar i Figma och bygger hemsidor i bland annat Shopify, Squarespace och egen kod. Du får en färdig hemsida som du kan uppdatera själv efter lanseringen.',
      },
      {
        question: 'Hur lång tid tar ett webbprojekt?',
        answer: 'En mindre hemsida tar ofta 3–5 veckor och en omdesign av en hel hemsida 6–10 veckor. Varumärke och hemsida tillsammans tar 8–12 veckor eller mer. Varje projekt börjar med en tydlig plan så att du vet vad du kan förvänta dig.',
      },
      {
        question: 'Vad händer om mitt projekt är för stort för en person?',
        answer: 'Då säger jag det direkt. Hellre ett ärligt samtal i början än ett projekt som inte blir som du tänkt dig.',
      },
      {
        question: 'Jobbar du bara med företag i Göteborg?',
        answer: 'Nej. Jag är baserad i Göteborg men jobbar med kunder i hela Sverige, i Storbritannien och internationellt. Finns du i Göteborgsområdet ses vi gärna på plats.',
      },
    ],
  },
  {
    slug: 'varumarkesdesign-goteborg',
    footerLabel: 'Varumärkesdesign i Göteborg',
    title: 'Varumärkesdesign och grafisk profil i Göteborg | Annie Howells Design',
    description: 'Varumärkesdesigner i Göteborg. Jag tar fram visuella identiteter och grafiska profiler för småföretag och växande varumärken, från logga och typografi till hemsida.',
    heroImage: '/images/projects/genaura/genaura-cover.jpeg',
    eyebrow: 'Visuell identitet och grafisk profil',
    heading: 'Varumärkesdesign i Göteborg',
    intro: 'Jag är varumärkesdesigner i Göteborg och tar fram visuella identiteter för småföretag och växande varumärken. Från logga, färger och typografi till en grafisk profil som fungerar överallt, på hemsidan, i sociala medier och i tryck.',
    primaryCta: 'Berätta om ditt varumärke',
    secondaryCta: { label: 'Se mina projekt', path: '/work' },
    reasonsHeading: 'Vad ingår i en visuell identitet?',
    reasons: [
      {
        title: 'Logga och grafiska element',
        text: 'En logga som fungerar i alla storlekar och sammanhang, tillsammans med de mönster, ikoner och detaljer som gör ditt varumärke igenkännbart.',
      },
      {
        title: 'Färger, typografi och bildspråk',
        text: 'En färgpalett och typsnitt som speglar vem ni är, och riktlinjer för bilder som gör att allt ni publicerar känns som en helhet.',
      },
      {
        title: 'En grafisk profil som går att använda',
        text: 'Tydliga riktlinjer som du, ditt team och framtida samarbetspartners kan följa, så att varumärket håller ihop när det används i nya sammanhang.',
      },
    ],
    servicesHeading: 'Passar dig som',
    services: [
      'Startar ett nytt företag och vill göra rätt från början',
      'Har vuxit ur en logga som togs fram i farten',
      'Upplever att varumärket känns spretigt i olika kanaler',
      'Ska ta fram en ny hemsida och vill att varumärket ska hålla',
      'Vill nå en ny målgrupp eller ta betalt för större uppdrag',
    ],
    servicesLink: { label: 'Läs mer om mina tjänster', path: '/services' },
    projectsHeading: 'Utvalda varumärkesprojekt',
    projects: ['genaura', 'desdeck', 'ultimate-library'],
    faqHeading: 'Vanliga frågor',
    faqs: [
      {
        question: 'Behöver jag en ny logga eller en hel grafisk profil?',
        answer: 'Det beror på var du står. Har du en logga du trivs med kan det räcka att bygga ut den med färger, typografi och riktlinjer. Känns hela uttrycket fel är en ny visuell identitet oftast rätt väg. Vi tar reda på det tillsammans i början av projektet.',
      },
      {
        question: 'Kan du göra hemsidan också?',
        answer: 'Ja. Många av mina projekt omfattar både varumärke och hemsida, vilket gör att allt hänger ihop från början. Varumärke och hemsida tillsammans tar ofta 8–12 veckor eller mer.',
      },
      {
        question: 'Hur går ett varumärkesprojekt till?',
        answer: 'Vi börjar med att prata om dina mål, din målgrupp och vad som gör ditt företag unikt. Sedan tar jag fram en riktning, vi förfinar den tillsammans och till sist får du alla filer och riktlinjer du behöver för att använda varumärket.',
      },
      {
        question: 'Jobbar du bara med företag i Göteborg?',
        answer: 'Nej. Jag är baserad i Göteborg men jobbar med kunder i hela Sverige, i Storbritannien och internationellt. Finns du i Göteborgsområdet ses vi gärna på plats.',
      },
    ],
  },
]

export function getLandingPage(slug) {
  return landingPages.find(page => page.slug === slug) || null
}
