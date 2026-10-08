---
name: "리아나 · 조용한 순간"
description: "A quiet dark setting for a supplied PSD character."
colors:
  accent: "#d6bb91"
  bg: "#13151b"
  panel: "#20232b"
  text: "#f0ede8"
  muted: "#b3b5c1"
  line: "#393d49"
  tool: "#191c24"
  tool-hover: "#30313a"
  accent-hover: "#ead2ac"
  button-text: "#242028"
  scrollbar: "#6a5e4d"
typography:
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

## Elevation & Depth

The canvas background uses a radial gradient centered at (50% 47%), progressing from `#292b35` through `#1b1e26` to the base background. It supplies ambient stage depth without altering the artwork. Opaque tonal surfaces, fine borders, and diffuse black shadows distinguish interactive overlays.

### Shadow Vocabulary
- **Start action:** `0 8px 30px #0003` gives the filled action a gentle lift.
- **Settings surface:** `0 16px 48px #0005` separates the scrolling overlay from the stage.

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

Not canonized or repaired: the installed display serif is a craft-floor defect; it is observed above but excluded from reusable typography tokens because this pass documents the build without changing source.
