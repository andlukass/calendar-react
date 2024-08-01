import { Box, Grid, Typography } from "@mui/material"

import PropTypes from 'prop-types';
import { getDayName } from "../Week/Hours/utils/getDayName";

Month.propTypes = {
  currentDate: PropTypes.instanceOf(Date),
};
function Month({ currentDate }) {

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
  }

  const addDaysToDate = (date, days) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    return newDate;
  }

  const firstDayMonth = new Date(
    currentDate.getFullYear(), currentDate.getMonth(), 1
  );

  const getFirstDayPage = () => {
    const day = firstDayMonth.getDay();
    return addDaysToDate(firstDayMonth, -day);
  }

  const firstDay = getFirstDayPage();

  const getArrayDays = (firstDay) => {
    const days = [];
    for (let i = 0; i < 35; i++) {
      const date = addDaysToDate(firstDay, i);
      days.push(date);
    }
    return days;
  }

  const days = getArrayDays(firstDay);

  return (
    <>
      <Box id="hide-scroll" >
        <Grid container sx={{display: "flex",
          overflow: "auto",
          width: 900,
          height: "90vh",
          position: "relative", boxShadow: "0 0 0 0.10px #656464"}}>

        { days.map((day, index) => (
          <Grid item xs={12 / 7} sx={{height:"20%", boxShadow: "0 0 0 0.10px #656464"}} key={index}>
            {index < 7 && (
              <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", color: "#656464" }}>
                {getDayName(day)}
              </Box>
            )
            }
            <Box key={day} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
              <Typography sx={dayTitleStyle(isToday(day))}>
                {day.getDate()}
              </Typography>
            </Box>
          </Grid>
          ))
        }

        </Grid>
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

export default Month
