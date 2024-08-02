
import PropTypes from 'prop-types';
import Event from './Event';
import { useEventModalStore } from '../../../data/eventModal/useEventModalStore';

DayEvents.propTypes = {
  hour: PropTypes.number.isRequired,
  drag: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired,
};
function DayEvents({ hour, drag, events }) {

  const setEvent = useEventModalStore((state) => state.setEvent);

  if (!events || !events.length) return null;
  const day = events[0].day;

  return (
    <>
      {events.map((event) => (
        event.day === day && event.start === hour &&
        <Event onClick={()=>setEvent(event)}
          key={event.id}
          event={event}
          drag={drag}
        />
      ))
      }
    </>
  )
}

export default DayEvents
