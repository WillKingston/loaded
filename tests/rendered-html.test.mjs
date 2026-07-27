import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("keeps the Loaded Realty landing page deploy assets wired", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const layout = await readFile(
    new URL("../app/layout.tsx", import.meta.url),
    "utf8",
  );

  assert.match(layout, /Free Homebuyer Credit Readiness Seminar/);
  assert.match(page, /Every Saturday at 9:00 AM Texas time/);
  assert.match(page, /\/hero-family\.jpeg/);
  assert.match(page, /The Home Stretch Form/);
  assert.match(
    page,
    /https:\/\/api\.leadconnectorhq\.com\/widget\/form\/PtCfZsLXw8OTs4eKd7TN/,
  );
  assert.match(page, /https:\/\/link\.msgsndr\.com\/js\/form_embed\.js/);
  assert.doesNotMatch(
    page,
    /codex-preview|react-loading-skeleton|Your site is taking shape|Form not appearing/,
  );
});
