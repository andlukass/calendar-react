import { Box, Typography } from "@mui/material"
import { useWindowSize } from 'usehooks-ts'

import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { getHourByIndex } from "../Week/Hours/utils/getHourByIndex";
import { getColorByUser } from "../Week/Hours/utils/getColorByUser";
import { useEventModalStore } from "../data/eventModal/useEventModalStore";

DayEvents.propTypes = {
  day: PropTypes.instanceOf(Date),
  events: PropTypes.array,
};
function DayEvents({ events, day }) {

  const { height } = useWindowSize();

  const setEvent = useEventModalStore((state) => state.setEvent);

  const dayEvents = events.filter(event => {
    const date = new Date(event.date);
    return date.getDate() === day.getDate() &&
    date.getMonth() === day.getMonth() &&
    date.getFullYear() === day.getFullYear()
  });

  const [rows, setRows] = useState(0)

  const calculateRows = () => {
    let rows;
    if (height < 420) rows = 0
    else if (height < 520) rows = 1
    else if (height < 620) rows = 2
    else if (height < 720) rows = 3
    else if (height < 820) rows = 4
    else if (height < 920) rows = 5
    else if (height < 1050) rows = 6
    else rows = 7
    setRows(rows);
  }

  useEffect(() => {
    calculateRows()
  }, [height])

  const handleEventClick = (e, event) => {
    e.stopPropagation();
    setEvent(event);
  }

  return (
    <>
      <Box>
        {dayEvents.map((event, index) => (
          <Box key={index}>

            {index < rows &&
            <Box onClick={(e)=>handleEventClick(e, event)} sx={eventStyle}>

              <div style={{...iconStyle, backgroundColor: getColorByUser(event.user)}}/>

              <Typography sx={{fontSize: 12, color: "#656464"}}>
                {getHourByIndex(event.start)}&nbsp;
              </Typography>

              <Typography sx={{fontSize: 12, color: "#333333", fontWeight: 600}}>
                {event.title}
              </Typography>

            </Box>
            }

            {dayEvents.length > rows && index === rows - 1 &&
            <Box sx={eventStyle}>
              <Typography sx={titleStyle}>mais {dayEvents.length - rows}</Typography>
            </Box>}

            {!rows && !index &&
            <Box sx={eventStyle}>
              <Typography sx={titleStyle}>{dayEvents.length} eventos</Typography>
            </Box>}

          </Box>
        ))}
      </Box>
    </>
  )
}


const eventStyle = {
  display: "flex",
  alignItems: "center",
  m: 0.1,
  marginRight: 0.5,
  marginLeft: 0.5,
  borderRadius: 1,
  cursor: "pointer",
  '&:hover': {
    backgroundColor: '#ececec',
  },
}

const iconStyle = {
  minWidth: 7, 
  minHeight: 7,
  marginRight: 3,
  borderRadius: 5,
}

const titleStyle = {
  fontSize: 12,
  color: "#333333",
  fontWeight: 600,
}

export default DayEvents
