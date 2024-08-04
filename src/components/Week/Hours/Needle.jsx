
import { useEffect, useRef } from 'react';
import { isToday } from '../../../utils/isToday';

import PropTypes from 'prop-types';

Needle.propTypes = {
  date: PropTypes.instanceOf(Date),
  currentDate: PropTypes.instanceOf(Date),
};
function Needle({ date, currentDate }) {

  const needleRef = useRef(null);

  const hours = new Date().getHours();
  const minutes = new Date().getMinutes();
  const daysTitleSize = 65;
  const hoursSize = (hours * 55) + daysTitleSize;
  const minutesSize = (minutes * 55) / 60;
  const top = hoursSize + minutesSize;

  const scrollToRef = () => {
    if (!needleRef.current) return;
    needleRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const interval = setTimeout(() => {
      scrollToRef();
    }, 100);
    return () => interval;
  }, [currentDate]);

  if (!isToday(date)) return;

  return (
    <div style={{...needleStyle, top: top}}>
      <div ref={needleRef} style={refStyle} />
      <div style={circleStyle} />
    </div>
  )
}

const needleStyle = {
  position: 'absolute',
  top: top,
  width: 125,
  height: 2,
  backgroundColor: 'red',
  zIndex: 100,
  cursor: 'pointer',
}

const refStyle = {
  position: "absolute",
  top: -300,
}

const circleStyle = {
  width: 10,
  height: 10, 
  backgroundColor: 'red',
  borderRadius: '50%',
  position: 'absolute',
  top: -3.5,
  left: -3,
  zIndex: 90,
  cursor: 'pointer'
}

export default Needle
