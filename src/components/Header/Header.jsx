import { Box, Button, Typography } from '@mui/material';
import ModeButton from '../ModeButton/ModeButton';

import PropTypes from 'prop-types';

Header.propTypes = {
  mode: PropTypes.string.isRequired,
  currentDate: PropTypes.object.isRequired,
  goPrev: PropTypes.func.isRequired,
  goToday: PropTypes.func.isRequired,
  goNext: PropTypes.func.isRequired,
  changeMode: PropTypes.func.isRequired,
};
function Header({mode, currentDate, goPrev, goToday, goNext, changeMode}) {

  const getMonthName = (date) => {
    let monthName = date.toLocaleDateString('pt-BR', { month: 'long' });
    monthName = monthName.replace('.', '');
    monthName = monthName.charAt(0).toUpperCase() + monthName.slice(1);
    return monthName;
  }

  const getInitialMonth = (currentDate) => {
    const firstDay = new Date(
      currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay()
    );
    return getMonthName(firstDay)
  }

  const getNextMonth = (currentDate) => {
    const firstDay = new Date(
      currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay()
    );
    const lastDay = new Date(currentDate);
    lastDay.setDate(currentDate.getDate() + 6);
    if (lastDay.getMonth() !== firstDay.getMonth()) {
      return " - " + getMonthName(lastDay);
    }
    return "";
  }

  const getYear = () => {
    if (mode === "week") {
      const lastDay = new Date(currentDate);
      lastDay.setDate(currentDate.getDate() + 6);
      return lastDay.getFullYear();
    } else {
      return currentDate.getFullYear();
    }
  }

  return (
    <>
      <Box sx={{display: "flex", gap: 3, m: 2, userSelect: "none"}}>

        <Button variant="outlined" onClick={goToday}>Hoje</Button>

        <Typography variant='h6' sx={{cursor: "pointer", p: 0.5}} onClick={goPrev}>
          {"<"}
        </Typography>
        <Typography variant='h6' sx={{cursor: "pointer", p: 0.5}} onClick={goNext}>
          {">"}
        </Typography>

        <Typography variant='h6' sx={{p: 0.5, width: 500}}>
          {getInitialMonth(currentDate) + getNextMonth(currentDate) + " " +
           getYear(currentDate)}</Typography>

        <ModeButton mode={mode} changeMode={changeMode} />

      </Box>
    </>
  )
}

export default Header;
