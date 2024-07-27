import { Box } from '@mui/material'

import PropTypes from 'prop-types';
import { useEventModalStore } from '../../data/eventModal/useEventModalStore';

HourCell.propTypes = {
  day: PropTypes.number.isRequired,
  hour: PropTypes.number.isRequired,
  drag: PropTypes.object.isRequired,
};
function HourCell({ day, hour, drag }) {
  
  const { dragStart, startDraggin, stopDraggin, updateEnd } = drag;
  const setEvent = useEventModalStore((state) => state.setEvent);

  const createEvent = (start) => {
    const eventEnd = Math.max(hour, start);
    const eventStart = Math.min(hour, start);
    setEvent({
      day: day,
      start: eventStart,
      end: eventEnd,
    });
    stopDraggin();
  };

  return (
    <Box onDragStart={()=>startDraggin(day, hour)}
      onDragEnd={()=>{stopDraggin()}}
      onDrop={()=>{
        if (dragStart === -1) return;
        createEvent(dragStart)
      }}
      onClick={()=>createEvent(hour)}
      onDragOver={(e) => {
        e.preventDefault();
        updateEnd(day, hour);
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
