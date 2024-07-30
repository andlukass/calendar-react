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
    return dragStart.current - dragEnd.current < 0 ? dragStart.current : dragEnd.current;
  }

  const getEnd = () => {
    return dragStart.current - dragEnd.current < 0 ? dragEnd.current : dragStart.current
  }

  const title = Math.abs(dragStart.current - dragEnd.current) === 0 ? `Novo Evento, ${getHourByIndex(dragStart.current)}`
    : `Novo Evento\n${getHourByIndex(getStart())} - ${getHourByIndex(getEnd() + 1)}`;

    const event = {
      start: getStart(),
      title: title,
      end: getEnd(),
      day: dragDay.current,
      width: 120,
    }

  return (
    <>
      { eventDragStart.current === -1 && hour === getStart() && day === dragDay.current &&
      <Event event={event} />}
    </>
  )
}

export default EventSelector;
