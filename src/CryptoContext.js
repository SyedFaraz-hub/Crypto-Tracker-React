import {createContext, useContext, useEffect, useState } from "react";
import React from 'react'


const Crypto = createContext();

const CryptoContext = ({children}) => {
    const [currency, setCurrency] = useState("PKR");
    const [symbol, setSymbol] = useState("₹");
    
    useEffect(() => {

      if (currency === "PKR") {
        setSymbol("₹")
      }
      else if (currency === "USD") {
        setSymbol("$")
      }
    }, [currency]);

     console.log(currency)
  return (
   <Crypto.Provider value={{currency , symbol ,  setCurrency , setSymbol}}>
    {children}
   </Crypto.Provider>
  )
}

export default CryptoContext

export const CryptoState = ()=>{
     return useContext(Crypto)
}
