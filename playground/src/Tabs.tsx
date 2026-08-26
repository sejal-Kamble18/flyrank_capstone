import { useRef, useState } from 'react';

type Tab = {
  id: string;
  label: string;
  content: string;
};

const tabs: Tab[] = [
  { id: 'overview', label: 'Overview', content: 'Overview content for the accessibility playground.' },
  { id: 'keyboard', label: 'Keyboard', content: 'Use Left/Right arrows, Home, and End to move between tabs.' },
  { id: 'aria', label: 'ARIA', content: 'Each tab is connected to its tabpanel with ARIA attributes.' },
];

export function Tabs() {
  const [activeId, setActiveId] = useState(tabs[0].id);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const activate = (index: number) => {
    const tab = tabs[index];
    setActiveId(tab.id);
    refs.current[index]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;

    if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = tabs.length - 1;

    if (nextIndex !== null) {
      event.preventDefault();
      activate(nextIndex);
    }
  };

  return (
    <section>
      <h2>Accessible Tabs</h2>
      <div role="tablist" aria-label="Accessibility topics" className="tablist">
        {tabs.map((tab, index) => {
          const selected = activeId === tab.id;
          return (
            <button
              key={tab.id}
              ref={(element) => { refs.current[index] = element; }}
              id={`tab-${tab.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(tab.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {tabs.map((tab) => activeId === tab.id ? (
        <div
          key={tab.id}
          id={`panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab.id}`}
          tabIndex={0}
          className="tabpanel"
        >
          {tab.content}
        </div>
      ) : null)}
    </section>
  );
}
