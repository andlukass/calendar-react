import { Grid } from "@mui/material"

import { useEventModalStore } from "../../data/eventModal/useEventModalStore";
import DayEvents from "./DayEvents";
import DayTitle from "./DayTitle";
import { getDaysArray } from "./getDaysArray";

import PropTypes from 'prop-types';

Month.propTypes = {
  currentDate: PropTypes.instanceOf(Date),
  events: PropTypes.array,
};
function Month({ currentDate, events }) {

  const setEvent = useEventModalStore((state) => state.setEvent);

  const days = getDaysArray(currentDate);

  const createEvent = (e, date) => {
    e.stopPropagation();
    setEvent({ start: null, end: null, date: date });
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
