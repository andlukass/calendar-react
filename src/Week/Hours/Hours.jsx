import { hourIndexes } from './utils/hourIndexes';
import EventSelector from './EventSelector';
import HourCell from './HourCell';

import PropTypes from 'prop-types';
import DayEvents from './DayEvents';
import { events } from './utils/events';

Hours.propTypes = {
  day: PropTypes.number.isRequired,
  drag: PropTypes.object.isRequired,
};
function Hours({ day, drag }) {

  const dayEvents = events.filter((event) => event.day === day);

  return (
    <div>
      {hourIndexes.map((hour) => (
        <div key={hour} style={{position: "relative"}}>
          <HourCell hour={hour} drag={drag} day={day} />
          <DayEvents day={day} hour={hour} drag={drag} events={dayEvents} />
          <EventSelector hour={hour} drag={drag} day={day} />
        </div>
      ))}
    </div>
  )
}

export default Hours
