import { Box, Typography } from "@mui/material";
import Hours from "./Hours/Hours";
import useDrag from "./useDrag";
import { hourIndexes } from "./Hours/utils/hourIndexes";
import { getHourByIndex } from "./Hours/utils/getHourByIndex";

function Week() {

  const drag = useDrag();

  const weekDays = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado"
  ];

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
      <Box id="hide-scroll" sx={{ display: "flex", overflow: "auto", height: "90vh" }}>

        <Box width={80}>
          {hourIndexes.map((hour) => (
            <Box key={hour} height={25} border="0.5pt solid transparent">
              <Typography sx={{mt: -1.5}}>
                {(hour % 2 || !hour) ? null : getHourByIndex(hour)}
              </Typography>
            </Box>
          ))}
        </Box>

        {weekDays.map((day, index) => (
          <Hours drag={drag} day={index} key={index} />
        ))}
      </Box>
    </>
  )
}

export default Week;
