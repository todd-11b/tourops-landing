# TourOps homepage concept comparison — November 2026

Keep the live landing page's missed-booking story, founder proof, calculator, plan structure, and application path.
Drop Concept A as a source for this release: its page is only a placeholder.
Use Concept B's conversational command idea as future product-design research, not as current website copy.
The live page's $297/$497/$997 plans and $497 booking add-on match the positioning document.
Correct the live guarantee wording before promising a blanket refund: the approved promise covers the onboarding fee after full implementation.

## Evidence and limits

Compared `tourops-landing/index.html` on `main`, `tourops-concept-a/index.html` and `README.md` on `main`, `tourops-concept-b/README.md` and `IMPLEMENTATION.md` on `main`, and `barleybus-tourops/active/platform/business/tourops_tiers_and_positioning.md` (sections 3, 4 and 7). This is a source comparison only; no site or provider change was made. Concept A has a 193-byte HTML page containing `<p>placeholder</p>` and no usable sections. Concept B has no `index.html`; its implementation note describes a product interaction.

## Section decisions

| Section | Decision | Reason |
|---|---|---|
| Hero and founder story | Keep from landing | “Never Miss Another Booking Inquiry” and Todd's $47,000 story match the positioning document's one-liner and founder hook. Neither concept has replacement copy. |
| Missed-booking calculator | Keep from landing | The positioning document explicitly calls for a loss calculator using the operator's own numbers. |
| Hiring comparison | Keep from landing | The positioning document compares the $297 tier with a $1,560/month part-time booking assistant. |
| Product demonstration | Keep from landing | The live page offers a voice demo. Concept B's command surface is an idea for the operator product, with substantial build requirements rather than a working website section. |
| Feature explanation | Keep from landing | Calls, messages, unified inbox, follow-up, calendar booking and reporting align with the tier definitions. Review the strength of “every” and “all” claims against actual supported channels before release of new copy. |
| Three-step setup | Keep from landing | It supports the implementation-first positioning. |
| “Cancel the rest” | Drop or narrow in a future copy change | The same page says TourOps works alongside existing booking systems. The positioning document describes booking integration, so a blanket replacement claim is broader than its product promise. |
| Tier cards | Keep from landing, with copy corrections below | The three prices and usage limits match the positioning document; the cards are more concrete than either concept. |
| Booking Engine add-on | Keep from landing | The separate $497/month add-on matches the positioning document and is clearly distinguished from the tiers. |
| Application and FAQ | Keep from landing, with guarantee correction below | The founding-operator limit and $497 onboarding price match the positioning document. |
| Concept A visual design | Drop | Only a bare placeholder exists in the checked source. |
| Concept B command surface | Preserve as product research only | It proposes one conversational work surface with evidence and prepared actions. The note calls for an intent router, business brief compiler and authority gate; none are implemented in the concept repository. |

## Pricing and feature-copy check

- **Matches:** Launch $297/month, Growth $497/month, AI OS $997/month; Booking Engine +$497/month; founding onboarding $497 rather than standard $997; tier usage limits of 300/500/2,500, 1,000/2,000/10,000 and unlimited. These appear in the live tier cards and positioning document §§3–4, 7.
- **Guarantee mismatch:** The live FAQ says “If within 30 days of go-live it’s not a fit, I refund your onboarding fee. No questions asked.” The positioning document §7 says the refund applies to the onboarding fee after full implementation and within 30 days of go-live. The live pricing area also says “30-day money-back guarantee,” which could be read as covering subscription fees. Use the exact scoped guarantee language in §7 before approving new site copy.
- **Potential overclaim:** The live “Cancel the rest” section says TourOps replaces 5–10 tools. Growth's booking feature is an integration with existing booking systems, and the booking engine is a separate add-on (§§3–4). Specify which tools can actually be removed for each tier.
- **No pricing comparison possible for Concepts A/B:** Neither checked source contains tier prices, offer copy or an implemented pricing section.

## Recommendation

Keep the current landing page as the website baseline. Make a separate, reviewed copy change for the guarantee and replacement claims. Revisit Concept B when the conversational product surface is implemented and can be demonstrated truthfully; Concept A contributes no current design or messaging asset.
