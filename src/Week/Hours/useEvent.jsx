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
    left: event.left,
    color: eventColor,
    width: width,
    isDragging: isDragging,
    opacity: opacity,
    size: eventSize,
  }

  const createEvent = () => {
    if (drag.eventDragStart < 0 || drag.eventDragStart > 47) return;
    if (drag.dragEnd < 0 || drag.dragEnd > 47) return;
    if (drag.dragDay < 0 || drag.dragDay > 31) return;
    const duration = event.end - event.start;
    const diff = Math.abs(event.start - drag.eventDragStart);
    const start = drag.dragEnd - diff;
    let newEvent = {
      id: event.id,
      user: event.user,
      description: event.description,
      day: drag.dragDay,
      start: start,
      end: start + duration,
    }
    editEvent(newEvent);
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!isDragging) setIsDragging(true);
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
    drag.startEventDraggin(event.day, event.start + index + 1);
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
