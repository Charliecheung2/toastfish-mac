import React, { useContext, useState, useEffect } from "react";

// const initState = {
//   count: 10,
//   book: "CET4_1",
// };
const Context = React.createContext();

const ContextProvider = ({ children }) => {
  const [count, setCount] = useState(10);
  const [book, setBook] = useState("CET4_1");
  const selectDb = new window.database.Select(book, count);

  const handleCount = (e) => {
    setCount(e.target.value);
  };

  return (
    <Context.Provider value={{ book, count, handleCount, selectDb }}>
      {children}
    </Context.Provider>
  );
};

const useMyContext = () => useContext(Context);
export { ContextProvider, useMyContext };
