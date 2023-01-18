import { createClient } from '@liveblocks/client';
import { liveblocks } from '@liveblocks/zustand';
import type { WithLiveblocks } from '@liveblocks/zustand';
import { create } from 'zustand';

export type Shape = {
  x: number;
  y: number;
  fill: string;
};

type IBoardState = {
  // Your Zustand state type will be defined here
  shapes: Record<string, Shape>;
};

const client = createClient({
  publicApiKey: process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_API_KEY || '',
});

const useBoardStore = create<WithLiveblocks<IBoardState>>()(
  liveblocks(
    (set) => ({
      shapes: {},
    }),

    { client, storageMapping: { shapes: true } }
  )
);

export default useBoardStore;
