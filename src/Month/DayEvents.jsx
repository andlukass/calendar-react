import { Box } from "@mui/material"
import { useWindowSize } from 'usehooks-ts'

import { useEffect, useState } from "react";
import MoreEventsList from "./MoreEventsList";
import EventOption from "./EventOption";

import PropTypes from 'prop-types';

DayEvents.propTypes = {
  day: PropTypes.instanceOf(Date),
  events: PropTypes.array,
};
function DayEvents({ events, day }) {

  const { height } = useWindowSize();

  const dayEvents = events.filter(event => {
    const date = new Date(event.date);
    return date.getDate() === day.getDate() &&
    date.getMonth() === day.getMonth() &&
    date.getFullYear() === day.getFullYear()
  });

  const [rows, setRows] = useState(0);

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
    calculateRows();
  }, [height])

  return (
    <>

      {dayEvents.map((event, index) => (
        <Box key={index}>
          {(index < rows || dayEvents.length === 1) &&
          <EventOption event={event} />}
        </Box>
      ))}

      {dayEvents.length > rows && dayEvents.length !== 1 &&
        <MoreEventsList events={dayEvents}
          title={!rows ? dayEvents.length+" eventos" :
          "mais "+(dayEvents.length - rows)}
        />
      }

    </>
  )
}

export default DayEvents;
