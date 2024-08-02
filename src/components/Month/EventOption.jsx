import { Box, Typography } from "@mui/material"

import { getHourByIndex } from "../Week/Hours/utils/getHourByIndex";
import { getColorByUser } from "../Week/Hours/utils/getColorByUser";
import { useEventModalStore } from "../../data/eventModal/useEventModalStore";
import { eventOptionStyle } from "./eventOptionStyle";

import PropTypes from 'prop-types';

EventOption.propTypes = {
  event: PropTypes.object,
};
function EventOption({ event }) {

  const setEvent = useEventModalStore((state) => state.setEvent);

  const handleEventClick = (e, event) => {
    e.stopPropagation();
    setEvent(event);
  }

  return (
    <Box onClick={(e)=>handleEventClick(e, event)} sx={eventOptionStyle}>

      <div style={{...iconStyle, backgroundColor: getColorByUser(event.user)}}/>

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
