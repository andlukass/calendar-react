import { Box, Typography } from '@mui/material'

import PropTypes from 'prop-types';
import useEvent from './useEvent';
import { useState } from 'react';

Event.propTypes = {
  event: PropTypes.object,
  drag: PropTypes.object,
  onClick: PropTypes.func,
};
function Event({ event, drag, onClick}) {

  const { eventContainerRef,
    handleDragStart,
    handleDragOver,
    handleDragEnd, eventProps } = useEvent({ event, drag });

    const [isDragging, setIsDragging] = useState(false);

  return (
    <>
      <Box ref={eventContainerRef} onClick={onClick}
        sx={containerStyle(eventProps, drag, isDragging)}
        onDragEnd={(e)=>{handleDragEnd(e);setIsDragging(false)}}
      >
        <Box sx={cellStyle} draggable
        onDragOver={(e)=>handleDragOver(e, event.start)}
        onDragStart={(e)=>{handleDragStart(e, -1);setIsDragging(true)}}>
          <Typography variant='body1' sx={titleStyle}>
            {!isDragging && event.title}
            {/* {drag ? ((drag.dragEvent.current === 1
              && eventProps.id !== drag.dragEvent.current
            ) ? "none" : "auto") : "none"} */}
          </Typography>
        </Box>
        { eventProps.size > 1 &&
          Array.from({ length: (eventProps.size - 1) }, (_, index) => index + 1).map((item, index) => (
            <Box key={index} sx={cellStyle} draggable
              onDragOver={(e)=>handleDragOver(e, event.start+index+1)}
              onDragStart={(e)=>{handleDragStart(e, index);setIsDragging(true)}}
            />
          ))
        }
      </Box>
    </>
  )
}

const titleStyle = {
  fontWeight: "bold",
  fontSize: 12,
  userSelect: "none",
  mt: 3,
  textAlign: "start",
};

const cellStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: 25,
  p:0,
  border: "0.5pt solid transparent",
}

const containerStyle = (eventProps, drag) => ({
  pointerEvents: "auto",
  textAlign: "center",
  whiteSpace: 'pre-line',
  cursor: 'pointer',
  position: "absolute",
  top: -1,
  left: eventProps.left,
  opacity: eventProps.opacity,
  width: eventProps.width ? eventProps.width : 100,
  height: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  backgroundColor: eventProps.color ? eventProps.color : "#9441d8",
  borderRadius: 2,
  border: "1pt solid white",
  color: "white",
  fontSize: 12,
  zIndex: drag ? 89 : 90,
  transition: "0.1s",

});

export default Event;
