import { Box } from '@mui/material'

import PropTypes from 'prop-types';
import { useEventModalStore } from '../../data/eventModal/useEventModalStore';

HourCell.propTypes = {
  date: PropTypes.instanceOf(Date),
  hour: PropTypes.number.isRequired,
  drag: PropTypes.object.isRequired,
};
function HourCell({ date, hour, drag }) {
  
  const { dragStart, startDraggin, stopDraggin, updateEnd } = drag;
  const setEvent = useEventModalStore((state) => state.setEvent);

  const createEvent = (start) => {
    const eventEnd = Math.max(hour, start);
    const eventStart = Math.min(hour, start);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const eventDate = new Date(`${date.getFullYear()}/${month}/${day}`);
    setEvent({
      start: eventStart,
      end: eventEnd,
      date: eventDate,
    });
    stopDraggin();
  };

  return (
    <Box onDragStart={()=>startDraggin(date.getDate(), hour)}
      onDragEnd={()=>{stopDraggin()}}
      onDrop={()=>{
        if (dragStart.current === -1) return;
        createEvent(dragStart.current)
      }}
      onClick={()=>createEvent(hour)}
      onDragOver={(e) => {
        e.preventDefault();
        updateEnd(date.getDate(), date.getMonth() + 1, date.getFullYear(), hour);
      }}
      className="draggable-item"
      sx={cellStyle(hour)}
      key={hour} 
      draggable
    />
  )
}

const cellStyle = (hour) => ({
  border: "0.5pt solid grey",
  borderBottom: hour % 2 !== 0 ? "0.5pt solid #cdcdcd" : "0.5pt solid transparent",
  borderLeft: "0.5pt solid #cdcdcd",
  borderTop: "0.5pt solid transparent",
  borderRight: "0.5pt solid transparent",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  minWidth: 120,
  height: 25,
});

export default HourCell;
