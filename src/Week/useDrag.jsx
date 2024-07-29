import { useEffect, useState } from 'react'
import { removeDragImage } from './utils/removeDragImage';

function useDrag() {
  const [dragStart, setDragStart] = useState(-1);
  const [dragEvent, setDragEvent] = useState(-1);
  const [eventDragStart, setEventDragStart] = useState(-1);
  const [dragMonth, setDragMonth] = useState(-1);
  const [dragYear, setDragYear] = useState(-1);
  const [dragEnd, setDragEnd] = useState(-1);
  const [dragDay, setDragDay] = useState(-1);

  const updateEnd = (day, month, year, end) => {
    if (eventDragStart !== -1 && day !== dragDay) setDragDay(day);
    if (eventDragStart !== -1 && month !== dragMonth) setDragMonth(month);
    if (eventDragStart !== -1 && year !== dragYear) setDragYear(year);
    if (end !== dragEnd) setDragEnd(end);
  }

  const startDraggin = (day, start) => {
    setDragStart(start);
    setDragDay(day);
    // console.log('dragging started at: ', start, ' on day: ', day);
  }

  const startEventDraggin = (day, start, id) => {
    setEventDragStart(start);
    setDragDay(day);
    setDragEvent(id);
    // console.log('dragging started at: ', start, ' on day: ', day);
  }

  const stopDraggin = () => {
    setDragStart(-1);
    setEventDragStart(-1);
    setDragMonth(-1);
    setDragEnd(-1);
    setDragDay(-1);
    setDragEvent(-1);
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
    dragEvent,
    updateEnd,
    dragMonth,
    dragYear,
    dragEnd,
    dragDay,
  };
}

export default useDrag;
