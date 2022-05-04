import React, { useState, useEffect, useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";

const style = {
  wrapper: " h-screen flex flex-col justify-center items-center bg-white",
  infoDiv: "flex flex-col items-center -mt-32 mb-20",
  heading: "text-5xl font-bold mb-10 tracking-wide w-3/6 text-center leading-tight",
  para: "text-violet-800 text-md tracking-wide ",
  formContainer: "h-36 flex flex-col justify-between items-center",
  input: "px-3 text-3xl  rounded-xl w-24 h-16 border-violet-700 border-2 ",
  button:
    "w-44 h-12 bg-violet-600 rounded-md text-white text-xl hover:bg-violet-400 font-sans tracking-widest",
};

const Main = () => {
  const { stakeAmount, setStakeAmount, stakeETH, setCurrentAccount } =
    useContext(TransactionContext);

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
        <div className={style.infoDiv}>
          <h1 className={style.heading}>
            Earn Free <span className="text-indigo-600">GV token</span> for
            Staking your <span className="text-indigo-800">Ethereum</span>
          </h1>
          <p className={style.para}>
            You Will recieve GV token as reward for staking ETH for as less as 3
            days
          </p>
        </div>
        <div className={style.formContainer}>
          <div className="flex items-center justify-between w-44">
            <input
              type="Number"
              min="0"
              max="100"
              className={style.input}
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
            />{" "}
            <h1 className="text-4xl">ETH</h1>
          </div>
          <button className={style.button} onClick={stakeETH}>
            Stake
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
