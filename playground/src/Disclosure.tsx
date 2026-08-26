import { useId, useState } from 'react';

export function Disclosure() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <section>
      <h2>Accessible Disclosure</h2>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? 'Hide details' : 'Show details'}
      </button>
      <div id={panelId} hidden={!open} className="disclosure-panel">
        <p>This disclosure uses a native button with aria-expanded and aria-controls.</p>
      </div>
    </section>
  );
}
