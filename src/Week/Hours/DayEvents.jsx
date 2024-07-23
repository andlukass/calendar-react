
import PropTypes from 'prop-types';
import Event from './Event';

DayEvents.propTypes = {
  hour: PropTypes.number.isRequired,
  drag: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired,
};
function DayEvents({ hour, drag, events }) {

  if (!events || !events.length) return null;
  const day = events[0].day;

  return (
    <>
      {events.map((event) => (
        event.day === day && event.start === hour &&
        <Event key={event.id}
          title={event.title}
          start={event.start}
          color={event.user}
          end={event.end}
          drag={drag}
        />
      ))
      }
    </>
  )
}

export default DayEvents
