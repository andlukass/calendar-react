import { Box, Typography } from "@mui/material";
import { getDayName } from "./utils/getDayName";
import PropTypes from 'prop-types';

DayTitle.propTypes = {
  date: PropTypes.instanceOf(Date),
};
function DayTitle({ date }) {

  return (
      <Box sx={containerStyle}>
          <Box sx={cellStyle} height={20}>
            <Typography variant="body2" sx={{fontSize: 12}}>
              {getDayName(date)}
            </Typography>
          </Box>
          <Box sx={cellStyle} height={20}>
            <Typography variant="h4" sx={{color: "#656464"}}>
              {date.getDate()}
            </Typography>
          </Box>
      </Box>
  )
}

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  position: "sticky",
  top: 0,
  zIndex: 91,
};

const cellStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  backgroundColor: "white",
  minWidth: 120,
  border: "0.5pt solid transparent",
};

export default DayTitle;
