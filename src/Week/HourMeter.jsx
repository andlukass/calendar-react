import { Box, Typography } from "@mui/material";
import { hourIndexes } from "./Hours/utils/hourIndexes";
import { getHourByIndex } from "./Hours/utils/getHourByIndex";

function HourMeter() {

  return (
    <>
      <Box width={80}>
        {hourIndexes.map((hour) => (
          <Box key={hour} height={25} border="0.5pt solid transparent">
            <Typography sx={{mt: -1.5}}>
              {(hour % 2 || !hour) ? null : getHourByIndex(hour)}
            </Typography>
          </Box>
        ))}
      </Box>
    </>
  )
}

export default HourMeter;
