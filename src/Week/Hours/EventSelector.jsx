import Event from './Event';
import { getHourByIndex } from './utils/getHourByIndex';

import PropTypes from 'prop-types';

EventSelector.propTypes = {
  hour: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
  drag: PropTypes.object.isRequired,
};
function EventSelector({ hour, day, drag }) {

  const { eventDragStart, dragStart, dragEnd, dragDay } = drag;

  const getStart = () => {
    return dragStart - dragEnd < 0 ? dragStart : dragEnd;
  }

  const getEnd = () => {
    return dragStart - dragEnd < 0 ? dragEnd : dragStart
  }

  const title = Math.abs(dragStart - dragEnd) === 0 ? `Novo Evento, ${getHourByIndex(dragStart)}`
    : `Novo Evento\n${getHourByIndex(getStart())} - ${getHourByIndex(getEnd() + 1)}`;

    const event = {
      start: getStart(),
      title: title,
      end: getEnd(),
      day: dragDay,
      width: 120,
    }

  return (
    <>
      { eventDragStart === -1 && hour === getStart() && day === dragDay &&
      <Event event={event} />}
    </>
  )
}

export default EventSelector;
