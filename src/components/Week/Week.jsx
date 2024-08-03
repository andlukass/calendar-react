import { Box } from "@mui/material";
import Hours from "./Hours/Hours";
import useDrag from "../useDrag";
import HourMeter from "./HourMeter";
import DayTitle from "./Hours/DayTitle";
import { getWeekDates } from "./utils/getWeekDays";

import PropTypes from 'prop-types';

Week.propTypes = {
  currentDate: PropTypes.instanceOf(Date),
  events: PropTypes.array,
};
function Week({ currentDate, events }) {

  const drag = useDrag();

  const weekDays = getWeekDates(currentDate);

  return (
    <>
      <Box id="hide-scroll" sx={containerStyle}>

        <Box sx={daysTitleStyle}>
          {weekDays.map((date, index) => <DayTitle key={index} date={date} />)}
        </Box>

        <Box sx={{display: "flex"}}>
          <HourMeter />
          {weekDays.map((date, index) => 
            <Hours
              currentDate={currentDate}
              events={events}
              drag={drag}
              date={date}
              key={index}
            />
          )}
        </Box>

      </Box>
    </>
  )
}

const containerStyle = {
  overflow: "auto",
  minHeight: "90vh",
  height: "90vh",
  position: "relative",
};

const daysTitleStyle = {
  position: 'sticky',
  display: 'flex',
  top: 0,
  paddingLeft: 8,
  backgroundColor: 'white',
  width: 900,
  zIndex: 100
};


export default Week;
