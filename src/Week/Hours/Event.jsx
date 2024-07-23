import { Box, Typography } from '@mui/material'
import { getEventHeight } from './utils/getEventHeight';

import PropTypes from 'prop-types';
import { useState } from 'react';

Event.propTypes = {
  title: PropTypes.string.isRequired,
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  drag: PropTypes.object,
  color: PropTypes.string,
  width: PropTypes.number,
};
function Event({ width, start, end, drag, color, title }) {

  const [opacity, setOpacity] = useState(1);

  const height = getEventHeight(start, end + 1);
  const finalWidth = !drag ? 120 : width;

  return (
    <>
      <Box onDragStart={()=>setOpacity(0.5)}
        onDragEnd={()=>setOpacity(1)}
        sx={eventStyle(finalWidth, height, color, opacity, drag)}
        draggable={drag ? true : false}>
        <Typography variant='p' sx={{userSelect: "none"}}>
          {title}
        </Typography>
      </Box>
    </>
  )
}

const eventStyle = (width, height, color, opacity, drag) => ({
  pointerEvents: drag ? (drag.dragStart ? "none" : "auto") : "none",
  textAlign: "center",
  whiteSpace: 'pre-line',
  position: "absolute",
  top: -1,
  left: 0,
  opacity: opacity,
  width: width ? width : 100,
  height: height,
  display: "flex",
  justifyContent: "center",
  backgroundColor: color ? color : "#9441d8",
  borderRadius: 2,
  border: "1pt solid white",
  color: "white",
  pt: 1,
  fontSize: 12,
  zIndex: drag ? 89 : 90,
  transition: "0.1s",
  
});

export default Event;
