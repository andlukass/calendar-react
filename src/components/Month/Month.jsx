import { Grid } from "@mui/material"

import { useEventModalStore } from "../../data/eventModal/useEventModalStore";
import DayEvents from "./DayEvents";
import DayTitle from "./DayTitle";
import { getDaysArray } from "./getDaysArray";

import PropTypes from 'prop-types';
import useDrag from "../useDrag";
import { useEventsStore } from "../../data/events/useEventsStore";

Month.propTypes = {
  currentDate: PropTypes.instanceOf(Date),
  events: PropTypes.array,
};
function Month({ currentDate, events }) {

  const setEvent = useEventModalStore((state) => state.setEvent);
  const editEvent = useEventsStore((state) => state.editEvent);
  const drag = useDrag();

  const days = getDaysArray(currentDate);

  const createEvent = (e, date) => {
    e.stopPropagation();
    setEvent({ start: null, end: null, date: date });
  };

  const handleEndDrag = () => {
    const id = drag.dragEvent.current;
    const year = drag.dragYear.current;
    const month = drag.dragMonth.current;
    const day = drag.dragDay.current;
    let event = JSON.parse(
      JSON.stringify(events.find((event) => event.id === id))
    );
    const newDate = new Date(`${year}-${month}-${day}`);
    event.date = newDate;
    editEvent(event);
    drag.stopDraggin();
  }

  return (
    <>
      <Grid id="hide-scroll" container sx={gridContainerStyle}>

        { days.map((day, index) => (
          <Grid key={index} item xs={12 / 7} sx={gridItemStyle}
            onClick={(e)=>createEvent(e, day)}
            onDrop={handleEndDrag}
            onDragOver={(e) => {
              e.preventDefault();
              drag.updateEnd(
                day.getDate(),
                day.getMonth() + 1,
                day.getFullYear(),
                null);
            }}
          >

            <DayTitle day={day} index={index} />
            <DayEvents day={day} events={events} drag={drag} />

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
