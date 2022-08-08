import { useEffect, useState } from "react";

const getQuotes = () => fetch("/quotes");

export const MainPage = () => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    getQuotes()
      .then((response) => response.json())
      .then((data) => setQuotes(data));
  });

  return (
    <>
      <h1>Simpsons quotes</h1>

      <ul>
        {quotes.map(({ quote }) => (
          <li key={quote}>{quote}</li>
        ))}
      </ul>
    </>
  );
};
