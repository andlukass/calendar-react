import { Box, Typography } from '@mui/material'
import { getEventHeight } from './utils/getEventHeight';

import PropTypes from 'prop-types';

Event.propTypes = {
  title: PropTypes.string.isRequired,
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  drag: PropTypes.object,
  color: PropTypes.string,
  width: PropTypes.number,
};
function Event({ width, start, end, drag, color, title }) {

  const height = getEventHeight(start, end);

  return (
    <>
      <Box sx={eventStyle(width, height, color, drag)}
        draggable={drag ? true : false}>
        <Typography variant='p'>{title}</Typography>
      </Box>
    </>
  )
}

const eventStyle = (width, height, color, drag) => ({
  pointerEvents: drag ? "auto" : "none",
  whiteSpace: 'pre-line',
  position: "absolute",
  top: 2,
  left: 4,
  width: width ? width : 120,
  height: height,
  display: "flex",
  justifyContent: "center",
  backgroundColor: color ? color : "#9441d8",
  borderRadius: 3,
  border: "1pt solid white",
  color: "white",
  pt: 1,
  fontSize: 12,
  zIndex: width ? 89 : 90,
  transition: "0.1s",
});

export default Event;
