import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { GetCoins } from "./config/api";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export const Crypto = createContext();

function CryptoContext({ children }) {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("̥₹");
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [openLogin, setOpenLogin] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(GetCoins(currency));
    setCurrencies(data);
    setLoading(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    setOpenLogin(false);
  }, [user]);

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
    else if (currency === "CAD") setSymbol("CA$");
    else if (currency === "EUR") setSymbol("€");
    else if (currency === "YEN") setSymbol("¥");
  }, [currency]);

  return (
    <Crypto.Provider
      value={{
        currency,
        symbol,
        setCurrency,
        currencies,
        loading,
        fetchCoins,
        alert,
        setAlert,
        user,
        openLogin,
        setOpenLogin,
      }}
    >
      {children}
    </Crypto.Provider>
  );
}

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
