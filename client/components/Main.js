import React, { useStaete, useEffect } from "react";

const Main = () => {
  return (
    <div className="bg-gray-700 h-screen py-64 flex justify-center items-center -mt-24 ">
      <div className="h-40 flex flex-col justify-between ">
        <div className="flex">
          <input
            type="Number"
            min="0"
            max="100"
            className="px-3 py-1 text-xl mx-5 rounded-xl w-32"
          />
          <button className="px-3 py-1 bg-gray-300 rounded-md">Stake</button>
        </div>
        <button className="px-3 py-1 bg-gray-300 rounded-md">Unstake</button>
        <button className="px-3 py-1 bg-gray-300 rounded-md">
          Issue rewards
        </button>
      </div>
    </div>
  );
};

export default Main;
