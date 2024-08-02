import { Box, Typography } from "@mui/material"

import PropTypes from 'prop-types';
import { getDayName } from "../../utils/getDayName";
import { isToday } from "../../utils/isToday";

DayTitle.propTypes = {
  index: PropTypes.number,
  day: PropTypes.instanceOf(Date),
};
function DayTitle({ index, day }) {

  return (
    <>
      {index < 7 && 
        <Box sx={dayLabelStyle}>
          <Typography sx={{fontSize: 12}}>
            {getDayName(day)}
          </Typography>
        </Box>
      }
      <Box sx={dayLabelStyle}>
        <Typography sx={dayTitleStyle(isToday(day))}>
          {day.getDate()}
        </Typography>
      </Box>
    </>
  )
}

const dayTitleStyle = (isToday) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: isToday ? "#3786ed" : "transparent",
  color: isToday ? "#ffffff" : "#656464",
  fontSize: 12,
  width: 17,
  height: 17,
  borderRadius: 50,
  fontWeight: isToday ? 300 : 300,
  userSelect: "none",
});

const dayLabelStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#656464",
  fontSize: 12,
}

export default DayTitle;
