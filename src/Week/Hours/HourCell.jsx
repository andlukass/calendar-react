import { Box } from '@mui/material'

import PropTypes from 'prop-types';

HourCell.propTypes = {
  day: PropTypes.number.isRequired,
  hour: PropTypes.number.isRequired,
  drag: PropTypes.object.isRequired,
};
function HourCell({ day, hour, drag }) {
  
  const { startDraggin, stopDraggin, updateEnd } = drag;

  return (
    <Box onDragStart={()=>startDraggin(day, hour)}
      onDragEnd={()=>stopDraggin(hour)}
      onDrop={()=>stopDraggin(hour)}
      onDragOver={(e) => {
        e.preventDefault();
        updateEnd(hour);
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
  minWidth: 130,
  height: 25,
});

export default HourCell;
