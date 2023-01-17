import { useEffect } from 'react';

import useBoardStore from '../store/board';

// eslint-disable-next-line @typescript-eslint/ban-types
export type BoardProps = {};

export const Board = (props: BoardProps) => {
  const roomId = 'test-room';

  const enterRoom = useBoardStore((state) => state.liveblocks.enterRoom);
  const leaveRoom = useBoardStore((state) => state.liveblocks.leaveRoom);

  useEffect(() => {
    enterRoom(roomId);
    return () => {
      leaveRoom(roomId);
    };
  }, [enterRoom, leaveRoom]);
};
