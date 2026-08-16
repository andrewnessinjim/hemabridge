import React from "react";

export type DrawFn<TFrame> = (frame: TFrame) => void;

type Entry<TFrame> = {
  id: number;
  order: number;
  drawFn: DrawFn<TFrame>;
};

function useDrawableRegistry<TFrame>() {
  const entriesRef = React.useRef<Entry<TFrame>[]>([]);
  const nextIdRef = React.useRef(0);

  const register = React.useCallback((drawFn: DrawFn<TFrame>, order = 0) => {
    const id = nextIdRef.current++;
    const entries = entriesRef.current;

    let insertAt = entries.length;
    for (let i = 0; i < entries.length; i++) {
      if (entries[i].order > order) {
        insertAt = i;
        break;
      }
    }
    entries.splice(insertAt, 0, { id, order, drawFn });

    return function unregister() {
      const idx = entriesRef.current.findIndex((entry) => entry.id === id);
      if (idx !== -1) {
        entriesRef.current.splice(idx, 1);
      }
    };
  }, []);

  const runAll = React.useCallback((frame: TFrame) => {
    for (const entry of entriesRef.current) {
      entry.drawFn(frame);
    }
  }, []);

  return { register, runAll };
}

export default useDrawableRegistry;
