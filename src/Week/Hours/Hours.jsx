import { hourIndexes } from './utils/hourIndexes';
import EventSelector from './EventSelector';
import HourCell from './HourCell';

import PropTypes from 'prop-types';

Hours.propTypes = {
  day: PropTypes.number.isRequired,
  drag: PropTypes.object.isRequired,
};
function Hours({ day, drag }) {

  const { dragStart, dragEnd } = drag;

  return (
    <div>
      {hourIndexes.map((hour) => (
        <div key={hour} style={{position: "relative"}}>
          <HourCell hour={hour} drag={drag} day={day} />
          <EventSelector hour={hour} day={day}
            dragStart={dragStart}
            dragEnd={dragEnd} />
        </div>
      ))}
    </div>
  )
}

export default Hours
