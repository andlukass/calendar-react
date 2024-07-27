import { useEffect, useState } from 'react'
import { removeDragImage } from './utils/removeDragImage';

function useDrag() {
  const [dragStart, setDragStart] = useState(-1);
  const [eventDragStart, setEventDragStart] = useState(-1);
  const [dragEnd, setDragEnd] = useState(-1);
  const [dragDay, setDragDay] = useState(-1);

  const updateEnd = (day, end) => {
    if (eventDragStart !== -1 && day !== dragDay) setDragDay(day);
    if (end !== dragEnd) setDragEnd(end);
  }

  const startDraggin = (day, start) => {
    setDragStart(start);
    setDragDay(day);
    // console.log('dragging started at: ', start, ' on day: ', day);
  }

  const startEventDraggin = (day, start) => {
    setEventDragStart(start);
    setDragDay(day);
    // console.log('dragging started at: ', start, ' on day: ', day);
  }

  const stopDraggin = () => {
    setDragStart(-1);
    setEventDragStart(-1);
    setDragEnd(-1);
    setDragDay(-1);
    // console.log('dragging started at: ', dragStart,
    // 'and ended at: ', end, ' on day: ', dragDay);
  }

  useEffect(() => {
    removeDragImage();
  }, []);

  return { dragStart,
    startEventDraggin,
    eventDragStart,
    startDraggin,
    stopDraggin,
    updateEnd,
    dragEnd,
    dragDay,
  };
}

export default useDrag;
