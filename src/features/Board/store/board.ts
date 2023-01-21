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
  selectedShape: string | null;
  onShapePointerDown: (shapeId: string | null) => void;
  insertRectangle: (xCoord: number, yCoord: number) => void;
  deleteRectangle: () => void;
};

const client = createClient({
  publicApiKey: process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_API_KEY || '',
});

const COLORS = ['#DC2626', '#D97706', '#059669', '#7C3AED', '#DB2777'];

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function getRandomColor() {
  return COLORS[getRandomInt(COLORS.length)];
}

export const useBoardStore = create<WithLiveblocks<IBoardState>>()(
  liveblocks(
    (set, get) => ({
      shapes: {},
      selectedShape: null,
      onShapePointerDown(shapeId) {
        set(({ selectedShape }) => {
          if (selectedShape === shapeId) return { selectedShape: null };
          return { selectedShape: shapeId };
        });
      },
      insertRectangle: (xCoord, yCoord) => {
        const shapeId = Date.now().toString();

        const shape: Shape = {
          x: getRandomInt(xCoord),
          y: getRandomInt(yCoord),
          fill: getRandomColor(),
        };
        set((state) => {
          return {
            shapes: {
              ...state.shapes,
              [shapeId]: shape,
            },
            selectedShape: shapeId,
          };
        });
      },
      deleteRectangle: () => {
        const { selectedShape } = get();
        if (!selectedShape) return;
        set((state) => {
          const { [selectedShape]: _, ...shapes } = state.shapes;
          return {
            shapes,
            selectedShape: null,
          };
        });
      },
    }),

    {
      client,
      storageMapping: { shapes: true },
      presenceMapping: { selectedShape: true },
    }
  )
);
