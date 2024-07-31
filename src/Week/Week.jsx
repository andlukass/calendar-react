import { Box } from "@mui/material";
import Hours from "./Hours/Hours";
import useDrag from "./useDrag";

import HourMeter from "./HourMeter";
import { useEventsStore } from "../data/events/useEventsStore";

import PropTypes from 'prop-types';

Week.propTypes = {
  today: PropTypes.instanceOf(Date),
};
function Week({ today }) {

  const events = useEventsStore((state) => state.events);

  const drag = useDrag();

  const getWeekDates = (today) => {
    const startDate = new Date(
      today.getFullYear(), today.getMonth(), today.getDate() - today.getDay()
    );
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      weekDays.push(date);
    }
    return weekDays;
  }

  const weekDays = getWeekDates(today);

  return (
    <>
      <Box id="hide-scroll" sx={{display: "flex", overflow: "auto", height: "90vh", position: "relative"}}>
        <HourMeter />
        {weekDays.map((date, index) => (
          <Hours events={events} currentWeek={today} drag={drag} date={date} key={index} />
        ))}
      </Box>
    </>
  )
}

export default Week;
