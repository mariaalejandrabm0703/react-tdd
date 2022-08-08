const baseUrl =
  process.env.NODE_ENV !== "test" ? process.env.REACT_APP_BASE_URL : "";

export const getQuotes = (num = 3) => fetch(`${baseUrl}/quotes?count=${num}`);
