import { useEffect, useRef, useState } from 'react'
import { removeDragImage } from './utils/removeDragImage';

function useDrag() {
  const dragStart = useRef(-1);
  const dragEnd = useRef(-1);
  const dragMonth = useRef(-1);
  const dragYear = useRef(-1);
  const dragDay = useRef(-1);
  const dragEvent = useRef(-1);
  const eventDragStart = useRef(-1);
  const monthDragStart = useRef(-1);
  const [eventSelectorEnd, setEventSelectorEnd] = useState(-1);

  const updateEnd = (day, month, year, end) => {
    // console.log("update end", day, month, year, end);
    if (eventDragStart.current !== -1 && day !== dragDay.current) dragDay.current = day;
    if (eventDragStart.current !== -1 && month !== dragMonth.current) dragMonth.current = month;
    if (eventDragStart.current !== -1 && year !== dragYear.current) dragYear.current = year;
    if (dragStart.current !== -1) setEventSelectorEnd(end);
    if (end !== dragEnd) dragEnd.current = end;
  }

  const startDraggin = (day, start) => {
    dragStart.current = start;
    dragDay.current = day;
  }

  const startEventDraggin = (day, start, id) => {
    console.log("start event draggin", day, start, id);
    eventDragStart.current = start;
    dragDay.current = day;
    dragEvent.current = id;
  }

  const stopDraggin = () => {
    dragStart.current = -1;
    eventDragStart.current = -1;
    dragMonth.current = -1;
    dragEnd.current = -1;
    dragYear.current = -1;
    dragDay.current = -1;
    dragEvent.current = -1;
    setEventSelectorEnd(-1);
  }

  useEffect(() => {
    removeDragImage();
  }, []);

  return { dragStart,
    startEventDraggin,
    eventSelectorEnd,
    monthDragStart,
    eventDragStart,
    startDraggin,
    stopDraggin,
    dragEvent,
    updateEnd,
    dragMonth,
    dragYear,
    dragEnd,
    dragDay,
  };
}

export default useDrag;
