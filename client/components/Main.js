import React, { useState, useEffect, useContext } from "react";
import {
  TransactionContext,
  TransactionProvider,
} from "../context/TransactionContext";

const style = {
  wrapper: " h-screen py-64 flex justify-center items-center -mt-24 bg-gradient-to-r  from-blue-800 to-blue-900",
  formContainer: "h-40 flex flex-col justify-between ",
  // inputContainer: "flex",
  input: "px-3 py-1 text-xl mx-5 rounded-xl w-32",
  button: "px-3 py-1 bg-gray-300 rounded-md",
};

const Main = () => {
  const {
    stakeAmount,
    setStakeAmount,
    stakeETH,
    unstakeETH,
    issueRewards,
    setCurrentAccount,
  } = useContext(TransactionContext);

  useEffect(() => {
    if (window.ethereum !== undefined) {
      window.ethereum.on("accountsChanged", (acc) => {
        setCurrentAccount(acc[0]);
      });
    }
  }, []);

  return (
    <div className={style.wrapper}>
      <div className={style.formContainer}>
        <div className={style.inputContainer}>
          <input
            type="Number"
            min="0"
            max="100"
            className={style.input}
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
          />
          <button className={style.button} onClick={stakeETH}>
            Stake
          </button>
        </div>
        <button className={style.button} onClick={unstakeETH}>
          Unstake
        </button>
        <button className={style.button} onClick={issueRewards}>
          Issue rewards
        </button>
      </div>
    </div>
  );
};

export default Main;
