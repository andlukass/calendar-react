import { Box } from "@mui/material";
import Hours from "./Hours/Hours";
import useDrag from "./useDrag";

import { weekDays } from "./utils/weekDays";
import HourMeter from "./HourMeter";
import { useEventsStore } from "../data/events/useEventsStore";

function Week() {

  const events = useEventsStore((state) => state.events);

  const drag = useDrag();

  return (
    <>
      <Box id="hide-scroll" sx={{display: "flex", overflow: "auto", height: "90vh", position: "relative"}}>
        <HourMeter />
        {weekDays.map((day, index) => (
          <Hours events={events} drag={drag} day={index} key={index} />
        ))}
      </Box>
    </>
  )
}

export default Week;
