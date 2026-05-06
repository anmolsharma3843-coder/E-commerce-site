import { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
const [relatedCategory, setrelatedCategory] = useState([]);
  return (
    <SearchContext.Provider value={{ term, results, setTerm, setResults,relatedCategory,setrelatedCategory }}>
      {children}
    </SearchContext.Provider>
  );
};
