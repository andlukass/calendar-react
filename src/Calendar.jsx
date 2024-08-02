import EventModal from './components/EventModal/EventModal';
import Week from './Week/Week';
import Month from './components/Month/Month';
import { useEventsStore } from './data/events/useEventsStore';
import Header from './Header';
import useCalendarConfig from './useCalendarConfig';

function Calendar() {

  const events = useEventsStore((state) => state.events);

  const { currentDate, mode, changeMode, goPrev, goNext, goToday } = useCalendarConfig();

  return (
    <>

      <EventModal />

      <Header goPrev={goPrev}
        currentDate={currentDate}
        changeMode={changeMode}
        goToday={goToday}
        goNext={goNext}
        mode={mode} />

      {mode === "week" ?
        <Week currentDate={currentDate} events={events} /> :
        <Month currentDate={currentDate} events={events} />
      }

    </>
  )
}

export default Calendar
