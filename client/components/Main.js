import React, { useState, useEffect, useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";

const style = {
  wrapper:
    " h-screen flex flex-col justify-center items-center bg-gradient-to-r  from-gray-100 bg-slate-50",
  innerContainer: "",
  heading: "flex flex-col items-center h-32 mb-10 -mt-20",
  para: "text-4xl font-semibold mb-10",
  formContainer: "h-36 flex flex-col justify-between items-center",
  input: "px-3 text-3xl mx-5 rounded-xl w-40 h-16 border-violet-700 border-2 ",
  button:
    "w-40 h-12 bg-violet-600 rounded-md text-white text-xl hover:bg-violet-400",
};

const Main = () => {
  const {
    stakeAmount,
    setStakeAmount,
    stakeETH,
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
      <div className={style.innerContainer}>
        <div className={style.heading}>
          <h1 className={style.para}>Stake Your ETH</h1>
          <p>You Will recieve GV token as reward</p>
        </div>
        <div className={style.formContainer}>
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
      </div>
    </div>
  );
};

export default Main;
