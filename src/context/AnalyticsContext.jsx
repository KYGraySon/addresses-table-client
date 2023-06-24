import { useState } from "react";
import { useContext, createContext } from "react";

const AnalyticsContext = createContext(null);

export const AnalyticsContextProvider = ({ children }) => {
  const [apiData, setApiData] = useState([]);
  const [ethPrices, setEthPrices] = useState([]);
  const [fullData, setFulldata] = useState({})
  const [history, setHistory] = useState([])
  return (
    <AnalyticsContext.Provider
      value={{
        apiData,
        setApiData,
        ethPrices,
        setEthPrices,
        fullData,
        setFulldata,
        history,
        setHistory
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};

export const AnalyticsConsumer = () => {
  return useContext(AnalyticsContext);
};

export default AnalyticsContextProvider;
