import React from 'react';

import { Board } from '@/features/Board';

export default function App() {
  return (
    <React.Fragment>
      <main className="flex items-center justify-center w-screen h-screen">
        <Board />
      </main>
    </React.Fragment>
  );
}
