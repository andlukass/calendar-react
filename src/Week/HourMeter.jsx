import { Box, Typography } from "@mui/material";
import { hourIndexes } from "./Hours/utils/hourIndexes";
import { getHourByIndex } from "./Hours/utils/getHourByIndex";

function HourMeter() {

  return (
    <>
      <Box width={60}>
        {hourIndexes.map((hour) => (
          <Box key={hour} minWidth={60} height={25} border="0.5pt solid transparent">
            <Typography sx={{mt: -1.5,
              pr: 1,
              textAlign: "end",
              color: "#767676",
              fontWeight: 400,
              fontSize: 12,
            }}>
              {(hour % 2 || !hour) ? null : getHourByIndex(hour, true)}
            </Typography>
          </Box>
        ))}
      </Box>
    </>
  )
}

export default HourMeter;
