import { useEffect, useState } from "react";
import { getQuotes } from "../services";

export const MainPage = () => {
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isErrorData, setIsErrorData] = useState(false);

  useEffect(() => {
    getQuotes()
      .then(async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson ? await response.json() : null;
        if (data) {
          setQuotes(data);
          setIsLoading(false);
        } else {
          setIsErrorData(true);
        }
      })
      .catch((error) => {
        setIsErrorData(true);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1>Simpsons quotes</h1>

      {isLoading && <p>Loading...</p>}
      {isErrorData ? (
        <h1>Ups, something went wrong!</h1>
      ) : (
        <ul>
          {quotes && quotes.map(({ quote }) => <li key={quote}>{quote}</li>)}
        </ul>
      )}
    </>
  );
};
