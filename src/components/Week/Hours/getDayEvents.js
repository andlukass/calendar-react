const isOverlapping = (a, b) => {
  return a.start < b.end && b.start < a.end;
};

const findOverlap = (event, events) => {
  for (let i = 0; i < events.length; i++) {
      if (isOverlapping(event, events[i]) &&
      event.id !== events[i].id) return i;
  }
  return -1;
};

const lastOverlap = (event, events, start) => {
  for (let i = start; i >= 0; i--) {
      if (isOverlapping(event, events[i])) return i;
  }
  return -1;
}

const getGroupDepth = (event, events, start) => {
  let groupDepth = event.depth;
  if (start === events.length) return groupDepth;
  for (let i = start; i < events.length; i++) {
      if (!events[i].depth) return groupDepth;
      if (groupDepth < events[i].depth) {
        groupDepth = events[i].depth;
      }
  }
  return groupDepth;
}

export const getDayEvents = (events, date) => {
  const dayEvents = events.filter((event) => event.date &&
    (event.date.getDate() === date.getDate()) &&
    (event.date.getMonth() === date.getMonth() &&
    event.date.getFullYear() === date.getFullYear()));
  

    for (let i = 0; i < dayEvents.length; i++) {
      const next = findOverlap(dayEvents[i], dayEvents);
      const last = lastOverlap(dayEvents[i], dayEvents, i - 1);
      if (last !== -1 && next !== -1 && i > 0) {
          dayEvents[i].depth = dayEvents[last].depth + 1;
      } else {
        dayEvents[i].depth = 0;
      }
    }

    for (let i = 0; i < dayEvents.length; i++) {
      if (dayEvents[i].depth) {
        dayEvents[i].groupDepth = getGroupDepth(dayEvents[i], dayEvents, i + 1);
      } else {
        dayEvents[i].groupDepth = 0;
      }
    }

    dayEvents.forEach((event) => {
      if (event.groupDepth === 0) {
        event.left = 0;
        event.width = 100;
        return;
      }
      const factor = (100 / (event.groupDepth + 1));
      event.left = event.depth * factor;
      event.width = 100 - event.left;
    });

    return dayEvents;
}