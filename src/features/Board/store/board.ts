import { createClient } from '@liveblocks/client';
import { liveblocks } from '@liveblocks/zustand';
import type { WithLiveblocks } from '@liveblocks/zustand';
import create from 'zustand';

type IBoardState = {
  // Your Zustand state type will be defined here
};

const client = createClient({
  publicApiKey: process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_API_KEY || '',
});

const useBoardStore = create<WithLiveblocks<IBoardState>>()(
  liveblocks(
    (set) => ({
      // Your state and actions will go here
    }),

    { client }
  )
);

export default useBoardStore;
