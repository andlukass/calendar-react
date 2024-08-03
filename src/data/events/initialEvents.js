export const initialEvents = (date) => {
  
  const time = date.getHours();
  
  return [
    {
      id: 53,
      date: date,
      start: 2 + (time * 2),
      end: 4 + (time * 2),
      user: "1",
      title: "Exemplo 1",
    },
    {
      id: 63,
      date: date,
      start: 1 + (time * 2),
      end: 8 + (time * 2),
      user: "2",
      title: "Exemplo 2",
    },
    {
      id: 4,
      date: date,
      start: 5 + (time * 2),
      end: 8 + (time * 2),
      user: "3",
      title: "Exemplo 3",
    },
    {
      id: 5,
      date: date,
      start: 5 + (time * 2),
      end: 8 + (time * 2),
      user: "3",
      title: "Exemplo 4",
    },
    {
      id: 6,
      date: date,
      start: 5 + (time * 2),
      end: 8 + (time * 2),
      user: "3",
      title: "Exemplo 5",
    },
    {
      id: 7,
      date: date,
      start: 5 + (time * 2),
      end: 8 + (time * 2),
      user: "3",
      title: "Exemplo 6",
    },
    {
      id: 8,
      date: date,
      start: 5 + (time * 2),
      end: 8 + (time * 2),
      user: "3",
      title: "Exemplo 7",
    },
]
}