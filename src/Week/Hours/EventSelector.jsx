import Event from './Event';
import { getHourByIndex } from './utils/getHourByIndex';

import PropTypes from 'prop-types';

EventSelector.propTypes = {
  hour: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
  drag: PropTypes.object.isRequired,
};
function EventSelector({ hour, day, drag }) {

  const { dragStart, dragEnd, dragDay } = drag;

  const getStart = () => {
    return dragStart - dragEnd < 0 ? dragStart : dragEnd;
  }

  return (
    <>
      {
        hour === getStart() && day == dragDay ?
        <Event start={dragStart} end={dragEnd} title={`Novo Evento
          ${getHourByIndex(dragStart)}-${getHourByIndex(dragEnd)}`} /> : null
      }
    </>
  )
}

export default EventSelector;
