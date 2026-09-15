# MLH SEO: where the wins actually are

Written 18 Aug 2026, off the first Search Console data.

## First, read the numbers correctly

| Metric | Value |
|---|---|
| Impressions | 90 |
| Clicks | 0 |
| Average position | 17.5 |
| Data window | 10-16 Aug 2026 |

**Zero clicks is the expected outcome here, not a warning sign.** At position 17.5
(bottom of page 2) the organic CTR curve predicts **0.4 to 1.3 clicks** from 90
impressions. Zero is the single most likely result. You would need somewhere north
of 1,000 impressions at this position before zero clicks said anything about the
pages themselves.

Two more things about that window: the dead-canonical fix only shipped on 12 Aug,
so most of this data reflects the broken site, and Google typically takes weeks to
recrawl and re-evaluate. Do not draw conclusions from it before mid-September.

**Do not judge this work on clicks yet.** The metric that will move first is average
position, then impressions, then clicks. If position drops from 17.5 toward 10 over
the next month, it is working, even while clicks are still zero.

## What the queries actually said

| Query | Impressions | Read |
|---|---|---|
| taping and plastering drywall | 8 | generic, informational, no buying intent |
| **floor installation scarborough** | 8 | **local + commercial, a real buyer** |
| drywall taping | 7 | generic |
| drywall | 5 | very broad |
| taping drywall | 4 | generic |
| drywall for basement | 4 | informational |

Five of six are people learning about drywall, not hiring anyone. Exactly one has
buying intent, and it is for **flooring**, pointing at what was the thinnest page on
the site.

## Done on the site (18 Aug)

- Every service page taken from ~350 words to **900-1,060**, matching what ranking
  competitors carry. New per-page explainers on genuinely searched topics: drywall
  finish levels 0-5, board types, paint sheens, laminate vs vinyl plank, shower
  waterproofing, diagnosing drywall damage, asbestos in older popcorn ceilings.
- **"Level 4 / Level 5 finish"** now covered. It had zero mentions and is both
  standard trade language and a real search term competitors advertise.
- 45 new FAQ answers (5 per service page) targeting long-tail question queries, with
  FAQPage schema. **Expectation to set:** Google removed FAQ rich results for most
  commercial sites in 2023, so do not expect the dropdown look in search results.
  The value here is the content depth and the long-tail coverage, not the snippet.
- Homepage title now targets **Toronto** as well as Scarborough. Toronto previously
  appeared in zero titles and zero H1s despite being the larger market.

## Done on the site (18 Aug, second pass)

The first pass added depth. This one fixed how that depth is connected and found a
UX bug hiding inside it.

- **Contextual internal links, 2 -> 26.** Every internal link on the site was nav,
  footer, breadcrumb, or a "Learn More" card, so roughly 40 links pointed at each
  page and not one of them described what was on the other end. Anchor text is a
  direct relevance signal and all of it was being spent on the words "Learn More".
  The service pages already named each other in prose; those mentions are now links.
- **Prose links were invisible.** The base rule is `a { color: inherit;
  text-decoration: none }` so that nav and buttons can style themselves, which meant
  the two in-body links that already existed rendered as plain text. Nobody could
  click what they could not see. Prose containers now style their links explicitly
  (blue, underlined, 6.96:1 on white and 6.43:1 on grey, both past AA).
- **Gallery rebuilt.** It was the second most-linked page on the site, 330 words,
  21 photos in one undifferentiated grid, and exactly one outbound link. It is now
  four trade-grouped sections with headings, real context, jump links, and links
  through to the matching service pages: 638 words and 9 outbound links.
- **Toronto in the homepage H1.** The title tag started targeting Toronto last pass
  but the H1 still said Scarborough only. A title that disagrees with its own H1 is
  more likely to be rewritten by Google.
- **Sitemap `lastmod` refreshed** to match the day the content actually changed.

## Done on the site (19 Aug, third pass)

Search Console for 10-17 Aug: **113 impressions, 1 click, average position 24.5**.

Read that correctly before reacting to it. At position 24.5 the CTR curve predicts
well under one click from 113 impressions, so 1 click is at or slightly above
expectation. Impressions roughly doubled across the window (12/day to 23/day) and
the first click landed 17 Aug, on the highest-impression day. Position looking worse
than the 17.5 logged on 18 Aug is also expected: the second pass made nine pages
rank for many more queries, and new long-tail queries enter low and drag the average
down. Impressions up while average position falls is the normal shape of a site
expanding its query footprint.

The query data said two things. Local buying-intent searches are appearing
("floor installation scarborough" 10, "drywall repair scarborough" 6, "drywall
contractors in scarborough" 2) but so is a lot of generic informational search
("mudding drywall", "drywall mud fast drying", "sanding painted drywall") that will
never hire a Scarborough contractor. And the homepage took 86 of 113 impressions,
absorbing queries the service pages were written for.

- **Service area trimmed to the winnable ring.** The site claimed Oshawa,
  Mississauga, Brampton, Vaughan, Barrie and Hamilton: roughly 40 to 110km out, with
  no page, photo or job behind any of them. Local ranking decays sharply with
  distance from the verified address, and a broad claim that nothing supports
  dilutes rather than extends reach. Now Scarborough, Toronto, North York, East
  York, Markham, Pickering and Ajax, so the site, the schema and the GBP service
  area can all agree.
- **Five location pages built**, the largest gap flagged in the last pass:
  `/service-areas` plus `/drywall-contractor-toronto`, `-north-york`, `-markham`
  and `-pickering-ajax`. 839 to 1,303 words each. Scarborough deliberately gets no
  page, because the homepage and the nine service pages already target it and a
  tenth would compete with them.
- **Those pages are genuinely distinct, and that was measured, not assumed.**
  Pairwise body-text similarity runs 0.02 to 0.07. Each leads on a different angle
  drawn from the actual housing: Toronto on condo logistics (insurance certificates,
  service elevator windows, 8ft board and the extra butt joints it forces) and
  plaster-over-lath in pre-war houses; North York on stipple ceilings and bungalow
  basement headroom; Markham on critical lighting, Level 4 vs Level 5 and settlement
  nail pops; Pickering and Ajax on two housing eras side by side.
- **`sameAs` and a Knowledge Graph identifier added** to the homepage schema, from
  the owner's GBP share link (resolves to `kg:/g/11zfmx934w`). This matters more
  here than on a normal site because the domain and the legal name disagree.
- **Generic H2s replaced on all nine service pages.** Every one read "What's
  included" and "How we do it", spending a heading signal on nothing. Now
  "What's Included in Our Drywall Repair Service", "How We Repair and Patch
  Drywall", and so on.
- **Homepage service blurbs cut roughly in half** (36-52 words down to 15-25) so the
  detail lives on the service pages rather than competing with them from the
  homepage.
- Sitemap now lists 16 URLs. Nav, mobile menu and footer carry Service Areas.

### Deliberately not done

**No guide content for the informational queries.** "Mudding drywall" and
"drywall mud fast drying" would be easy impressions, but that audience is national
and does not hire a Scarborough contractor. It would raise impressions without
raising calls, which flatters the dashboard and does nothing for the phone. Worth
revisiting only after the local pages settle.

**Homepage title and H1 left alone.** They only started targeting Toronto on 18 Aug
and Google has not settled on them. Once `/drywall-contractor-toronto` has been
indexed a few weeks, check whether the two compete on Toronto queries, and only then
consider narrowing the homepage back to Scarborough.

## Found during this pass, not fixed

**The primary CTA on every sub-page hero is invisible as a button.**
`.btn-blue` is `background: var(--blue-900)` and `.page-hero` is
`background: var(--blue-900)`: the same `#1B3A5C`. So "Get a Free Quote" renders as
plain white text while the secondary "Call" button beside it has a visible outline.
The primary action looks less clickable than the secondary one, on all nine service
pages, the gallery and the five new location pages. The text is legible, so this is
a de-emphasis bug rather than an invisibility one, but it works against exactly the
conversions this SEO work is meant to produce. Fix is a scoped override on
`.page-hero__actions .btn-blue`. Left alone because this round was scoped to SEO.

**Fixed 19 Aug** in the same commit as the location pages, at the owner's go-ahead:
the primary CTA is now solid white on the navy hero, with the focus ring overridden
to white so it is actually visible to keyboard users. Went live 30 Aug.

## Done on the site (30 Aug, fourth pass)

**Everything from the third pass finally went live.** The 19 Aug work was committed
but never pushed, so for eleven days production kept serving the 18 Aug build: an
11-URL sitemap, no location pages, no Service Areas footer column. Pushed 30 Aug and
verified live. Worth stating plainly because it is the single largest thing that
happened this round: none of the previous pass could rank while it sat unpushed.

**Built `/about` and `/contact` as real, indexable pages.** They were homepage anchors
(`/#about`, `/#contact`), which meant the two pages every local searcher looks for
had no URL, no title, and no ability to rank. A dedicated contact page carrying the
full NAP, hours, map and service area is a standard local-SEO asset, and "about"
queries are how people check a contractor is real before calling.

The homepage keeps both sections, so the one-page flow is untouched: the new pages
are additions, not replacements. Homepage nav still scrolls to its own sections; the
other 17 pages now point at the real URLs, and the homepage links to both from body
copy so they inherit equity from the strongest page.

Both pages carry `ContactPage` / `AboutPage` schema referencing the existing business
node, plus breadcrumbs. The about page makes **no new claims**: every statement on it
already appeared elsewhere on the site. No invented credentials, team size or job
counts.

**Wiring**, since the location pages taught us that unlinked pages do not get crawled:
`/contact` now has 103 inbound internal links and `/about` 53. Sitemap 16 to 18 URLs.

Verified: 19 files, 0 problems on the full sweep (JSON-LD parses, single H1, no
heading jumps, canonicals correct, no duplicate titles or descriptions, no broken
internal links, no missing assets, all `styles.css?v=8`). Rendered both pages at
1440/1024/390 with no console errors, no horizontal overflow, form validation firing
and the hours table highlighting the correct day.

## Done on the site (9 Sep 2026, fifth pass)

**`/basement-finishing` repositioned from a drywall stage to a renovation.** The page sold
"Basement Drywall Finishing": that phrase was in the title, the H1, the schema, the nav
label and the homepage card. It capped the page at drywall-shaped queries while the
business does the whole finish. The two searches worth having, **"basement finishing
Scarborough"** and **"basement renovation Scarborough"**, were not phrases the page
contained anywhere. "Drywall for basement" had already shown up in the query data, so the
topic has demand and the page was under-serving it.

New title, description, H1, OG/Twitter pairs, `Service` schema (`name` and `serviceType`
now say Renovation) and `BreadcrumbList`. The URL is unchanged: `/basement-finishing`
keeps whatever equity it has.

**Three sections the page did not have**, all answering questions people actually type
before hiring:

- **Permits and inspections.** Scarborough is inside the City of Toronto, so the permit
  comes from the City, and separate suites carry egress, fire separation and ceiling
  height requirements on top. Deliberately general: no code sections, no fee figures, no
  legal claims, and it states plainly that the homeowner pulls the permit unless agreed
  otherwise.
- **How long it takes.** Three to six weeks for a typical 800 sq ft basement, with the
  rough-ins and the inspection schedule named as what actually moves it.
- **What it costs.** Three-row range table: drywall-only, full finish, full finish with a
  bathroom, plus the four things that push a job to the top of its range.

**The cost section publishes no dollar figures, and that is the settled answer, not a gap.**
It first shipped with six `[[PLACEHOLDER]]` tokens waiting on ranges from the owner. The
owner cannot supply them, so on 15 Sep the price table was replaced with a **scope
comparison**: the same three tiers, each describing what is in it and why it costs more
than the one above, built on the existing `.spec-list` component. Nothing was invented and
nothing is pending.

Three things about that, because the reasoning is easy to lose:

- **The section stays even without numbers.** "How much does it cost to finish a basement
  in Scarborough" is one of the highest-intent queries this page can own. A section that
  answers the real question (what am I paying for, what makes it more) ranks and converts;
  deleting it would forfeit the query outright.
- **Do not re-add a price table later** on the assumption the numbers were simply forgotten.
  They were asked for and are not available.
- **Do not fill it with third-party GTA averages.** Publishing someone else's figures as if
  they described MLH's pricing misrepresents the business, and it is worse than no numbers
  because it reads as authoritative.

**Label renamed site-wide**, "Basement Drywall Finishing" to "Basement Finishing", across
the nav dropdown, mobile menu, related-service cards, both quote-form dropdowns and the
homepage `Offer` schema, on all 20 pages. Only the footer had said it correctly. The ~26
prose links across the site already used "basement finishing" as anchor text, so this
brings the nav into line with them rather than the reverse. Homepage card blurb now says
"full basement renovation".

**A prose-link visibility bug, found while doing it.** The 18 Aug pass named the prose
containers that need explicit link styling, because the base rule is `a { color: inherit;
text-decoration: none }`. `.check-list` was not on that list. The new "What's included"
list links each stage to its service page, and every one of those links would have
rendered as plain black text: invisible, unclickable-looking, and the anchor text wasted.
`.check-list span a` is now in the selector group. This is the same class of bug the
second pass fixed for `.page-copy`, and it is worth checking whenever links are added to
a component that has never carried one.

**`styles.css?v=9` to `?v=10` on all 20 pages**, since the stylesheet changed and the
cache is long-lived. Sitemap `lastmod` bumped for `/` and `/basement-finishing` only; the
other 18 pages changed by one nav label and are not worth re-signalling.

Page is 1,050 to 1,200 words with "Scarborough" appearing six times in the body, which is
in line with the other service pages rather than stuffed.

### Deliberately not done

**The "What Makes a Basement Different" explainer was removed, not kept.** Its five points
had become duplicates once the page had real sections: moisture is now FAQ 4, material
choice is two items in the What's Included list, ceiling height is in both the permits and
the cost sections, and egress is covered properly under permits instead of in a one-line
gloss. Keeping it would have pushed the page past 1,400 words by repeating itself, which
is the kind of padding that reads as written-for-Google.

## Worth doing, needs facts only the owner has

**~~Add `sameAs` to the homepage schema.~~ Done 19 Aug** using the owner's GBP share
link. Still worth adding if they exist: Facebook, Instagram and HomeStars profile
URLs, and a `maps.app.goo.gl` link from the Maps app Share button, which is a more
stable form than the `share.google` one currently in the markup.

**Lower priority:** the photos are named `image1.webp` through `image21.webp`.
Descriptive filenames are a mild signal for Google Images. Real but small, and it
invalidates the year-long immutable cache on every one of them, so it is not worth
a round trip on its own.

---

# The off-site playbook

Everything above is on-site work, and on-site is now in good shape. This section is
not. **It is where the remaining ranking is**, and almost all of it needs the owner,
not the developer.

The honest picture as of 30 Aug: searching the open web for this business returns
**nothing**. No HomeStars, no Yelp, no YellowPages, no 411, no Facebook. The only
"MLH Renovations" that surfaces is an unrelated company in Brier, Washington. For a
local trade that is a serious gap, because most calls come from the **Google Map
Pack**, not the organic listings under it, and the Map Pack runs on profile signals,
reviews and citations rather than on page content.

## Step 0: the NAP block

Every listing below must use these three lines **character for character**. Google
cross-references business details across the web, and inconsistent formatting
("Rd" vs "Road", "647-531-8731" vs "(647) 531-8731") weakens the match. Copy and
paste, do not retype:

```
MLH Drywall Taping Painting Inc
567 Scarborough Golf Club Rd, Scarborough, ON M1G 1H5
(647) 531-8731
https://www.mlhrenovations.ca/
```

This matches the site's schema and footer exactly. If any listing already exists with
a different format, fix the listing rather than the site.

## Step 1: Google Business Profile

This outranks every other item in this document.

**Reviews are the single biggest factor.** MLH has 9. Competitors have dozens. This
one number probably explains more of the ranking gap than everything else combined,
and it is the only item here with no shortcut.

Build it into the job rather than doing it in bursts. At handover, while the customer
is still standing in the finished room, ask in person and then send the link. Asking
by text hours later converts far worse than asking to their face and then following
up with the link you already have open.

A message that works, kept short because long ones do not get read:

> Thanks again for having us in, [name]. If the walls turned out how you hoped,
> a quick Google review really helps a small business like ours get found:
> [review link]. No worries at all if you'd rather not.

Get the short link from the profile's **Ask for reviews** button. Reply to every
review, positive or negative, ideally within a day. Replies are visible to searchers
and are a documented engagement signal.

**Primary category:** `Drywall Contractor`. This matters more than most owners expect,
because the primary category does most of the work in deciding which searches the
profile can appear for at all.

**Secondary categories:** Painter, Tile Contractor, Flooring Contractor,
General Contractor.

**Service area:** set it to the same ring the site claims, and no wider. Scarborough,
Toronto, North York, East York, Markham, Pickering, Ajax. Claiming the entire GTA
looks stronger and performs worse: it dilutes relevance for the places jobs actually
come from, and the site and profile then disagree, which helps neither.

**Services:** add all nine using the exact names below, and paste the descriptions
straight in. These are drawn from the site's own service pages so the wording stays
consistent between profile and site:

- **Framing**: New partition walls, bulkheads and ceilings framed straight, square
  and on-layout, ready for board.
- **Drywall Installation**: Board hung plumb and square with tight, staggered joints,
  prepped so the taping stage can reach a flawless finish.
- **Taping & Mudding**: Multiple coats of tape and compound, sanded and inspected
  under raking light so seams disappear completely.
- **Drywall Repair & Patching**: Holes, cracks, nail pops and water damage repaired
  and blended so the patch does not show once the wall is painted.
- **Popcorn Ceiling Removal**: Textured stipple ceilings taken back to a flat, modern
  finish, with the room protected and the ceiling refinished properly afterwards.
- **Interior & Exterior Painting**: Surfaces properly prepped, filled and primed,
  with clean cut lines and even coverage inside and out.
- **Tiling**: Backsplash, shower and floor tile set on a flat, prepared substrate
  with straight, consistent grout lines.
- **Flooring**: Laminate and vinyl plank installed over a checked and levelled
  subfloor, with the right underlay for the space.
- **Basement Finishing**: Unfinished basements turned into livable square
  footage: framing, board, tape, paint, tile and floor, finished as one job.

**Photos:** 21 real job-site photos are already on the site. Upload them to the
profile as well, and add new ones as jobs finish. Profiles with recent photos get
measurably more engagement, and photo recency is something Google can see.

**Posts:** a short update every week or two, ideally one recent job with a photo.

**Q&A:** seed it. The service pages now answer roughly forty real questions between
them, and the FAQ answers can be pasted straight in. A profile with answered
questions converts better than an empty one, and you control the framing.

## Step 2: citations, in this order

Do them in this order. The first three are free, fast, and feed each other.

1. **Bing Places**: imports directly from Google Business Profile, so it is close to
   a one-click listing. Bing also feeds business data to other services.
2. **Bing Webmaster Tools**: imports directly from Search Console. Submit the
   sitemap while there. Bing traffic is small but the setup cost is minutes.
3. **Apple Business Connect**: free, and it is what Apple Maps and Siri use. Anyone
   on an iPhone asking for a drywall contractor nearby is querying this, not Google.
4. **HomeStars**: the dominant directory for GTA trades, and one of the results
   currently outranking MLH. Being listed there puts MLH in front of the same
   searchers who are already finding competitors that way.
5. **Houzz**: note that an unrelated "MLH Renovations" already exists there in
   Washington state. Make the Scarborough location prominent so the two do not blur.
6. **Yelp**: lower value in Canada than the US, still a recognised citation source.
7. **YellowPages.ca** and **411.ca**: straightforward Canadian citations.
8. **Facebook Page**: worth having for the citation alone, even without posting much.

Each of these, once live, becomes a `sameAs` URL for the homepage schema. Send them
over as they go up and they get added.

## Step 3: Search Console, right now

Two things to do the moment the deploy lands, both of which the owner or whoever has
access needs to do:

1. **Sitemaps → resubmit `sitemap.xml`.** It now lists 18 URLs; Google last saw 11.
2. **URL Inspection → Request indexing** on each new URL, one at a time:
   `/service-areas`, `/drywall-contractor-toronto`, `/drywall-contractor-north-york`,
   `/drywall-contractor-markham`, `/drywall-contractor-pickering-ajax`, `/about`,
   `/contact`, and the homepage.

Then watch the **Pages** report for "Duplicate, Google chose a different canonical".
Given the canonicals pointed at a nonexistent domain from day one, that report is
what tells you whether the site was ever properly indexed.

## What to watch, and what not to panic about

**Expect average position to get worse before it gets better.** Seven new pages will
start ranking for many new queries, and new long-tail queries enter low and drag the
average down. Impressions rising while average position falls is the normal shape of
a site expanding its query footprint, not a problem to fix.

**Do watch for cannibalization.** The homepage title targets "Drywall Contractor
Scarborough & Toronto" and `/drywall-contractor-toronto` targets "Drywall Contractor
in Toronto". Those genuinely compete. Leave it for now, since the Toronto page has
not been indexed long enough for Google to settle. In a few weeks, check the GSC
query report: if the two pages keep swapping places on Toronto queries, narrow the
homepage back to Scarborough and let the Toronto page own that term.

**Give it time.** New pages typically take weeks to settle, and a domain this young
has little authority to push them up quickly. The off-site work above is what
shortens that curve.

## Still outstanding elsewhere

- Photos for drywall-installation, drywall-repair and popcorn-ceiling-removal, which
  still show a "coming soon" message. More flooring photos too, given flooring is
  producing the only buyer-intent query.
- The quote form is still `mailto:`, which silently loses anyone on webmail or
  without a configured mail app. It remains the largest lead-loss risk on the site,
  and it now matters on two pages rather than one. It matters more the moment the
  traffic this work is chasing actually arrives.
- Social and directory URLs for `sameAs`, as they go live.
