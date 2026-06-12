# SpaceX Homepage Replica

A static HTML/CSS/JS recreation of the [spacex.com](https://www.spacex.com/) homepage, built for educational purposes.

## Structure

```
index.html          Page markup — 6 fullscreen tiles + nav + footer
css/styles.css      All styling (D-DIN typography, tile layout, gradients, responsive)
js/main.js          Nav scroll state, mobile menu, responsive video sources, scroll reveal
assets/fonts/       D-DIN / D-DIN-Bold webfonts (SIL Open Font License)
```

## Sections

1. **Starship's Twelfth Flight Test** — hero video, bottom-left content
2. **Making Life Multiplanetary** — Mars rotation video, left-middle content
3. **Revolutionizing Space Technology** — Super Heavy booster catch photo, right-top content
4. **World's Leading Launch Service Provider** — Falcon Heavy landing video, left-top content
5. **Advancing Human Spaceflight** — Dragon astronaut photo, right-top content
6. **Delivering High-Speed Internet From Space** — Starlink deploy video, left-middle content

Background videos and photos are streamed from SpaceX's public CDN, with separate
desktop/mobile encodes swapped by `js/main.js` at the 600px breakpoint — the same
behavior as the live site. Content alignment and gradient direction per tile follow
the live site's homepage configuration.

## Run

Open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

then visit <http://localhost:8000>.

## Disclaimer

This project is a non-commercial, educational UI replica. All videos, photos, and
trademarks belong to Space Exploration Technologies Corp. (SpaceX).
