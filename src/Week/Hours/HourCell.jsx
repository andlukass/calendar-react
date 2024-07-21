import { Box } from '@mui/material'

import PropTypes from 'prop-types';

HourCell.propTypes = {
  hour: PropTypes.number.isRequired,
  drag: PropTypes.object.isRequired,
};
function HourCell({ hour, drag }) {
  
  const { startDraggin, stopDraggin, updateEnd } = drag;

  return (
    <Box onDragStart={(e)=>startDraggin(e, hour)}
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
  border: hour.isDragOver ? "0.5pt solid transparent" : "0.5pt solid grey",
  borderTop: "0.5pt solid transparent",
  borderBottom: hour.hour % 2 !== 0 ? "0.5pt solid grey" : "0.5pt solid transparent",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  minWidth: 130,
  height: 25,
});

export default HourCell;
