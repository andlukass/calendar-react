
import { isToday } from '../../../utils/isToday';

import PropTypes from 'prop-types';

Needle.propTypes = {
  date: PropTypes.instanceOf(Date),
  needleRef: PropTypes.object,
};
function Needle({ date, needleRef }) {

  if (!isToday(date)) return;

  const hours = new Date().getHours();
  const minutes = new Date().getMinutes();
  const daysTitleSize = 180;
  const hoursSize = (hours * 50) + daysTitleSize;
  const minutesSize = (minutes * 50) / 60;
  const top = hoursSize + minutesSize;

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
  zIndex: 100,
  cursor: 'pointer'
}

export default Needle
