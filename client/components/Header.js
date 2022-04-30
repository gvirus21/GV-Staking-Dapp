import { useState, useEffect } from "react";

const style = {
  wrapper: "flex justify-between items-center px-20 h-24 ",
  logo: "font-semibold text-2xl",
  accountLabel: "text-white bg-violet-300 px-6 py-2 rounded-full",
  button:
    "bg-zinc-300 px-6 py-2 rounded-xl text-xl hover:bg-zinc-400 transition-colors active:bg-zinc-200	",
};

const Header = () => {

    
  return (
    <nav className={style.wrapper}>
      <h1 className={style.logo}>Gvstake</h1>
      <p className={style.accountLabel}>0x89cU...9vBc</p>
      <button className={style.button}> Connect </button>
    </nav>
  );
};

export default Header;
