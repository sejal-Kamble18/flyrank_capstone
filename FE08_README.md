# FE-08: Error states, empty states and edge cases

A resilient chat demonstration built for the FlyRank Frontend AI Engineering track.

## Live page

After deployment: `/fe08/chat.html`

## Primary flow

1. The first-run empty state provides a click-to-fill example.
2. A user sends a message.
3. A server endpoint responds after a short delay.
4. The assistant response renders word by word and is announced through the chat region.

## Failure inventory and deliberate handling

| Case | Test method | Designed response |
|---|---|---|
| Empty input | Submit a blank message | Native required-field validation prevents a request. |
| Slow response | Normal send | Three-dot skeleton is displayed while waiting. |
| Network/API failure | Network failure test button | Error card keeps the last message and offers retry. |
| Rate limit | Rate limit test button | Specific rate-limit explanation plus retry. |
| Interrupted response | Interrupted response test button | Partial response is removed; a calm error card explains recovery. |
| First-run empty state | Reload the page | Helpful example action appears instead of a blank chat. |

## Accessibility and mobile

- The message area uses `aria-live="polite"`.
- All buttons are keyboard reachable and have visible focus states.
- The mobile layout uses `100dvh` rather than `100vh` for a safer mobile-browser viewport.
- Reduced-motion preference disables the loading animation.

## Recording checklist

Record one normal request, then demonstrate the Network failure and Interrupted response controls. In both cases, click **Retry this message** and show the request recovering. Keep browser DevTools closed in the final recording.