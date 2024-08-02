import { hourIndexes } from '../../../utils/hourIndexes';
import EventSelector from './EventSelector';
import HourCell from './HourCell';

import DayEvents from './DayEvents';
import PropTypes from 'prop-types';
import Needle from './Needle';
import { getDayEvents } from './getDayEvents';

Hours.propTypes = {
  date: PropTypes.instanceOf(Date),
  drag: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired,
  currentDate: PropTypes.instanceOf(Date),
};
function Hours({ date, drag, events, currentDate }) {

  const dayEvents = getDayEvents(events, date);

  return (
    <div>
      <Needle date={date} currentDate={currentDate} />
      {hourIndexes.map((hour) => (
        <div key={hour} style={{position: "relative"}}>
          <HourCell hour={hour} drag={drag} date={date} />
          <DayEvents hour={hour} drag={drag} events={dayEvents} />
          <EventSelector hour={hour} drag={drag} day={date.getDate()} />
        </div>
      ))}
    </div>
  )
}

export default Hours
