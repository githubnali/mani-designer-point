# Assets

## Image pipeline

Source definitions live in `scripts/image-sources.json`. `npm run images` uses Sharp to:

1. Download each Pexels source (or read a file from `scripts/local-images/`).
2. Crop to the configured aspect ratio.
3. Write **AVIF** and **WebP** versions at **640px** and **1280px** wide into `public/images/`.
4. Emit an OG image at `public/images/og-image.jpg` (1200×630).

`src/data/images.ts` maps each image key to its base path, alt text and intrinsic dimensions.
`ResponsiveImage` builds a `<picture>` with AVIF, WebP and width descriptors. Hero images use
`priority`; everything below the fold is lazy-loaded.

**All photography is a placeholder.** Replace it with the studio’s own product and process photos
before launch, especially the acrylic product images, which are visually weak or misleading (plants,
glasses and generic props rather than acrylic pieces).

## Output files

For each key `example`, the pipeline writes:

```text
public/images/example-640.avif
public/images/example-640.webp
public/images/example-1280.avif
public/images/example-1280.webp
```

Plus `public/images/og-image.jpg`, `public/favicon.svg`, `public/favicon.ico`,
`public/apple-touch-icon.png` and `public/site.webmanifest`.

## Inventory

| Key | Source | Aspect |
| --- | --- | --- |
| hero-gift-box | Pexels #6832992 | 4:5 |
| acrylic-frame | Pexels #8015565 | 1:1 |
| acrylic-stand | Pexels #8015523 | 4:3 |
| acrylic-display | Pexels #10187118 | 4:3 |
| woodworking | Pexels #6790088 | 4:3 |
| wood-carving | Pexels #36492217 | 4:3 |
| wood-frames | Pexels #17345426 | 4:3 |
| gift-hand | Pexels #10205687 | 4:3 |
| gift-red-flatlay | Pexels #6478794 | 4:3 |
| printing-press | Pexels #6620972 | 4:3 |
| printing-cards | Pexels #5706020 | 4:3 |
| printing-screen | Pexels #1509308 | 4:3 |
| laser-machine | Pexels #7254467 | 4:3 |
| cnc-machine | Pexels #8956445 | 4:3 |
| engraving-hands | Pexels #4354564 | 4:3 |
| tumblers | Pexels #32176015 | 4:3 |
| notebook | Pexels #27837105 | 4:3 |
| pen | Pexels #1090680 | 4:3 |
| keychain | Pexels #16151365 | 4:3 |
| keys | Pexels #31424880 | 4:3 |
| desk-accessories | Pexels #28028334 | 4:3 |
| framed-portrait | Pexels #10252177 | 4:3 |
| mug | Pexels #9261414 | 4:3 |
| craft-workshop | Pexels #36388459 | 4:3 |
| craft-hands | Pexels #4690306 | 4:3 |
| bottles | Pexels #7690201 | 4:3 |
| magazine | Pexels #8084481 | 4:3 |
| wooden-clock | Generated local file (`scripts/local-images/wooden-clock.jpg`) | 4:3 |
| wooden-wall-art | Generated local file (`scripts/local-images/wooden-wall-art.jpg`) | 4:3 |
| desk-organizer | Generated local file (`scripts/local-images/desk-organizer.jpg`) | 4:3 |
| acrylic-trophy | Generated local file (`scripts/local-images/acrylic-trophy.jpg`) | 4:3 |

The four generated images were produced for this build as placeholders and should be replaced with
real product photography. The Pexels images are free-to-use stock photographs; confirm the current
Pexels licence and keep the source IDs above for attribution/replacement.

## Replacing an image

1. Add the new source file (or Pexels ID) to `scripts/image-sources.json`.
2. Run `npm run images`.
3. Update the matching entry in `src/data/images.ts` if the aspect ratio or alt text changes.
4. Run `npm run build` and `npm run test:responsive` to catch layout regressions.

Use a minimum of 1280px on the long edge. Prefer clean, well-lit photographs with room for text
overlays. Avoid images with visible third-party branding or unlicensed artwork.

## Recommended replacements

| Priority | Assets |
| --- | --- |
| High | Acrylic products (`acrylic-stand`, `acrylic-display`, `acrylic-frame`, `acrylic-trophy`), hero gift box, OG image |
| Medium | Corporate gifting (`bottles`, `tumblers`, `notebook`, `pen`, `keychain`, `keys`, `desk-accessories`) |
| Medium | Wooden products (`wooden-clock`, `wooden-wall-art`, `desk-organizer`, `wood-carving`, `wood-frames`) |
| Lower | Studio/process imagery (`craft-workshop`, `craft-hands`, `printing-*`, `laser-machine`, `cnc-machine`, `engraving-hands`) |

When real photography is available, update the alt text so it describes the actual product shown,
not the placeholder.
