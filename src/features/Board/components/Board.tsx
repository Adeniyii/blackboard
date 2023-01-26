import clsx from 'clsx';
import { useEffect } from 'react';

import { Button } from '@/shared/Button';

import { useBoardStore } from '../store/board';
import type { Shape } from '../store/board';

export const Board = () => {
  const roomId = 'test-room';

  const shapes = useBoardStore((state) => state.shapes);
  const others = useBoardStore((state) => state.liveblocks.others);
  const selectedShapeId = useBoardStore((state) => state.selectedShape);
  const enterRoom = useBoardStore((state) => state.liveblocks.enterRoom);
  const leaveRoom = useBoardStore((state) => state.liveblocks.leaveRoom);
  const insertRectangle = useBoardStore((state) => state.insertRectangle);
  const deleteRectangle = useBoardStore((state) => state.deleteRectangle);
  const isStorageLoading = useBoardStore(
    (state) => state.liveblocks.isStorageLoading
  );
  const onCanvasPointerUp = useBoardStore((state) => state.onCanvasPointerUp);
  const onCanvasPointerDown = useBoardStore(
    (state) => state.onCanvasPointerDown
  );
  const onCanvasPointerMove = useBoardStore(
    (state) => state.onCanvasPointerMove
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
    <div className="relative max-w-3xl p-4 mx-auto rounded-lg bg-zinc-200 ring-1 ring-zinc-500">
      <div className="flex gap-4 mx-auto w-fit">
        <Button onClick={() => insertRectangle(600, 300)}>Add rectangle</Button>
        <Button onClick={() => deleteRectangle()} disabled={!selectedShapeId}>
          Delete rectangle
        </Button>
      </div>
      <ul
        className="relative h-96"
        onPointerMove={onCanvasPointerMove}
        onPointerUp={onCanvasPointerUp}
        onPointerDown={onCanvasPointerDown}
      >
        {Object.entries(shapes).map(([shapeId, shape]) => {
          const selectedByOthers = others.some(
            (user) => user.presence?.selectedShape === shapeId
          );
          const selectedByMe = selectedShapeId === shapeId;
          return (
            <Rectangle
              key={shapeId}
              id={shapeId}
              shape={shape}
              selection={
                selectedByMe ? 'me' : selectedByOthers ? 'them' : undefined
              }
            />
          );
        })}
      </ul>
    </div>
  );
};

const Rectangle = ({
  id,
  shape,
  selection,
}: {
  id: string;
  shape: Shape;
  selection?: 'me' | 'them';
}) => {
  const onShapePointerDown = useBoardStore((state) => state.onShapePointerDown);

  return (
    <li
      className={clsx('absolute w-[100px] h-[100px]', {
        'ring-2 ring-offset-2 ring-mauve-6': selection === 'them',
        'ring-2 ring-offset-2 ring-current': selection === 'me',
      })}
      style={{
        transform: `translate(${shape.x}px, ${shape.y}px)`,
        backgroundColor: shape.fill ? shape.fill : '#CCC',
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
        onShapePointerDown(id);
      }}
    />
  );
};
