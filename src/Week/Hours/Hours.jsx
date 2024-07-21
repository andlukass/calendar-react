import { hourIndexes } from './utils/hourIndexes';
import EventSelector from './EventSelector';
import HourCell from './HourCell';

import PropTypes from 'prop-types';

Hours.propTypes = {
  drag: PropTypes.object.isRequired,
};
function Hours({ drag }) {

  const { dragStart, dragEnd } = drag;

  return (
    <div>
      {hourIndexes.map((hour) => (
        <div key={hour} style={{position: "relative"}}>
          <HourCell hour={hour} drag={drag}/>
          <EventSelector hour={hour}
            dragStart={dragStart}
            dragEnd={dragEnd} />
        </div>
      ))}
    </div>
  )
}

export default Hours
