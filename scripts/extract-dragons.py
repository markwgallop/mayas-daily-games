#!/usr/bin/env python3
"""
Cut the 5x5 'Designs Available' sheet into one transparent PNG per character.

Kept in the repo so the assets can be regenerated if the sheet is ever replaced
or re-cropped. Needs Pillow and numpy.

    python3 scripts/extract-dragons.py <sheet.jpg> <output-dir>

Two things make this fiddlier than a plain grid crop:

  * Background removal has to flood in from the cell edges rather than keying on
    white, because Winter and Blaze are near-white dragons — keying on colour
    punches holes straight through them.
  * The header's black outline scallops down into the top row of cells, so row 0
    gets any component sitting entirely in its top strip removed.
"""
import sys
from PIL import Image, ImageDraw
import numpy as np

# Grid borders as detected on the 2000x2442 sheet, inset to clear the anti-aliasing.
ROWS = [(176, 600), (626, 1056), (1082, 1517), (1543, 1969), (1995, 2428)]
COLS = [(14, 388), (414, 788), (814, 1187), (1213, 1587), (1613, 1988)]
NAMES = [
    ['Glory', 'Tsunami', 'Clay', 'Sunny', 'Starflight'],
    ['Turtle', 'Kinkajou', 'Winter', 'Peril', 'Qibli'],
    ['Moonwatcher', 'Jambu', 'Tamarin', 'Blister', 'Blaze'],
    ['Burn', 'Darkstalker', 'Gill', 'Coral', 'Thorn'],
    ['Hawthorn', 'Sundew', 'WinterAlt', 'Cricket', 'Blue'],
]
LABEL_H = 62          # the character's name, printed under each picture

# The header's letter "g" descends into Tsunami's cell and physically overlaps her
# wing, so no amount of component logic separates them. Erase the letter and accept
# a small notch in the wing tip — far less obvious than a purple blob.
ERASE = {'Tsunami': (208, 0, 312, 54)}
MAGIC = (1, 254, 3)   # stand-in for "background", unlikely to occur in the art
MAX_EDGE = 400        # the build-up dragon renders ~150px, so this covers 2x


def border_seeds(cell):
    """Every near-white pixel on the cell edge; background always touches one."""
    w, h = cell.size
    px = cell.load()
    pts = []
    for x in range(0, w, 3):
        for y in (0, h - 1):
            if min(px[x, y]) >= 235:
                pts.append((x, y))
    for y in range(0, h, 3):
        for x in (0, w - 1):
            if min(px[x, y]) >= 235:
                pts.append((x, y))
    return pts


def drop_header_bleed(rgba):
    """Remove any blob living entirely in the top strip — that's the header, not a dragon."""
    w, h = rgba.size
    arr = np.asarray(rgba).copy()
    mask = Image.fromarray(np.where(arr[:, :, 3] > 0, 255, 0).astype(np.uint8), 'L')

    label = 1
    px = mask.load()
    for y in range(h):
        for x in range(w):
            if px[x, y] == 255 and label < 250:
                ImageDraw.floodfill(mask, (x, y), label, thresh=0)
                label += 1

    m = np.asarray(mask)
    for lab in range(1, label):
        ys, xs = np.where(m == lab)
        if len(ys) and ys.max() < h * 0.18:      # never reaches below the top strip
            arr[:, :, 3][m == lab] = 0
    return Image.fromarray(arr, 'RGBA')


def main(sheet_path, out_dir):
    sheet = Image.open(sheet_path).convert('RGB')
    for ri, (y0, y1) in enumerate(ROWS):
        for ci, (x0, x1) in enumerate(COLS):
            cell = sheet.crop((x0, y0, x1, y1 - LABEL_H)).copy()
            for s in border_seeds(cell):
                if cell.getpixel(s) != MAGIC:
                    ImageDraw.floodfill(cell, s, MAGIC, thresh=32)

            a = np.asarray(cell)
            bg = (a[:, :, 0] == MAGIC[0]) & (a[:, :, 1] == MAGIC[1]) & (a[:, :, 2] == MAGIC[2])
            out = Image.fromarray(np.dstack([a, np.where(bg, 0, 255).astype(np.uint8)]), 'RGBA')

            if ri == 0:
                out = drop_header_bleed(out)

            rect = ERASE.get(NAMES[ri][ci])
            if rect:
                a2 = np.asarray(out).copy()
                x_a, y_a, x_b, y_b = rect
                a2[y_a:y_b, x_a:x_b, 3] = 0
                out = Image.fromarray(a2, 'RGBA')

            box = out.getbbox()
            if box:
                out = out.crop(box)
            out.thumbnail((MAX_EDGE, MAX_EDGE), Image.LANCZOS)
            # WebP with alpha is about a fifth the size of PNG here, and every
            # browser this runs in supports it.
            out.save(f'{out_dir}/{NAMES[ri][ci]}.webp', 'WEBP', quality=88, method=6)
    print(f'wrote {sum(len(r) for r in NAMES)} files to {out_dir}')


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
