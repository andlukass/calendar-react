import { hourIndexes } from './utils/hourIndexes';
import EventSelector from './EventSelector';
import HourCell from './HourCell';

import PropTypes from 'prop-types';
import WeekEvents from './WeekEvents';

Hours.propTypes = {
  day: PropTypes.number.isRequired,
  drag: PropTypes.object.isRequired,
};
function Hours({ day, drag }) {

  return (
    <div>
      {hourIndexes.map((hour) => (
        <div key={hour} style={{position: "relative"}}>
          <HourCell hour={hour} drag={drag} day={day} />
          <WeekEvents day={day} hour={hour} drag={drag} />
          <EventSelector hour={hour} drag={drag} day={day} />
        </div>
      ))}
    </div>
  )
}

export default Hours
