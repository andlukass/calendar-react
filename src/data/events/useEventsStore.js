import { create } from 'zustand'
import { initialEvents } from './initialEvents';

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

export const useEventsStore = create((set) => ({
		events: sortEvents(initialEvents),
    addEvent: (event) => set((state) => (
      { events: sortEvents([...state.events, event]) }
    )),
    removeEvent: (id) => set((state) => (
      { events: state.events.filter((event) => event.id !== id) }
    )),
    editEvent: (updatedEvent) => set((state) => ({
      events: sortEvents(state.events.map((event) => 
        event.id === updatedEvent.id ? { ...event, ...updatedEvent } : event
      ))
    })),
	})
);

