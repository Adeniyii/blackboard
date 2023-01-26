import { createClient } from '@liveblocks/client';
import { liveblocks } from '@liveblocks/zustand';
import type { WithLiveblocks } from '@liveblocks/zustand';
import { PointerEventHandler } from 'react';
import { create } from 'zustand';

export type Shape = {
  x: number;
  y: number;
  fill: string;
};

type IBoardState = {
  shapes: Record<string, Shape>;
  selectedShape: string | null;
  onShapePointerDown: (shapeId: string | null) => void;
  insertRectangle: (xCoord: number, yCoord: number) => void;
  deleteRectangle: () => void;
  isDragging: boolean;
  onCanvasPointerUp: () => void;
  onCanvasPointerDown: () => void;
  onCanvasPointerMove: PointerEventHandler<HTMLElement>;
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
      isDragging: false,
      onShapePointerDown(shapeId) {
        set(({ selectedShape }) => {
          if (selectedShape === shapeId)
            return { selectedShape: null, isDragging: false };
          return { selectedShape: shapeId, isDragging: true };
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
      onCanvasPointerUp: () => {
        const { isDragging } = get();
        set({ isDragging: false });
        console.log('pointer up: ', isDragging);
      },
      onCanvasPointerMove: (e) => {
        e.preventDefault();

        const { selectedShape, isDragging } = get();
        console.log('pointer move: ', isDragging);
        if (!selectedShape || !isDragging) return;

        set(({ shapes }) => {
          const shape = shapes[selectedShape];
          return {
            shapes: {
              ...shapes,
              [selectedShape]: {
                ...shape,
                x: e.clientX - 450,
                y: e.clientY - 150,
              },
            },
          };
        });
      },
      onCanvasPointerDown: () => {
        set({ selectedShape: null });
      },
    }),

    {
      client,
      storageMapping: { shapes: true },
      presenceMapping: { selectedShape: true },
    }
  )
);
