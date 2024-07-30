import { useEffect, useRef, useState } from 'react'
import { useEventsStore } from '../../data/events/useEventsStore';
import { users } from '../../data/users/users';
import { changeGhostImg } from './utils/changeGhostImg';
import { getGhostImg } from './utils/getGhostImg';

function useEvent({ event, drag }) {

  const editEvent = useEventsStore((state) => state.editEvent);

  const [isDragging, setIsDragging] = useState(false);
  const [opacity, setOpacity] = useState(1);

  const eventContainerRef = useRef(null);
  const containerImg = useRef(null);

  const eventSize = event.end + 1 - event.start;
  const width = !drag ? 120 : event.width;
  const eventColor = event.user && users.find((user) => user.id === event.user).color;

  const eventProps = {
    id: event.id,
    left: event.left,
    color: eventColor,
    width: width,
    isDragging: isDragging,
    opacity: opacity,
    size: eventSize,
  }

  const createEvent = () => {
    if (drag.eventDragStart.current < 0 || drag.eventDragStart.current > 47) return;
    if (drag.dragEnd.current < 0 || drag.dragEnd.current > 47) return;
    if (drag.dragDay.current < 0 || drag.dragDay.current > 31) return;
    const duration = event.end - event.start;
    const diff = Math.abs(event.start - drag.eventDragStart.current);
    const start = drag.dragEnd.current - diff;
    const end = start + duration;
    const eventDate = new Date(`${drag.dragYear.current}/${drag.dragMonth.current}/${drag.dragDay.current}`);
    let newEvent = {
      id: event.id,
      user: event.user,
      description: event.description,
      start: start < 0 ? 0 : start,
      end: end > 47 ? 47 : end,
      date: eventDate,
    }
    editEvent(newEvent);
  }

  const handleDragOver = (e, end) => {
    e.preventDefault();
    if (!isDragging) setIsDragging(true);
    drag.updateEnd(event.date.getDate(), event.date.getMonth() + 1, event.date.getFullYear()
    , end)
  }

  const handleDragLeave = () => {
    setIsDragging(false);
  }

  const handleDragEnd = () => {
    setOpacity(1);
    createEvent();
    drag.stopDraggin();
  }

  const handleDragStart = (e, index) => {
    drag.startEventDraggin(event.day, event.start + index + 1, event.id);
    changeGhostImg(e, containerImg, 0, ((index+1)*27));
    setOpacity(0.5);
  }

  useEffect(() => {
    getGhostImg(eventContainerRef, containerImg);
  }, [event]);

  return { eventContainerRef,
    handleDragLeave,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    eventProps,
   };
}

export default useEvent;
