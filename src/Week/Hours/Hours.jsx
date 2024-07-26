import { hourIndexes } from './utils/hourIndexes';
import EventSelector from './EventSelector';
import HourCell from './HourCell';

import PropTypes from 'prop-types';
import DayEvents from './DayEvents';

Hours.propTypes = {
  day: PropTypes.number.isRequired,
  drag: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired,
};
function Hours({ day, drag, events }) {



  const dayEvents = events.filter((event) => event.day === day);

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
    if (day !== 0) return [];

    for (let i = 0; i < events.length; i++) {
      const next = findOverlap(events[i], events);
      if (next !== -1 && i > 0) {
        const last = lastOverlap(events[i], events, i - 1);
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

    console.log(events);

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

  return (
    <div>
      {hourIndexes.map((hour) => (
        <div key={hour} style={{position: "relative"}}>
          <HourCell hour={hour} drag={drag} day={day} />
          <DayEvents day={day} hour={hour} drag={drag} events={dayEventsVerified} />
          <EventSelector hour={hour} drag={drag} day={day} />
        </div>
      ))}
    </div>
  )
}

export default Hours
