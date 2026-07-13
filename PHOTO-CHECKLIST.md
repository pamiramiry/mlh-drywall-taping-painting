# Photo Checklist, MLH Drywall Taping Painting Website

The site now uses **21 real job-site photos** sent by the client (`assets/img/image1.webp` through `image21.webp`), replacing the original stock placeholders. This checklist tracks what's still needed rather than what's placeholder.

## Current photo assignments

Each photo lives on exactly one service page, no photo is reused across two different pages, so every page's gallery is genuinely distinct. (The homepage hero and `gallery.html` are the only intentional exceptions: `gallery.html` is a comprehensive index of all 21 photos by design, and the homepage hero photo is separate from any service page's gallery.)

| Service page | Photos used |
|---|---|
| Framing (`framing.html`) | image7 |
| Drywall Installation (`drywall-installation.html`) | **none, gap, see below** |
| Taping & Mudding (`taping-mudding.html`) | image2, image9, image10, image15 |
| Drywall Repair & Patching (`drywall-repair.html`) | **none, gap, see below** |
| Popcorn Ceiling Removal (`popcorn-ceiling-removal.html`) | **none, gap, see below** |
| Interior & Exterior Painting (`painting.html`) | image5, image11, image19 |
| Tiling (`tiling.html`) | image1, image3, image6, image12, image13, image16, image17, image21 |
| Flooring (`flooring.html`) | image20, **thin, only one photo, see below** |
| Basement Drywall Finishing (`basement-finishing.html`) | image4, image14 |
| Homepage hero | image8 |
| Homepage About section | image18 |
| `gallery.html` | All 21 photos shown in one flat grid, no filtering |

**Note:** `gallery.html` no longer has service filter buttons. They were tried, but with only 6 of the 9 services having real photos, showing filters for some services and not others looked inconsistent next to the 9-item Services menu. A flat grid of all 21 photos avoids that mismatch. If every service eventually has photos, filtering could be reintroduced.

## Gaps: ask the client for real photos of these

1. **Drywall Installation**: no dedicated photos. image7 (framing + board install) went to the Framing page instead, since it's a brand-new service that needed it more and the two pages showing the same photo looked like padding. Get a shot of drywall board being hung or screwed to studs.
2. **Drywall Repair & Patching**: no photos exist for this service. The page currently shows a "coming soon, call us" message instead of a gallery. Ideally get before/after shots of an actual repair (water damage, crack, or patch job).
3. **Popcorn Ceiling Removal**: same situation, no photos. Before, during, and after shots of a scrape-and-skim-coat job would be ideal.
4. **Flooring**: only one photo (image20, a finished basement floor). More flooring-specific shots (installation in progress, close-ups of the finished plank or laminate) would strengthen this page.

## Adding new photos later

Drop new files into `assets/img/`, then:
- Add an `<img>` tag to the relevant service page's `.grid-gallery` (copy the pattern of an existing `.gallery-item`)
- Add a matching `.gallery-item` entry to `gallery.html`'s flat grid
- If filling one of the 3 gaps above (Drywall Installation, Drywall Repair, Popcorn Ceiling Removal): remove the `<!-- TODO(client): ... -->` comment and the "coming soon" message on that service page, and replace it with a real `.grid-gallery`

## Image specs
Photos are `.webp`, ranging 54KB to 178KB, all within the ~200KB budget, so no further compression is needed. Always measure real pixel dimensions before writing `width`/`height` attributes (don't guess, this prevents layout shift):
```
python -c "from PIL import Image; print(Image.open('assets/img/FILENAME.webp').size)"
```
