import { useState } from 'react';
import { Modal } from './Modal';
import { Tabs } from './Tabs';
import { Disclosure } from './Disclosure';
import './styles.css';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="container">
      <header>
        <p className="eyebrow">FlyRank FE-05</p>
        <h1>Accessible Component Fundamentals</h1>
        <p>Keyboard-first React + TypeScript implementations based on W3C ARIA patterns.</p>
      </header>

      <section>
        <h2>Accessible Modal Dialog</h2>
        <button type="button" onClick={() => setModalOpen(true)}>Open modal</button>
        <Modal open={modalOpen} title="Accessible modal" onClose={() => setModalOpen(false)} />
      </section>

      <Tabs />
      <Disclosure />
    </main>
  );
}
