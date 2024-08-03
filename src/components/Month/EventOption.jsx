import { Box, Typography } from "@mui/material"

import { getHourByIndex } from "../../utils/getHourByIndex";
import { getColorByType } from "../../utils/getColorByType";
import { useEventModalStore } from "../../data/eventModal/useEventModalStore";
import { eventOptionStyle } from "./eventOptionStyle";

import PropTypes from 'prop-types';

EventOption.propTypes = {
  event: PropTypes.object,
  drag: PropTypes.object,
  close: PropTypes.func,
};
function EventOption({ event, drag, close }) {

  const setEvent = useEventModalStore((state) => state.setEvent);

  const handleEventClick = (e, event) => {
    e.stopPropagation();
    setEvent(event);
  }

  return (
    <Box onClick={(e)=>handleEventClick(e, event)} sx={eventOptionStyle}
      draggable
      onDragStart={()=>{
        if (close) close();
        drag.startEventDraggin(event.date.getDate(), null, event.id)}
      }
    >

      <div style={{...iconStyle, backgroundColor: getColorByType(event.user)}}/>

      <Typography sx={{fontSize: 12, color: "#656464"}}>
        {getHourByIndex(event.start)}&nbsp;
      </Typography>

      <Typography sx={{fontSize: 12, color: "#333333", fontWeight: 600}}>
        {event.title}
      </Typography>

    </Box>
  )
}

const iconStyle = {
  minWidth: 7, 
  minHeight: 7,
  marginRight: 3,
  borderRadius: 5,
}

export default EventOption;
