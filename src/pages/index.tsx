import { useRouter } from 'next/router';
import React from 'react';

import { Button } from '@/shared/Button';

export default function Home() {
  const router = useRouter();

  const loadApp = () => {
    router.push('/app');
  };

  return (
    <React.Fragment>
      <main className="flex items-center justify-center h-screen">
        <h1>welcome to Blackboard</h1>
        <Button onClick={() => loadApp()}>Board</Button>
      </main>
    </React.Fragment>
  );
}
