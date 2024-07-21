import Event from './Event';
import { getHourByIndex } from './utils/getHourByIndex';

import PropTypes from 'prop-types';

EventSelector.propTypes = {
  hour: PropTypes.number.isRequired,
  dragStart: PropTypes.number,
  dragEnd: PropTypes.number,
};
function EventSelector({ hour, day, dragStart, dragEnd }) {

  const getStart = () => {
    return dragStart - dragEnd < 0 ? dragStart : dragEnd;
  }

  return (
    <>
      {
        hour === getStart() ?
        <Event start={dragStart} end={dragEnd} title={`Novo Evento
          ${getHourByIndex(dragStart)}-${getHourByIndex(dragEnd)}`} /> : null
      }
    </>
  )
}

export default EventSelector;
