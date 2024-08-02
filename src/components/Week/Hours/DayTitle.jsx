import { Box, Typography } from "@mui/material";
import { getDayName } from "../../../utils/getDayName";
import PropTypes from 'prop-types';
import { isToday } from "../../../utils/isToday";

DayTitle.propTypes = {
  date: PropTypes.instanceOf(Date),
};
function DayTitle({ date }) {

  return (
      <Box sx={containerStyle}>
          <Box sx={cellStyle} height={20}>
            <Typography
              sx={{fontSize: 12,
              color: isToday(date) ? "#3786ed" : "#656464"}}
            >
              {getDayName(date)}
            </Typography>
          </Box>
          <Box sx={cellStyle} height={30} pb={1.2}>
            <Typography sx={textStyle(isToday(date))}>
              {date.getDate()}
            </Typography>
          </Box>
      </Box>
  )
}

const textStyle = (isToday) => ({
  color: isToday ? "#ffffff" : "#656464",
  backgroundColor: isToday ? "#3786ed" : "transparent",
  fontSize: 25,
  width: 40,
  height: 40,
  borderRadius: 50,
  fontWeight: isToday ? 300 : 500,
  userSelect: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
})

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  position: "sticky",
  top: 0,
  zIndex: 91,
  borderBottom: "0.5px solid #656464",
  borderTop: "0.5px solid #656464"
};

const cellStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  backgroundColor: "white",
  minWidth: 120,
  border: "0.5pt solid transparent",

};

export default DayTitle;
