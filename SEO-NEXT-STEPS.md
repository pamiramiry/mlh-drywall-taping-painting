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
