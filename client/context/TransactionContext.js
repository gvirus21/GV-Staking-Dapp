import React, { useState, useEffect } from "react";

export const TransactionContext = React.createContext();

let eth;

if (typeof window !== "undefined") {
  eth = window.ethereum;
}

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState();
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const connectWallet = async (metamask = eth) => {
    try {
      if (metamask) {
        const accounts = await metamask.request({
          method: "eth_requestAccounts",
        });
        setCurrentAccount(accounts[0]);
        setIsConnected(true);
      } else {
        alert("Please install Metamask");
      }
    } catch (err) {
      console.log(err);
      throw new Error("No ethereum object");
    }
  };

  return (
    <TransactionContext.Provider
      value={{ currentAccount, connectWallet, isConnected }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
