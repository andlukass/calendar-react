import { Grid } from "@mui/material"

import PropTypes from 'prop-types';
import DayEvents from "./DayEvents";
import { useEventModalStore } from "../../data/eventModal/useEventModalStore";
import DayTitle from "./DayTitle";

Month.propTypes = {
  currentDate: PropTypes.instanceOf(Date),
  events: PropTypes.array,
};
function Month({ currentDate, events }) {

  const setEvent = useEventModalStore((state) => state.setEvent);

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

  const createEvent = (e, date) => {
    e.stopPropagation();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const eventDate = new Date(`${date.getFullYear()}/${month}/${day}`);
    setEvent({
      start: null,
      end: null,
      date: eventDate,
    });
  };

  return (
    <>
      <Grid id="hide-scroll" container sx={gridContainerStyle}>

        { days.map((day, index) => (
          <Grid key={index} item xs={12 / 7} sx={gridItemStyle}
            onClick={(e)=>createEvent(e, day)}
          >

            <DayTitle day={day} index={index} />
            <DayEvents day={day} events={events} />

          </Grid>
          ))
        }

      </Grid>
    </>
  )
}

const gridContainerStyle = {
  display: "flex",
  overflow: "auto",
  width: 900,
  minHeight: "90vh",
  height: "90vh",
  position: "relative",
  boxShadow: "0 0 0 0.10px #656464",
}

const gridItemStyle = {
  height: "20%",
  boxShadow: "0 0 0 0.10px #656464",
  maxHeight: 180,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
}

export default Month
