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

## Worth doing, needs facts only the owner has

**~~Add `sameAs` to the homepage schema.~~ Done 19 Aug** using the owner's GBP share
link. Still worth adding if they exist: Facebook, Instagram and HomeStars profile
URLs, and a `maps.app.goo.gl` link from the Maps app Share button, which is a more
stable form than the `share.google` one currently in the markup.

**Lower priority:** the photos are named `image1.webp` through `image21.webp`.
Descriptive filenames are a mild signal for Google Images. Real but small, and it
invalidates the year-long immutable cache on every one of them, so it is not worth
a round trip on its own.

## The biggest lever is not the website

For local trades, most calls come from the **Google Map Pack**, not the organic
listings underneath it. The site supports the profile; it rarely outranks it.
This section needs owner access, and it outweighs everything above.

### Google Business Profile
1. **Reviews are the single biggest factor.** 9 reviews against competitors with
   dozens is the gap that matters most. Build a routine: ask every satisfied
   customer at handover, with a short link ready to send by text.
2. **Primary category** should be `Drywall Contractor`. Add secondary categories for
   Painter, Tile Contractor, Flooring Contractor, General Contractor.
3. **Services list**: add all nine, using the same names as the website.
4. **Photos**: 21 real job-site photos are already on the site and are a genuine
   asset. Upload them to the profile too, and keep adding new ones. Profiles with
   recent photos get more engagement.
5. **Posts**: a short update every week or two, ideally a recent job with a photo.
6. **Q&A**: seed it with the questions now answered on the service pages.
7. **Service area**: match what the site claims, so the two do not disagree.

### Directories and citations
Two of the results outranking MLH for "drywall contractor Scarborough" are
directories, not contractors. Being listed there puts MLH in front of the same
searchers:

- HomeStars (dominant for GTA trades)
- RenoQuotes
- Yelp
- Bing Places
- Apple Business Connect
- Yellow Pages

Use **identical** name, address and phone everywhere: `MLH Drywall Taping Painting Inc`,
`567 Scarborough Golf Club Rd`, `(647) 531-8731`. Inconsistency across listings is a
known local-ranking problem.

### Search Console
Confirm `www.mlhrenovations.ca` is added and the sitemap submitted, then watch the
**Pages** report for "Duplicate, Google chose a different canonical". Given the
canonicals pointed at a nonexistent domain from day one, that report tells you
whether the site was ever properly indexed.

## The next website decision, when you want it

**City x service landing pages.** Every competitor currently outranking MLH uses this
exact URL pattern:

- `konstruction.ca/services/drywall-contractor-scarborough`
- `torontodrywallpro.ca/service-areas/scarborough/`
- `ontariodrywallandtaping.ca/drywall-contractors-scarborough/`
- `drywalltoronto.com/drywall-contractors-scarborough/`

MLH has none, and no Toronto presence in any H1. This is the largest remaining
on-site opportunity. It only works if each page carries genuinely distinct content;
find-and-replacing a city name across nine templates is the version that gets
ignored or penalised. Start with Toronto and the two or three strongest services.

## Still outstanding elsewhere

- Photos for drywall-installation, drywall-repair and popcorn-ceiling-removal, which
  still show a "coming soon" message. More flooring photos too, given flooring is
  producing the only buyer-intent query.
- The quote form is still `mailto:`, which silently loses anyone on webmail or
  without a configured mail app. It remains the largest lead-loss risk on the site,
  and it matters more the moment traffic actually arrives.
