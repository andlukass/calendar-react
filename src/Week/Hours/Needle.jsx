
import PropTypes from 'prop-types';

Needle.propTypes = {
  date: PropTypes.instanceOf(Date),
  needleRef: PropTypes.object,
};
function Needle({ date, needleRef }) {

  if (date.getDate() !== new Date().getDate() || date.getMonth() !== new Date().getMonth()) return;

  const hours = new Date().getHours();
  const minutes = new Date().getMinutes();
  const daysTitleSize = 103;
  const hoursSize = (hours * 50) + daysTitleSize;
  const minutesSize = (minutes * 50) / 60;
  const top = hoursSize + minutesSize;

  return (
    <div style={{position: 'absolute',
      top: top,
      width: '100%',
      height: 2,
      backgroundColor: 'red',
      zIndex: 100,
      cursor: 'pointer',
    }}>
      <div ref={needleRef} style={{position: "absolute", top: -300}}/>
      <div style={{
        width: 10,
        height: 10, 
        backgroundColor: 'red',
        borderRadius: '50%',
        position: 'absolute',
        top: -3.5,
        left: -3,
        zIndex: 100,
        cursor: 'pointer'
      }}/>
    </div>
  )
}

export default Needle
