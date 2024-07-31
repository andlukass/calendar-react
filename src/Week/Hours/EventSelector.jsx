import Event from './Event';
import { getHourByIndex } from './utils/getHourByIndex';

import PropTypes from 'prop-types';

EventSelector.propTypes = {
  hour: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
  drag: PropTypes.object.isRequired,
};
function EventSelector({ hour, day, drag }) {

  const { eventDragStart, dragDay, eventSelectorEnd, dragStart } = drag;

  const getStart = () => {
    return dragStart.current - eventSelectorEnd < 0 ? dragStart.current : eventSelectorEnd;
  }

  const getEnd = () => {
    return dragStart.current - eventSelectorEnd < 0 ? eventSelectorEnd : dragStart.current;
  }

  const title = Math.abs(dragStart.current - eventSelectorEnd) === 0 ? `Novo Evento, ${getHourByIndex(dragStart.current)}`
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
