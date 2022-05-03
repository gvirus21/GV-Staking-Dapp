import { useState, useEffect, useContext } from "react";
import Link from "next/link"
import { TransactionContext } from "../context/TransactionContext";

const style = {
  wrapper:
    "flex justify-between items-center w-screen px-20 h-24 absolute top-0 bg-slate-50",
  logo: "font-semibold text-2xl",
  accountLabel: "text-white bg-violet-500 px-3 py-2 rounded-2xl",
  button:
    "bg-zinc-300 px-6 py-2 rounded-xl text-xl hover:bg-zinc-400 transition-colors active:bg-zinc-200	",
};

const Header = () => {
  const { currentAccount, connectWallet, handleReload, isConnected } =
    useContext(TransactionContext);

  useEffect(() => {
    handleReload();
  }, []);

  return (
    <nav className={style.wrapper}>
      <h1 className={style.logo}>Gvstake</h1>

      {isConnected ? (
        <div>
          <ul className="flex ">
            <li className="mx-3">
              <Link href="/">
                <a>stake</a>
              </Link>
            </li>
            <li className="mx-3">
              <Link href="/unstake">
                <a>unstake</a>
              </Link>
            </li>
            <li className="mx-3">
              <Link href="/admin">
                <a>admin</a>
              </Link>
            </li>

          </ul>
        </div>
      ) : (
        <div></div>
      )}

      {isConnected ? (
        <p className={style.accountLabel}>{`${currentAccount.substr(
          0,
          5
        )}...${currentAccount.substr(-5)}`}</p>
      ) : (
        <button className={style.button} onClick={() => connectWallet()}>
          {" "}
          Connect{" "}
        </button>
      )}
    </nav>
  );
};

export default Header;
