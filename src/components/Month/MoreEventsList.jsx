import { useState } from 'react';
import { Box, Menu, MenuItem, Typography } from '@mui/material';
import { eventOptionStyle } from './eventOptionStyle';
import EventOption from './EventOption';
import { useEventModalStore } from '../../data/eventModal/useEventModalStore';

import PropTypes from 'prop-types';

MoreEventsList.propTypes = {
  title: PropTypes.string,
  events: PropTypes.array,
  drag: PropTypes.object,
};
function MoreEventsList({title, events, drag}) {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    if (e) e.stopPropagation();
    setAnchorEl(null);
  };

  const setEvent = useEventModalStore((state) => state.setEvent);

  const handleEventClick = (e, event) => {
    e.stopPropagation();
    setEvent(event);
  }

  if (!events) return null;

  return (
    <>
      <Box sx={eventOptionStyle}>
        <Typography sx={titleStyle} onClick={handleClick}>
          {title}
        </Typography>
      </Box>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} sx={{mt: 0.5}}>
        {events.map((event, index) => (
          <MenuItem key={index}
          onClick={(e)=>handleEventClick(e, event)}>
            <EventOption event={event} drag={drag} close={handleClose} />
          </MenuItem>
        ))}
      </Menu>
  </>
  )
}

const titleStyle = {
  fontSize: 12,
  color: "#333333",
  fontWeight: 600,
  width: "100%",
}

export default MoreEventsList;
