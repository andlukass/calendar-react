import { useEffect, useState } from 'react'
import { removeDragImage } from './utils/removeDragImage';

function useDrag() {
  const [dragStart, setDragStart] = useState(null);
  const [dragEnd, setDragEnd] = useState(null);
  const [dragDay, setDragDay] = useState(null);

  const updateEnd = (end) => {
    if (end !== dragEnd) setDragEnd(end);
  }

  const startDraggin = (day, start) => {
    setDragStart(start);
    setDragDay(day);
  }

  const stopDraggin = () => {
    setDragStart(null);
    setDragEnd(null);
    setDragDay(null);
    if (dragStart === null) return;
    // console.log('dragging started at: ', dragStart,
    // 'and ended at: ', end, ' on day: ', dragDay);
  }

  useEffect(() => {
    removeDragImage();
  }, []);

  return { dragStart,
    startDraggin,
    stopDraggin,
    updateEnd,
    dragEnd,
    dragDay,
  };
}

export default useDrag;
