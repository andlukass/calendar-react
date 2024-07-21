
import PropTypes from 'prop-types';
import { events } from './utils/events';
import Event from './Event';

WeekEvents.propTypes = {
  day: PropTypes.number.isRequired,
  hour: PropTypes.number.isRequired,
  drag: PropTypes.object.isRequired,
};
function WeekEvents({ day, hour, drag }) {

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

export default WeekEvents
