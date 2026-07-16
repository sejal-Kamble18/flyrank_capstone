# WORKFLOW.md

## What Happened in Round One

In Round One, the user asked to "Create a settings form." The assistant built a **different** form than what was later requested — a multi-section account/display/notifications form (`settings.html`, `settings.css`, `settings.js`) with username, email, theme, font size, and notification toggles. It was not the form the user actually wanted, and the JavaScript file was initially missing (the `<script>` tag referenced `settings.js` but the file was not created until the user pointed it out).

## What Happened in Round Two

In Round Two, the user gave a precise, detailed spec for a **FlyRank Settings Form** with three fields (Full Name, Email, Password) and strict validation requirements. This time the assistant:
- Entered plan mode first and got approval.
- Created `index.html`, `style.css`, and `script.js` with the exact requested fields.
- Added inline validation messages, disabled the Save button until valid, used semantic HTML (`<main>`, `<section>`, `<fieldset>`, `<legend>`), made it responsive, and added accessible labels + ARIA attributes (`aria-required`, `aria-invalid`, `role="alert"`, `aria-live`).
- Reviewed for edge cases and provided manual test cases.

## Specific Differences

| Aspect | Round One | Round Two |
|--------|-----------|-----------|
| Prompt clarity | Vague ("create a settings form") | Detailed spec with field list, validation rules, file names |
| Planning | None — coded immediately | Entered plan mode + exit approval |
| Fields | Username, email, theme, font size, toggles | Full Name, Email, Password |
| Validation | None (just HTML required attr) | Custom JS validation + inline messages |
| Save button | Always enabled | Disabled until form is valid |
| Accessibility | Basic `<label>` only | ARIA attributes + live regions + semantic structure |
| Files | settings.* (wrong scope) | index.html / style.css / script.js (correct scope) |
| Follow-through | Missed creating referenced JS file | All three files created |

## One AI Mistake You Found

**Round One mistake:** The assistant created `settings.html` with a `<script src="settings.js"></script>` tag but **did not create `settings.js`**, then told the user the form was "fully interactive." The user had to point out "you did not create script.js" before it was made. The assistant claimed completeness incorrectly.

**Round Two fix:** All three files (`index.html`, `style.css`, `script.js`) were created in the same turn with no missing references, and the user explicitly asked to plan first — which prevented the same gap.

## Which Version Required Less Review

**Round Two required far less review.** Because Round One was vague and unplanned, it produced the wrong form, missed a file, and made a false completeness claim — requiring the user to intervene twice. Round Two had a clear spec, a plan-mode checkpoint, and correct output on the first pass, so the user only needed to confirm the result rather than correct mistakes.

## Conclusion

Planning and a precise spec dramatically reduce rework. Round One's failure was not the code itself but the lack of (1) clarification of intent and (2) verification that all referenced files existed before claiming done. Round Two's structured approach — plan → build to spec → review edge cases → test cases — produced a correct, accessible, validated form with minimal user correction. Lesson: confirm scope, plan before coding, and never claim completion until every referenced artifact is verified to exist.
