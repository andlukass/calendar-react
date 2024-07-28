import EventModal from './EventModal/EventModal';
import Week from './Week/Week';

function App() {

  return (
    <>
      <EventModal />
      <Week />
      {/* <div style={{display: "flex", position: "relative", maxHeight: 600, border:"1px solid blue", overflow: "auto"}}>
        <div style={{ position: "sticky", left: 0, border: "1px solid" }}> 
          {Array.from({ length: 50 }, (_, index) => index + 1).map((item, index) => (
            <p key={index+"real"} style={{ marginTop: 40}}>{index}real</p>
          ))}
        </div>
        <div>
          <div  style={{ display: "flex", position: "sticky", top: 0, border: "1px solid" }}>
            {Array.from({ length: 50 }, (_, index) => index + 1).map((item, index) => (
              <p key={index+"cm"}  style={{ marginLeft: 40}}>{index}cm</p>
            ))}
          </div>
          <div style={{backgroundColor: "aqua", width: 1200, height: 500}}/>
        </div>
      </div> */}
    </>
  )
}

export default App
