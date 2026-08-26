# FE-05 Accessibility Notes

## What I built by hand

I created three interactive React + TypeScript components in `playground/` without using a component library:

- Modal dialog
- Tabs
- Disclosure

The custom versions follow the W3C ARIA Authoring Practices patterns for roles, keyboard interaction, focus management, and state communication.

## What shadcn/ui handled that I initially had to think through manually

### 1. Dialog focus management and focus trapping

My custom modal needs explicit code to remember the previously focused element, move focus into the dialog, trap `Tab`/`Shift+Tab`, close on `Escape`, and return focus to the trigger. shadcn/ui's Dialog is built on Radix primitives, which provide this behavior in a reusable and more battle-tested way.

### 2. Dialog accessibility wiring

In the custom implementation I manually connect `role="dialog"`, `aria-modal="true"`, and `aria-labelledby`. shadcn/ui's generated Dialog components structure `DialogTitle`, `DialogDescription`, content, overlay, and close controls so the intended accessible relationships are much harder to forget.

### 3. Tabs keyboard navigation

My custom tabs explicitly implement roving `tabIndex`, `ArrowLeft`, `ArrowRight`, `Home`, and `End`, while keeping `aria-selected`, `aria-controls`, and the active panel synchronized. shadcn/ui/Radix encapsulates this keyboard behavior and state coordination in the Tabs primitives.

### 4. Consistency and edge cases

The hand-written components cover the required assignment behavior, but a mature primitive library handles many edge cases consistently across browsers and assistive technologies. Reading the generated shadcn source made it clear that component libraries can reduce accessibility regressions, but only when the developer understands the behavior well enough to review the generated code.

## Keyboard checks performed

- Modal: open with keyboard, cycle focus with `Tab` and `Shift+Tab`, close with `Escape`, verify focus returns to trigger.
- Tabs: move with `ArrowLeft`/`ArrowRight`, jump with `Home`/`End`, verify only the active tab is in the normal tab order.
- Disclosure: toggle using the native button with `Enter` or `Space`; verify `aria-expanded` reflects state.

## TypeScript

Component props are explicitly typed and no `any` escape is used.
