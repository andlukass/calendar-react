import { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import PropTypes from 'prop-types';

ModeButton.propTypes = {
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
};
function ModeButton({mode, setMode}) {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModeChange = (mode) => {
    setMode(mode);
    handleClose();
  }

  const translateMode = (mode) => {
    if (mode === "week") {
      return "Semana";
    }
    return "Mês";
  }

  return (
    <>
      <Button variant="outlined" onClick={handleClick} endIcon={<ArrowDropDownIcon />}>
        {translateMode(mode)}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} sx={{mt: 0.5}}>
        <MenuItem onClick={()=>handleModeChange("week")}>Semana</MenuItem>
        <MenuItem onClick={()=>handleModeChange("month")}>Mês</MenuItem>
      </Menu>
  </>
  )
}

export default ModeButton;
