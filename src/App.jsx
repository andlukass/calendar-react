import Week from './Week/Week';
import { events } from './events';

function App() {

  const sortEvents = (events) => {
    return events.sort((a, b) => {
      // Primeira condição: ordenar pelo start
      if (a.start !== b.start) {
        return a.start - b.start;
      }
      // Segunda condição: ordenar pela duração (end - start)
      const durationA = a.end - a.start;
      const durationB = b.end - b.start;
      return durationA - durationB;
    });
  }

  const periodEvents =  sortEvents(events);

  return (
    <>
      <Week events={periodEvents} />
    </>
  )
}

export default App
