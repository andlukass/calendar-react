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

  const title = Math.abs(dragStart - dragEnd) === 0 ? `Novo Evento, ${getHourByIndex(dragStart)}`
    : `Novo Evento\n${getHourByIndex(dragStart)} - ${getHourByIndex(dragEnd + 1)}`;

  return (
    <>
      { hour === getStart() && day == dragDay &&
      <Event start={dragStart} end={dragEnd} title={title} />}
    </>
  )
}

export default EventSelector;
