import { hourIndexes } from '../../../utils/hourIndexes';
import EventSelector from './EventSelector';
import HourCell from './HourCell';

import DayEvents from './DayEvents';
import PropTypes from 'prop-types';
import Needle from './Needle';
import { useEffect, useRef } from 'react';

Hours.propTypes = {
  date: PropTypes.instanceOf(Date),
  drag: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired,
  currentWeek: PropTypes.instanceOf(Date),
};
function Hours({ date, drag, events, currentWeek }) {

  const needleRef = useRef(null);

  const day = date.getDate();
  const dayEvents = events.filter((event) => 
    event.date && (event.date.getDate() === day) && (event.date.getMonth() ===
   date.getMonth()
    && event.date.getFullYear() === date.getFullYear()));

  const isOverlapping = (a, b) => {
    return a.start < b.end && b.start < a.end;
  };

  const findOverlap = (event, events) => {
    for (let i = 0; i < events.length; i++) {
        if (isOverlapping(event, events[i]) &&
        event.id !== events[i].id) return i;
    }
    return -1;
  };

  const lastOverlap = (event, events, start) => {
    for (let i = start; i >= 0; i--) {
        if (isOverlapping(event, events[i])) return i;
    }
    return -1;
  }

  const getGroupDepth = (event, events, start) => {
    let groupDepth = event.depth;
    if (start === events.length) return groupDepth;
    for (let i = start; i < events.length; i++) {
        if (!events[i].depth) return groupDepth;
        if (groupDepth < events[i].depth) {
          groupDepth = events[i].depth;
        }
    }
    return groupDepth;
  }

  const getEventsProps = (events) => {

    for (let i = 0; i < events.length; i++) {
      const next = findOverlap(events[i], events);
      const last = lastOverlap(events[i], events, i - 1);
      if (last !== -1 && next !== -1 && i > 0) {
          events[i].depth = events[last].depth + 1;
      } else {
        events[i].depth = 0;
      }
    }

    for (let i = 0; i < events.length; i++) {
      if (events[i].depth) {
        events[i].groupDepth = getGroupDepth(events[i], events, i + 1);
      } else {
        events[i].groupDepth = 0;
      }
    }

    events.forEach((event) => {
      if (event.groupDepth === 0) {
        event.left = 0;
        event.width = 100;
        return;
      }
      const factor = (100 / (event.groupDepth + 1));
      event.left = event.depth * factor;
      event.width = 100 - event.left;
    });
    return events;
  }

  const dayEventsVerified = getEventsProps(dayEvents);

  const scrollToRef = () => {
    if (!needleRef.current) return;
    needleRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const interval = setTimeout(() => {
      scrollToRef();
    }, 100);
    return () => interval;
  }, [currentWeek]);

  return (
    <div>
      <Needle date={date} needleRef={needleRef} />
      {hourIndexes.map((hour) => (
        <div key={hour} style={{position: "relative"}}>
          <HourCell hour={hour} drag={drag} date={date} />
          <DayEvents hour={hour} drag={drag} events={dayEventsVerified} />
          <EventSelector hour={hour} drag={drag} day={day} />
        </div>
      ))}
    </div>
  )
}

export default Hours
