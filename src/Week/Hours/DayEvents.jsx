
import PropTypes from 'prop-types';
import Event from './Event';
import { users } from '../../data/users/users';

DayEvents.propTypes = {
  hour: PropTypes.number.isRequired,
  drag: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired,
};
function DayEvents({ hour, drag, events }) {

  if (!events || !events.length) return null;
  const day = events[0].day;

  const eventColor = (eventUser) => 
    users.find((user) => user.id === eventUser).color;

  return (
    <>
      {events.map((event) => (
        event.day === day && event.start === hour &&
        <Event key={event.id}
          title={event.title}
          start={event.start}
          color={eventColor(event.user)}
          end={event.end}
          left={event.left}
          drag={drag}
          width={event.width ? event.width : 100}
        />
      ))
      }
    </>
  )
}

export default DayEvents
