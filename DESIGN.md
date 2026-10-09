---
name: "레이나 · 마사지"
description: "An adult-game style massage stage for a supplied PSD character, with arousal and satisfaction gauges."
colors:
  accent: "#f4a6c2"
  bg: "#150d14"
  panel: "#22161f"
  text: "#f6eef2"
  muted: "#c3aebb"
  line: "#47303f"
  tool: "#1d121a"
  tool-hover: "#33202d"
  accent-hover: "#ffc3d8"
  button-text: "#2a1020"
  scrollbar: "#7a4a63"
  frame-edge: "#f4a6c230"
  love: "#ff5c96"
  love-soft: "#ffb3cf"
  calm: "#7fdcc3"
  calm-soft: "#c4f2e4"
typography:
  story:
    fontFamily: '"Gowun Batang", "Batang", serif'
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  title:
    fontFamily: '"Segoe UI", "Malgun Gothic", sans-serif'
    fontSize: "17px"
    fontWeight: 600
  body:
    fontFamily: '"Segoe UI", "Malgun Gothic", sans-serif'
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: '"Segoe UI", "Malgun Gothic", sans-serif'
    fontSize: "12px"
    fontWeight: 400
  micro:
    fontFamily: '"Segoe UI", "Malgun Gothic", sans-serif'
    fontSize: "11px"
    fontWeight: 400
rounded:
  primary: "28px"
  secondary: "20px"
  panel: "14px"
  message: "16px"
  portrait: "16px"
  circle: "50%"
spacing:
  tools: "8px"
  control-gap: "10px"
  field: "15px"
  panel-padding: "22px"
  outer: "24px"
  desktop-inset: "32px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.button-text}"
    rounded: "{rounded.primary}"
    padding: "0 32px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    typography: "{typography.label}"
    rounded: "{rounded.secondary}"
    padding: "9px 16px"
  button-tool:
    backgroundColor: "{colors.tool}"
    textColor: "{colors.text}"
    rounded: "{rounded.circle}"
    width: "44px"
    height: "44px"
  button-tool-hover:
    backgroundColor: "{colors.tool-hover}"
  settings-panel:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.text}"
    rounded: "{rounded.panel}"
    padding: "22px"
    width: "310px"
  portrait-frame:
    backgroundColor: "transparent"
    rounded: "{rounded.portrait}"
---

# Design System: 리아나 · 조용한 순간

## Overview

**Creative North Star: "Quiet Character Stage"**

The shipped interface gives the supplied character artwork the largest visual presence. A dark backdrop, warm restrained controls, and short Korean instructions support the quiet character experience committed in PRODUCT.md. The name describes the implemented world; it is not a new brand claim.

Controls occupy little space at rest. Settings open as an opaque, independently scrolling surface while the stage remains visible. The character is read directly from the supplied PSD; its original illustration and organic transparency carry the visual identity.

**Key Characteristics:**
- Dark full-viewport stage with a subtle central lightening.
- Warm sand accent on actions, values, and focus indicators.
- Compact circular utility controls and softly rounded settings surfaces.
- Small Korean interface copy surrounding the character artwork.

## Colors

Cool dark neutrals frame the illustration, with a warm sand accent connecting actions and numeric feedback.

### Primary
- **Warm Sand** (`accent`): start action, range and checkbox accent, setting outputs, interaction hint, selected sound border, and keyboard focus.
- **Light Sand** (`accent-hover`): primary action hover.

### Neutral
- **Night Backdrop** (`bg`): page base and outer stage.
- **Slate Panel** (`panel`): settings and load recovery surfaces.
- **Warm White** (`text`): headings, labels, utility icons, and secondary actions.
- **Soft Slate Text** (`muted`): helper text, status, coordinates, and primary footer instruction.
- **Slate Line** (`line`): panel borders, utility outlines, secondary outlines, and debug separator.
- **Utility Dark** (`tool`) and **Utility Lift** (`tool-hover`): resting and hovered or pressed circles.
- **Ink on Sand** (`button-text`): text on accent-filled actions.
- **Muted Bronze** (`scrollbar`): narrow settings scrollbar thumb.
- **Quiet Bronze Edge** (`frame-edge`): translucent border defining the portrait boundary.

**The Accent Feedback Rule.** Use sand to identify actions, editable values, and interaction feedback; let the artwork supply the screen's broad color variation.

## Typography

**Body and Control Font:** Segoe UI, Malgun Gothic, sans-serif.

The control typography stays compact and straightforward. Panel titles use a stronger weight; numeric outputs and status use tabular numerals. No display font is approved as a reusable token in this record.

### Hierarchy
- **Title:** settings title uses the title token; its lower section heading uses (13px, 600).
- **Body:** welcome copy uses the body token. Panel explanatory text uses (12px, line-height 1.7), and recovery text uses (14px, line-height 1.7).
- **Label:** range labels, secondary buttons, and desktop footer instruction use the label token.
- **Micro:** layer labels, status, and accent footer hint use the micro token. The accent hint tracks at (.1em).

Observed defect, not canonized: the character name currently uses installed Georgia/Batang serif at (25px desktop, 21px mobile, weight 400, tracking .08em). The own-world display voice needs an approved sourced face before it becomes a system token.

**The Measured Values Rule.** Use tabular numerals for setting outputs and layer status so live updates do not shift their reading position.

## Layout

The stage fills the viewport; the document itself does not scroll. Header and footer sit above the canvas, and safe-area insets supplement the top and bottom offsets. Desktop header horizontal insets are (32px), with utilities separated by (8px). The welcome action is centered near the lower edge and disappears once the experience starts.

The settings panel is right-aligned at (24px), extends from (85px plus safe area) to (65px plus bottom safe area), and has a width of (310px) constrained by `calc(100vw - 32px)`. Its padding is (22px). Content scrolls within that panel; both the panel and its ranges allow vertical touch panning so a gesture beginning on a slider can scroll the settings.

At the observed (600px) breakpoint, the header uses (20px) side insets and (18px plus safe area) top inset; utility controls shrink from (44px) to (40px), panel right inset becomes (16px), and footer text becomes (11px). The stage maintains the PSD aspect ratio and recenters on resize, reserving top and bottom space for controls. This is a spatial composition, not a card grid or a reusable marketing-page template.

The portrait frame follows the fitted artwork rather than a fixed card size. In PSD coordinates its fitting bounds add (18px) at either side and (24px) above the illustration, and crop (8px) from the bottom. A rounded WebGL stencil and the visible frame share the same screen-space bounds and (16px) radius. This is an outer portrait boundary; the character and eye contours still use their original alpha.

## Elevation & Depth

The canvas background uses a radial gradient centered at (50% 47%), progressing from `#292b35` through `#1b1e26` to the base background. It supplies ambient stage depth without altering the artwork. Opaque tonal surfaces, fine borders, and diffuse black shadows distinguish interactive overlays.

### Shadow Vocabulary
- **Start action:** `0 8px 30px #0003` gives the filled action a gentle lift.
- **Settings surface:** `0 16px 48px #0005` separates the scrolling overlay from the stage.
- **Portrait inner edge:** `inset 0 0 0 4px #13151b44` softens the fitted frame boundary. A (12px) bottom overlay fades from transparent to `#13151b99`.

## Shapes

Utility buttons are circles. Primary and secondary actions are pill-like, with their established radii in the frontmatter. Settings and recovery surfaces have gently rounded corners and single-pixel borders. Icons are authored inline SVG with (19px) bounds, (1.6) stroke width, rounded caps, and rounded joins. The PSD's alpha and eye-layer alpha determine organic contours; they are not approximated with geometric masks.

## Components

### Buttons

The primary action is warm and compact: minimum height (50px), weight (600), with a soft shadow. Hover lightens its background and lifts it (2px) over (.2s). Disabled loading uses opacity (.65), a waiting cursor, and no lift. Secondary actions use transparent fill and a fine outline that becomes sand on hover.

Circular utility buttons contain only authored SVG icons. Hover and pressed sound state use the utility hover surface and sand border. The settings button exposes expanded state semantically; the implementation does not assign that expanded state a distinct visual fill.

All keyboard-focusable controls use a (2px) sand outline offset by (5px). Button transitions are removed for reduced-motion preferences.

### Settings Surface

The panel is an opaque rounded overlay with its own scroll. A compact title and explanation precede stacked ranges. The debug section uses a line and larger spacing above its heading. Escape closes the panel and returns focus to the settings control.

### Inputs / Fields

Ranges are browser-native, full-width, and sand-accented. Each label is paired with a right-aligned tabular output above the range; a (10px) gap separates label and value. Debug checkboxes are also native, sand-accented, and (17px) square. Their exact track, thumb, and check shape remain browser-dependent.

### Recovery Surface

Load failures use a centered opaque surface constrained to (360px) and (90vw), with padding (24px). A filled file-selection action and outlined retry action make recovery directly available. Loading uses a small centered status and a sand-accented progress element.

### Character Stage

The supplied PSD is the signature visual component. Original layer coordinates, texture transparency, and illustration proportions survive viewport fitting. Breathing, gaze, blinking, hair, and touch deformation animate the character while the surrounding chrome stays steady. Reduced-motion preferences reduce breathing, head angle, and hair sway to (.4) of their configured amplitudes.

### Portrait Frame

A single-pixel quiet bronze edge, rounded corners, inset shading, and a short bottom fade present the supplied artwork as a portrait. The frame is noninteractive and hidden until the PSD is ready. Its matching stencil prevents the lower artwork edge and touch hit testing from escaping the visible boundary. The frame is a crop boundary, not an approximation of the subject's silhouette.

### Character Motion

The current default breathing strength is (.003) over (3.8s), with a small second harmonic (.12) and head follow (.95). Head movement uses a critically damped spring at response speed (7), shared rotation limited by the configured angle (1.05 degrees), and small parallax (2.4 PSD pixels). Hair roots remain pinned; delayed spring response (stiffness 28, damping 9), strength (.8), and restrained sway (.25) increase toward the free ends.

Both irises share a single safe translation rather than separate eye-width offsets. Default gaze strength is (.8), response speed (7), with configured range limits of (1.8 PSD pixels horizontal, .35 upward, .65 downward), further softened by `tanh`. Real alpha samples cap added white exposure at (.025). Automatic blinking is disabled by user request and its range controls are removed. The gaze and actual eye alpha masks remain active.

Direct presses apply a local impulse and spring deformation inside the clothing while pinning the neckline, side seams, and lower edge. Cloth uses depth (10), radius (72), drag (.3), maximum drag (38), stiffness (105), and damping (13). A separate underdamped chest response uses impulse (110), stiffness (58), damping (4.8), inertia (.9), and radius (90); displacement is bounded to (22 PSD pixels) per axis. Reduced motion also scales the click impulse by (.4), and resetting controls preserves those reduced-motion defaults.

Waist touches have zero deformation gain. All touch deformation fades between normalized clothing heights (.50) and (.62), leaving the lower torso fixed apart from breathing. Compact influence bounds prevent waist presses and drags from exciting the upper clothing springs.

## Do's and Don'ts

### Do:
- **Do** preserve the supplied PSD artwork, aspect ratio, and organic transparency.
- **Do** use sand for actions, values, and visible keyboard focus.
- **Do** keep utility chrome compact and settings independently scrollable.
- **Do** preserve tabular setting values and reduced-motion behavior.

### Don't:
- **Don't** substitute generated artwork for the supplied character PSD.
- **Don't** replace the organic layer alpha with geometric cutouts.
- **Don't** turn the small supporting text into competing display content.

## Massage Mode (v2)

This section supersedes the earlier sand-on-slate palette, the Georgia display serif, and the touch values quoted above where they differ.

- **Palette.** A wine-dark stage (`bg`, radial from `#33202d`) carries two semantic accents: **love** pink for arousal (gauge, hearts, chest glow, sensitive-zone tags) and **calm** mint for satisfaction (gauge, sparkles, massage glow, good-stroke feedback). `accent` soft pink marks actions, focus, and the dialogue name plate. Never swap the two semantic colors.
- **Type.** Gowun Batang (Google Fonts) is the story voice: the character name and dialogue text. UI chrome stays on Segoe UI / Malgun Gothic.
- **HUD.** Two gauges (흥분도, 만족도) with quarter ticks, stage labels, and a 손놀림 meter showing hand speed against the mint sweet-spot band. Wide screens (≥900px) place it as a left card and recenter the portrait in the remaining width; narrow screens place it as a two-column strip under the header.
- **Dialogue window.** An adult-game ADV box with a pill name plate overlaps the portrait's bottom edge by 14px, types lines at 30 characters per second, and dims to 50% after 5 seconds of silence.
- **Feedback.** Pills at the hand show '민감♥', '딱 좋아요♪', or '너무 세요!'. Hovering a zone shows a tag (가슴 · 민감♥ / 어깨·팔 · 뭉침 / 허리 · 뭉침) and a hand cursor.
- **Narrow crop.** When width-bound, the portrait trims the arm ends (minimum 620 PSD px around x 470) so the character stays large on phones.
- **Shadows.** Overlays use neutral black shadows only; colored glow lives in canvas particles, not CSS.

## Massage Mode (v3 game layer)

- **Toolbar.** Four pill-cornered (12px) buttons: 손, 오일, 상태 복사, 끝내기. Wide screens stack them 2×2 under the HUD card; narrow screens put one row of four at the bottom and hide the footer hint. The active tool uses `aria-pressed`; oil's pressed state is amber (`#f2c27a` edge on `#3a2a1c`), the only amber in the system, tied to the oil drops and oil glow.
- **Request banner.** Centered on the portrait's top edge (moved 52px down on portraits narrower than 560px so it clears the timer). Label tinted by meaning: calm mint for massage requests, love pink for chest. A white-alpha bar shows time left; the colored bar shows progress.
- **Timer.** Course mode only. A pill at the portrait's top-left; turns amber under 20 seconds.
- **Close-up cut-in.** A rounded (12px) face render at the portrait's top-right, about 38% of portrait width, bordered pink for arousal moments and mint for bliss. It slides in 40px from the right.
- **Result card.** Modal over a blurred dim backdrop. The grade letter uses the story face at 76px; S is gold `#ffd27a`, A love, B calm, C muted. Stats sit in a two-column definition list between hairlines. Actions: 상태 복사, 계속하기 (secondary) and 새로 시작 (primary).
- **Feedback pills.** Two new kinds: `info` (neutral panel) for hints and fatigue, `gold` for knot release and completed requests.
- **Wet oil look.** Oiled areas get a multiply tint (warm beige on the shirt, lighter on skin) so the fabric reads as damp and see-through, plus a screen-blended sheen that follows the artwork's own highlights rather than a uniform stripe.
