import { Box, Typography } from "@mui/material";
import { hourIndexes } from "../../utils/hourIndexes";
import { getHourByIndex } from "../../utils/getHourByIndex";

function HourMeter() {

  return (
    <>
      <Box sx={containerStyle}>
        {hourIndexes.map((hour) => (
          <Box key={hour} sx={cellStyle}>
            <Typography sx={labelStyle}>
              {(hour % 2 || !hour) ? null : getHourByIndex(hour, true)}
            </Typography>
          </Box>
        ))}
      </Box>
    </>
  )
}

const containerStyle = {
  width: 60,
  position: "sticky",
  left: 0,
  zIndex: 92,
  height: "auto",
  p: 0.2
}

const cellStyle = {
  backgroundColor: "white",
  minWidth: 60,
  height: 25,
  border: "0.5pt solid transparent",
}

const labelStyle = {
  mt: -1.5,
  pr: 1,
  textAlign: "end",
  color: "#767676",
  fontWeight: 400,
  fontSize: 12,
}

export default HourMeter;
