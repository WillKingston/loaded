import Image from "next/image";
import Script from "next/script";
import { CountdownBar } from "./CountdownBar";

const learnItems = [
  "Understand financing and loan types in plain language",
  "Navigate credit scores, credit repair, and income prep",
  "Choose the right agent and lender before you start shopping",
  "Avoid common first-time buyer mistakes that cost time and money",
  "Find the right home for your lifestyle and monthly payment",
];

const readinessSteps = [
  {
    title: "Credit repair clarity",
    text: "Know what lenders look at, what can slow an approval, and which credit moves matter before you apply.",
  },
  {
    title: "Pre-approval path",
    text: "See how loan options, income, savings, and payment targets connect so you can move with a real plan.",
  },
  {
    title: "Next-step handoff",
    text: "Leave with practical buyer steps, trusted local guidance, and options whether you are ready now or a year out.",
  },
];

export default function Home() {
  return (
    <>
      <CountdownBar />
      <main>
        <header className="site-header">
          <a className="brand" href="#top" aria-label="Loaded Realty Group home">
            <Image
              src="/loaded-logo.png"
              alt="Loaded Realty Group"
              width={500}
              height={500}
              priority
              unoptimized
            />
          </a>
        </header>

        <section className="hero" id="top">
          <div className="funnel-shell">
            <div className="hero-primary">
              <p className="eyebrow">Free Saturday seminar for Texas homebuyers</p>
              <h1>Fix the credit questions before you start house hunting.</h1>
              <p className="hero-lede">
                Loaded Realty Group walks you through credit repair, financing,
                pre-approval, and the first steps to becoming a confident
                homebuyer.
              </p>
              <div className="hero-reserve-card">
                <p>Next session: Saturday at 9:00 AM Texas time</p>
                <a className="button-primary" href="#reserve">
                  Reserve your seat
                </a>
              </div>
              <div className="event-strip" aria-label="Event details">
                <span>Every Saturday</span>
                <span>9:00 AM CT</span>
                <span>Free seminar</span>
              </div>
            </div>

            <aside className="hero-support" aria-labelledby="start-here-title">
              <p className="eyebrow">Built for first-time buyers</p>
              <h2 id="start-here-title">
                If credit is the piece holding you back, start here.
              </h2>
              <div className="hero-learn-list">
                {learnItems.map((item) => (
                  <article className="learn-card" key={item}>
                    <span aria-hidden="true" />
                    <p>{item}</p>
                  </article>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="form-section" id="reserve">
          <div className="form-copy">
            <p className="eyebrow">Seats are limited</p>
            <h2>Reserve your spot for the next Saturday session.</h2>
            <p>
              Tell us where you are in the buying process and whether credit
              repair, down payment assistance, or pre-approval is your next
              priority.
            </p>
          </div>
          <div className="form-frame">
            <iframe
              src="https://api.leadconnectorhq.com/widget/form/PtCfZsLXw8OTs4eKd7TN"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                borderRadius: "3px",
              }}
              id="inline-PtCfZsLXw8OTs4eKd7TN"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="The Home Stretch Form"
              data-height="1420"
              data-layout-iframe-id="inline-PtCfZsLXw8OTs4eKd7TN"
              data-form-id="PtCfZsLXw8OTs4eKd7TN"
              title="The Home Stretch Form"
            />
          </div>
          <p className="form-fallback">
            Form not appearing?{" "}
            <a
              href="https://api.leadconnectorhq.com/widget/form/PtCfZsLXw8OTs4eKd7TN"
              target="_blank"
              rel="noreferrer"
            >
              Open the secure form
            </a>
            .
          </p>
        </section>

        <section className="section readiness-section">
          <div className="readiness-copy">
            <p className="eyebrow">What happens inside the seminar</p>
            <h2>Walk in unsure. Walk out with a cleaner buyer plan.</h2>
            <p>
              Whether you are a year out or ready now, you will learn how credit,
              income, lender expectations, down payment assistance, and agent
              guidance work together before you start touring homes.
            </p>
          </div>
          <div className="readiness-list">
            {readinessSteps.map((step, index) => (
              <article className="readiness-item" key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
    </>
  );
}
