import Image from "next/image";
import Script from "next/script";
import { CountdownBar } from "./CountdownBar";

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
              <h1>If credit is holding you back, start here.</h1>
              <p className="hero-lede">
                Free homebuyer seminar. Every Saturday at 9:00 AM Texas time.
              </p>
              <a className="button-primary hero-button" href="#reserve">
                Reserve your seat
              </a>
            </div>
          </div>
        </section>

        <section className="form-section" id="reserve">
          <div className="form-frame">
            <iframe
              src="https://api.leadconnectorhq.com/widget/form/PtCfZsLXw8OTs4eKd7TN"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                borderRadius: "0",
                boxShadow: "none",
                background: "transparent",
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
      </main>
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
    </>
  );
}
