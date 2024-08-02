import { Box } from "@mui/material";
import Hours from "./Hours/Hours";
import useDrag from "./useDrag";
import HourMeter from "./HourMeter";

import PropTypes from 'prop-types';

Week.propTypes = {
  currentDate: PropTypes.instanceOf(Date),
  events: PropTypes.array,
};
function Week({ currentDate, events }) {

  const drag = useDrag();

  const getWeekDates = (currentDate) => {
    const startDate = new Date(
      currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay()
    );
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      weekDays.push(date);
    }
    return weekDays;
  }

  const weekDays = getWeekDates(currentDate);

  return (
    <>
      <Box id="hide-scroll" sx={{display: "flex", overflow: "auto", height: "90vh", position: "relative"}}>
        <HourMeter />
        {weekDays.map((date, index) => (
          <Hours events={events} currentWeek={currentDate} drag={drag} date={date} key={index} />
        ))}
      </Box>
    </>
  )
}

export default Week;
