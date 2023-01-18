import React from 'react';

import { Board } from '@/features/Board';

export default function App() {
  return (
    <React.Fragment>
      <main className="w-screen h-screen p-8">
        <Board />
      </main>
    </React.Fragment>
  );
}
