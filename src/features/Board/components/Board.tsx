import { useEffect } from 'react';

import { Button } from '@/shared/Button';

import { useBoardStore } from '../store/board';
import type { Shape } from '../store/board';

// eslint-disable-next-line @typescript-eslint/ban-types
export type BoardProps = {};

export const Board = (props: BoardProps) => {
  const roomId = 'test-room';

  const shapes = useBoardStore((state) => state.shapes);
  const enterRoom = useBoardStore((state) => state.liveblocks.enterRoom);
  const leaveRoom = useBoardStore((state) => state.liveblocks.leaveRoom);
  const isStorageLoading = useBoardStore(
    (state) => state.liveblocks.isStorageLoading
  );
  const insertRectangle = useBoardStore((state) => state.insertRectangle);

  useEffect(() => {
    console.log('entering room');
    enterRoom(roomId);

    return () => {
      leaveRoom(roomId);
    };
  }, [enterRoom, leaveRoom]);

  if (isStorageLoading) {
    return <div className="">Loading...</div>;
  }

  return (
    <div className="relative max-w-3xl p-4 mx-auto rounded-lg bg-zinc-200 ring-1 ring-zinc-500">
      <div className="mx-auto">
        <Button onClick={() => insertRectangle(600, 300)}>Add rectangle</Button>
      </div>
      <ul className="relative h-96">
        {Object.entries(shapes).map(([shapeId, shape]) => {
          return <Rectangle key={shapeId} shape={shape} />;
        })}
      </ul>
    </div>
  );
};

const Rectangle = ({ shape }: { shape: Shape }) => {
  console.log('rendering rectangle', shape);

  return (
    <li
      className="absolute w-[100px] h-[100px]"
      style={{
        transform: `translate(${shape.x}px, ${shape.y}px)`,
        backgroundColor: shape.fill ? shape.fill : '#CCC',
      }}
    />
  );
};
