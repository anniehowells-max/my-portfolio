import { useState } from "react"
import Contact from "../components/Contact"

const services = [
  {
    number: "01",
    title: "Web Design & Build",
    description:
      "Design and build of responsive, user-focused websites that are easy to navigate, easy to manage, and designed to convert. From structure and layout to final launch.",
  },
  {
    number: "02",
    title: "Website Refresh",
    description:
      "Perfect for businesses whose website looks dated or no longer reflects where they are today. Updates the design, layout and content to improve clarity, usability and visual impact — without the cost of a full rebuild.",
  },
  {
    number: "03",
    title: "Brand Identity Design",
    description:
      "Complete visual identities that define how your brand looks, feels, and communicates. Including colour, typography, and design systems that work consistently across digital and print.",
  },
  {
    number: "04",
    title: "Logo Only Design",
    description:
      "A focused logo design service for brands that don't need a full identity. Thoughtfully designed, versatile logos that work across platforms and scales.",
  },
  {
    number: "05",
    title: "UX/UI Services",
    description:
      "User-centred design focused on usability, clarity, and flow. From UX audits and wireframes to interface design for websites and digital products.",
  },
  {
    number: "06",
    title: "Graphic Design",
    description:
      "Design support for both digital and print — from marketing assets to presentations and editorial layouts. Clean, considered design that aligns with your brand.",
  },
  {
    number: "07",
    title: "Social Media Post Design",
    description:
      "Custom-designed social media posts and templates that feel cohesive, on-brand, and easy to reuse — helping you show up consistently online.",
  },
]

const faqs = [
  {
    question: "Can you redesign my existing website?",
    answer:
      "Yes. I regularly redesign websites to improve user experience, increase clarity and conversions, modernise branding, and improve structure and usability. If your current site feels outdated, unclear, or underperforming, a strategic redesign can significantly improve results.",
  },
  {
    question: "What kind of design work do you specialise in?",
    answer:
      "I focus on web design, UX/UI, brand identity, and digital experiences that help businesses communicate clearly and connect with their audience.",
  },
  {
    question: "Do you work with startups, small businesses, or larger companies?",
    answer:
      "I work with startups, growing businesses, and established brands looking to improve their digital presence — from founders launching a new brand to companies wanting better UX and clearer messaging.",
  },
  {
    question: "How long does a website design project take?",
    answer:
      "Small website: 3–5 weeks. Full website redesign: 6–10 weeks. Branding + website: 8–12+ weeks. Each project begins with a clear roadmap so you know exactly what to expect.",
  },
  {
    question: "What is your website design process?",
    answer:
      "My process is structured and collaborative: Discovery & Strategy → UX Planning → Visual Design → Build & Testing → Launch & Support. This ensures your website isn't just designed — it's strategically built.",
  },
  {
    question: "Do you offer UX audits?",
    answer:
      "Yes. I provide UX audits for websites and digital platforms, identifying usability issues, structural weaknesses, and conversion blockers. You'll receive clear, actionable recommendations to improve performance and user experience.",
  },
  {
    question: "Do you only work with clients in London?",
    answer:
      "No — although I'm based in London, I work with clients across the UK and internationally. Projects are managed remotely with structured communication and milestone check-ins.",
  },
]

const heroImage = '/images/services-hero.jpg bottom'

export default function Services() {
  const [openService, setOpenService] = useState(null)
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div style={styles.page}>

      {/* Hero */}
      <section style={styles.hero}>
        <div style={styles.heroOverlay} />
        <h1 style={styles.heroTitle}>Services</h1>
      </section>

      {/* Two-column services section */}
      <section style={styles.twoCol}>
        {/* Left: sticky "What I Offer" */}
        <div style={styles.leftCol}>
          <p style={styles.eyebrow}>What I offer</p>
          <h2 style={styles.leftHeading}>
            Strategic design,<br />built to perform.
          </h2>
          <p style={styles.leftBody}>
            From full website builds to brand identities and UX improvements — every service is focused on clarity, usability, and results that last.
          </p>
          <a href="/enquire" style={styles.leftCta}>Enquire Now</a>
        </div>

        {/* Right: accordions */}
        <div style={styles.rightCol}>
          {services.map((s, i) => (
            <div key={i} style={styles.accordionItem}>
              <button
                style={styles.accordionHeader}
                onClick={() => setOpenService(openService === i ? null : i)}
              >
                <span style={styles.accordionNumber}>{s.number}</span>
                <span style={styles.accordionTitle}>{s.title}</span>
                <span
                  style={{
                    ...styles.accordionIcon,
                    transform: openService === i ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >
                  +
                </span>
              </button>
              {openService === i && (
                <p style={styles.accordionBody}>{s.description}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Band */}
      <section style={styles.ctaBand}>
        <p style={styles.ctaQuote}>"Beautiful, slick, calm and clear, visually stunning."</p>
        <p style={styles.ctaAuthor}>— Betsy Limpenny @ The Interiors Edit</p>
        <a href="/enquire" style={styles.ctaBtn}>Enquire Now</a>
      </section>

      {/* FAQ */}
      <section style={styles.faqSection}>
        <h2 style={styles.faqHeading}>FAQ's</h2>
        <div style={styles.faqList}>
          {faqs.map((faq, i) => (
            <div key={i} style={styles.faqItem}>
              <button
                style={styles.faqQuestion}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span>{faq.question}</span>
                <span style={{ ...styles.faqIcon, transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
              </button>
              {openFaq === i && (
                <p style={styles.faqAnswer}>{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      <Contact />

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

const styles = {
  page: {
    backgroundColor: "var(--color-text-dark, #403E3A)",
    color: "var(--color-text-light, #f5f5f0)",
    minHeight: "100vh",
    fontFamily: "'Instrument Sans', sans-serif",
  },

  // Hero
  hero: {
    position: "relative",
    height: "50vh",
    backgroundImage: `url(${heroImage.split(' ')[0]})`,
    backgroundSize: "cover",
    backgroundPosition: heroImage.split(' ')[1] || 'center',
    display: "flex",
    alignItems: "flex-end",
    padding: "3rem 6rem",
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(40, 38, 35, 0.35)",
  },
  heroTitle: {
    position: "relative",
    zIndex: 1,
    fontSize: "clamp(3rem, 8vw, 6rem)",
    fontWeight: "700",
    letterSpacing: "-0.03em",
    lineHeight: 1,
    margin: 0,
    color: "var(--color-text-light, #f5f5f0)",
    animation: "fadeUp 0.7s ease both",
  },

  // Two-column layout
  twoCol: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    alignItems: "start",
  },

  // Left sticky column
  leftCol: {
    position: "sticky",
    top: "5rem",
    padding: "5rem 4rem 5rem 6rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem",
  },
  eyebrow: {
    fontSize: "0.75rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    opacity: 0.4,
    margin: 0,
  },
  leftHeading: {
    fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
    fontWeight: "700",
    letterSpacing: "-0.03em",
    lineHeight: 1.2,
    margin: 0,
    color: "var(--color-text-light, #f5f5f0)",
  },
  leftBody: {
    fontSize: "0.95rem",
    opacity: 0.5,
    lineHeight: 1.8,
    margin: 0,
  },
  leftCta: {
    display: "inline-block",
    marginTop: "0.5rem",
    padding: "0.85rem 2.2rem",
    border: "1px solid rgba(255,255,255,0.3)",
    color: "var(--color-text-light, #f5f5f0)",
    textDecoration: "none",
    fontSize: "0.85rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    fontWeight: "600",
    transition: "background 0.2s, border-color 0.2s",
    borderRadius: "2px",
    alignSelf: "flex-start",
  },

  // Right accordions column
  rightCol: {
    padding: 0,
    borderLeft: "1px solid rgba(255,255,255,0.08)",
  },

  // Accordion
  accordionItem: {
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
  accordionHeader: {
    width: "100%",
    background: "none",
    border: "none",
    color: "var(--color-text-light, #f5f5f0)",
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
    padding: "1.8rem 0 1.8rem 3rem",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
    textAlign: "left",
    letterSpacing: "-0.01em",
  },
  accordionNumber: {
    fontSize: "0.7rem",
    letterSpacing: "0.15em",
    opacity: 0.25,
    minWidth: "1.8rem",
    fontVariantNumeric: "tabular-nums",
  },
  accordionTitle: {
    flex: 1,
    fontSize: "1.1rem",
    fontWeight: "600",
    letterSpacing: "-0.02em",
  },
  accordionIcon: {
    fontSize: "1.4rem",
    fontWeight: "300",
    opacity: 0.4,
    transition: "transform 0.25s ease",
    flexShrink: 0,
    paddingRight: "2rem",
  },
  accordionBody: {
    fontSize: "0.95rem",
    opacity: 0.5,
    lineHeight: 1.8,
    margin: 0,
    padding: "0 1rem 1.8rem 6.8rem",
  },

  // Section wrapper
  section: {
    padding: "4rem 6rem",
    borderTop: "1px solid rgba(255,255,255,0.08)",
  },

  // FAQ section — inverted
  faqSection: {
    padding: "5rem 6rem",
    backgroundColor: "var(--color-text-light, #f5f5f0)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  // CTA Band
  ctaBand: {
    padding: "5rem 6rem",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "1rem",
  },
  ctaQuote: {
    fontSize: "clamp(1.3rem, 3vw, 2rem)",
    fontWeight: "600",
    fontStyle: "italic",
    letterSpacing: "-0.02em",
    lineHeight: 1.4,
    maxWidth: "680px",
    margin: 0,
    opacity: 0.9,
  },
  ctaAuthor: {
    fontSize: "0.85rem",
    opacity: 0.4,
    letterSpacing: "0.05em",
    margin: "0 0 1rem",
  },
  ctaBtn: {
    display: "inline-block",
    padding: "0.85rem 2.2rem",
    border: "1px solid rgba(255,255,255,0.3)",
    color: "var(--color-text-light, #f5f5f0)",
    textDecoration: "none",
    fontSize: "0.85rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    fontWeight: "600",
    transition: "background 0.2s, border-color 0.2s",
    borderRadius: "2px",
  },

  // FAQ
  faqHeading: {
    fontSize: "1.8rem",
    fontWeight: "600",
    letterSpacing: "-0.02em",
    margin: "0 0 2.5rem",
    color: "var(--color-text-dark, #403E3A)",
    textAlign: "center",
  },
  faqList: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "760px",
  },
  faqItem: {
    borderBottom: "1px solid rgba(64,62,58,0.12)",
  },
  faqQuestion: {
    width: "100%",
    background: "none",
    border: "none",
    color: "var(--color-text-dark, #403E3A)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1.4rem 0",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
    textAlign: "left",
    gap: "1rem",
    letterSpacing: "-0.01em",
  },
  faqIcon: {
    fontSize: "1.4rem",
    fontWeight: "300",
    opacity: 0.4,
    transition: "transform 0.25s ease",
    flexShrink: 0,
    color: "var(--color-text-dark, #403E3A)",
  },
  faqAnswer: {
    fontSize: "0.95rem",
    color: "var(--color-text-dark, #403E3A)",
    opacity: 0.55,
    lineHeight: 1.8,
    paddingBottom: "1.4rem",
    margin: 0,
  },
}
