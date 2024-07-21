import { useEffect, useState } from 'react'
import { removeDragImage } from './utils/removeDragImage';

function useDrag() {
  const [dragStart, setDragStart] = useState(null);
  const [dragEnd, setDragEnd] = useState(null);

  const updateEnd = (end) => {
    if (end !== dragEnd) setDragEnd(end);
  }

  const startDraggin = (e, start) => {
    setDragStart(start);
  }

  const stopDraggin = (end) => {
    setDragStart(null);
    setDragEnd(null);
    if (dragStart === null) return;
    console.log('dragging started at: ', dragStart,
    'and ended at: ', end);
  }

  useEffect(() => {
    removeDragImage();
  }, []);

  return { dragStart,
    startDraggin,
    stopDraggin,
    updateEnd,
    dragEnd,
  };
}

export default useDrag;
