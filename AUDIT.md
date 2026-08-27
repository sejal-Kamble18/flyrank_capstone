# Accessibility and performance audit (FE-10)

## Audited preview

- URL: https://flyrank-capstone-theta.vercel.app/
- Page: User Settings
- Audit date: 27 August 2026
- Scope: settings form, primary keyboard flow, landmarks, labels, focus styles and live status messaging.

## Baseline

### WAVE

| Check | Result |
|---|---:|
| Errors | 0 |
| Contrast errors | 0 |
| Alerts | 3 |
| Features | 7 |
| Structural elements | 4 |
| ARIA issues | 0 |
| WAVE AIM score | 9.9 / 10 |

The three WAVE alerts were:

1. Two orphaned form-label alerts associated with the Display controls.
2. One no-page-regions alert.

### Lighthouse mobile

Not recorded yet. A real Chrome Lighthouse Mobile screenshot must be added before final FE-10 submission; no score is claimed here.

## Changes made

- Added a `main` landmark and page header to address the missing page-region alert.
- Replaced implicit Display labels with explicit `for` / `id` associations for the Theme and Font Size selects.
- Added explicit `name` attributes to every form control.
- Grouped notification choices in a `fieldset` with a `legend`.
- Added visible, high-contrast `:focus-visible` styles for keyboard users.
- Added required-field validation and a `role="status"` / `aria-live="polite"` save message.
- Rebuilt the form styles with responsive layout, readable contrast and a reduced-motion preference.

## Keyboard-only pass

Expected flow after this change:

1. Tab reaches Username, Email, Theme, Font size, both notification checkboxes and Save settings in a logical order.
2. Every focused control has a clearly visible blue focus ring.
3. Space toggles the checkboxes; Enter submits the form.
4. The save result is announced through the polite live-status region.

## After audit checklist

- Re-deploy this branch.
- Re-run WAVE: expected result is 0 errors and 0 alerts.
- Run Chrome DevTools Lighthouse using the Mobile preset.
- Add genuine before/after Lighthouse screenshots and actual scores below.

| Lighthouse mobile score | Before | After |
|---|---:|---:|
| Performance | Pending measurement | Pending measurement |
| Accessibility | Pending measurement | Pending measurement |
