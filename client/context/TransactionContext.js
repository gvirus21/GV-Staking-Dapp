import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import tokenFarmABI from '../utils/TokenFarmABI.json'

export const TransactionContext = React.createContext();

let eth;
let tokenFarmAddress = "0xD85799D72d096a7609fF7AA9623Dbd9dC19e4d9B";

if (typeof window !== "undefined") {
  eth = window.ethereum;
}

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState();
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stakeAmount, setStakeAmount] = useState(0);

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

  const handleReload = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts[0] != undefined) {
        setCurrentAccount(accounts[0]);
        setIsConnected(true);
      }
    }
  };

  const stakeETH = async () => {

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const stakeContract = new ethers.Contract(tokenFarmAddress, tokenFarmABI, signer)

    const stakeTx = await stakeContract.stakeTokens({ value: ethers.utils.parseEther(stakeAmount.toString()) });
    await stakeTx.wait()
  };

  const unstakeETH = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const stakeContract = new ethers.Contract(
      tokenFarmAddress,
      tokenFarmABI,
      signer
    );
    try {
      const firstStake = await stakeContract.userToStakes(currentAccount, 0)
      const firstStakeId = firstStake.id._hex
      
      const unstakeTx = await stakeContract.unStake(firstStakeId)
      await unstakeTx.wait()

    } catch (err) {
      console.log("unstake ERROR: ", err)
    }
  }

  const issueRewards = async () => {
     const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const stakeContract = new ethers.Contract(
      tokenFarmAddress,
      tokenFarmABI,
      signer
    );
    try {
      const issueTokensTx = await stakeContract.issueTokens();
      await issueTokensTx.wait();

      console.log("issue tokens success")
    } catch (err) {
      console.log("unstake ERROR: ", err);
    }
  }

  return (
    <TransactionContext.Provider
      value={{
        currentAccount,
        handleReload,
        connectWallet,
        isConnected,
        stakeAmount,
        setStakeAmount,
        stakeETH,
        unstakeETH,
        issueRewards,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
