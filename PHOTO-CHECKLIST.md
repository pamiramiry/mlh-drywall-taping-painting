# Photo Checklist — MLH Drywall Taping Painting Website

The hero and About section currently show temporary generic stock photos (not this crew's actual job sites) so the site doesn't look unfinished while real photos are gathered:
- `assets/img/hero-drywall.jpg` — a contractor taping/mudding a ceiling seam, by Minnesota National Guard (Flickr, CC BY 2.0)
- `assets/img/about-painting.jpg` — a tray of painting brushes, roller, and sponge, by Keith Williamson (Flickr, CC BY 2.0)
- `assets/img/og-image.jpg` — reuses the hero photo above as the social-share image

Both source photos are free-to-use stock, credited in the site footer as required by their license. **Replace all three with real photos of MLH Drywall Taping Painting Inc job sites and crew as soon as possible** — real before/after shots of actual Scarborough jobs will always convert better than any stock photo, however good.

Save each finished photo into `assets/img/` using the same filenames below so no HTML changes are needed — just drop the new file in.

| # | Current file | Where it appears | What to shoot | Size | Alt text to use |
|---|---|---|---|---|---|
| 1 | `hero-drywall.jpg` | Hero, top of page | A crew member mid-taping or mid-mudding a wall/ceiling seam, or a striking before/after of a finished room. Bright, even lighting. | 1600×1000 (landscape) | "Drywall taping in a Scarborough home by MLH Drywall Taping Painting Inc" |
| 2 | `about-painting.jpg` | About section | A crew member painting or finishing drywall on an actual job site, hands-on close-up shot | 1000×1200 (portrait) | "MLH Drywall Taping Painting Inc crew finishing an interior wall" |
| 3 | `og-image.jpg` | Social share preview (Open Graph/Twitter) | A clean, branded wide shot — finished room or logo overlay works well | 1200×630 (landscape) | n/a (not rendered on-page) |

When you swap any file in, also update its `alt` attribute in `index.html` to match the new photo (search for the current alt text listed above) and remove the corresponding photo-credit link in the footer (`.photo-credits` paragraph) since it will no longer apply.

Optional additions if more photos become available later (not wired into the current layout, but worth capturing):
- Before/after pairs for popcorn ceiling removal and basement finishing (great for future gallery/social use)
- Close-up of a freshly taped seam under raking light (demonstrates finish quality)
- Crew/van with signage, for local trust-building (800×600)

Compress all photos to WebP or optimized JPEG before adding them, and keep file sizes under ~200KB each so the site stays fast on mobile. (The current stand-in photos are already 146KB and 175KB, both under the target.)
