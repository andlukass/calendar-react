import { useState } from 'react'
import { getColorByType } from '../../../utils/getColorByType';
import { useEventsStore } from '../../../data/events/useEventsStore';

function useEvent({ event, drag }) {

  const editEvent = useEventsStore((state) => state.editEvent);

    const [isDragging, setIsDragging] = useState(false);
    const [opacity, setOpacity] = useState(1);

  const eventSize = event.end + 1 - event.start;
  const width = !drag ? 120 : event.width;

  const eventProps = {
    id: event.id,
    left: event.left,
    color: getColorByType(event.user),
    width: width,
    opacity: opacity,
    size: eventSize,
  }

  const createEvent = () => {
    if (drag.eventDragStart.current < 0 || drag.eventDragStart.current > 47) return;
    if (drag.dragEnd.current < 0 || drag.dragEnd.current > 47) return;
    if (drag.dragDay.current < 0 || drag.dragDay.current > 31) return;
    const duration = event.end - event.start;
    const start = drag.dragEnd.current;
    const end = start + duration;
    const eventDate = new Date(`${drag.dragYear.current}/${drag.dragMonth.current}/${drag.dragDay.current}`);
    let newEvent = {
      id: event.id,
      user: event.user,
      title: event.title,
      description: event.description,
      start: start < 0 ? 0 : start,
      end: end > 47 ? 47 : end,
      date: eventDate,
    }
    editEvent(newEvent);
  }

  const handleDragOver = (e, end) => {
    e.preventDefault();
    if (!event.date) return;
    drag.updateEnd(event.date.getDate(), event.date.getMonth() + 1, event.date.getFullYear()
    , end)
  }

  const handleDragEnd = () => {
    setOpacity(1);
    setIsDragging(false);
    createEvent();
    drag.stopDraggin();
  }

  const handleDragStart = async (e, index) => {
    drag.startEventDraggin(event.day, event.start + index + 1, event.id);
    setIsDragging(true);
    setOpacity(0.5);
  }

  return { isDragging,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    eventProps,
   };
}

export default useEvent;
