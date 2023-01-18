import { useEffect } from 'react';

import useBoardStore from '../store/board';
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
    <div className="relative h-96 w-96 bg-zinc-900">
      <p>rectangles</p>
      {Object.entries(shapes).map(([shapeId, shape]) => {
        return (
          <>
            <Rectangle key={shapeId} shape={shape} />
          </>
        );
      })}
    </div>
  );
};

const Rectangle = ({ shape }: { shape: Shape }) => {
  return (
    <div
      className="absolute w-20 h-20 ring-2 ring-zinc-500"
      style={{
        transform: `translate(${shape.x}px, ${shape.y}px)`,
        backgroundColor: shape.fill ? shape.fill : '#CCC',
      }}
    ></div>
  );
};
