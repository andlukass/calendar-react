import { Box, Typography } from "@mui/material";
import { weekDays } from "./utils/weekDays";

function DaysTitle() {

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ width: 80 }} />
        {weekDays.map((day, index) => (
          <Box key={index} sx={{ width: 130, border: "0.5pt solid grey" }}>
            <Typography sx={{ textAlign: "center" }}>
              {day}
            </Typography>
          </Box>
        ))}
      </Box>
    </>
  )
}

export default DaysTitle;
