import { useState, useEffect, useContext } from "react";
import Link from "next/link"
import { TransactionContext } from "../context/TransactionContext";
import {useRouter} from 'next/router'

// const router = useRouter();
  
const style = {
  wrapper:
    "flex justify-between items-center w-screen px-20 h-24 absolute top-0 bg-slate-50",
  logo: "font-bold text-2xl font-mono text-indigo-700",
  accountLabel: "text-white bg-violet-500 px-3 py-2 rounded-2xl",
  button:
    "bg-indigo-600 px-5 py-2 rounded-md text-sm text-white hover:bg-indigo-700 transition-all duration-400 active:bg-zinc-200	",
  link:  `text-gray-900`,
};

const Header = () => {

  const router = useRouter()

  const { currentAccount, connectWallet, handleReload, isConnected } =
    useContext(TransactionContext);

  useEffect(() => {
    handleReload();
  }, []);

  return (
    <nav className={style.wrapper}>
      <h1 className={style.logo}>Gvstake</h1>

      {isConnected ? (
        <ul className="flex">
          <li className="mx-3">
            <Link href="/">
              <a
                className={` capitalize font-mono transition-all ease-in-out duration-400 hover:text-violet-500 ${
                  router.asPath === "/"
                    ? "text-violet-800 hover:text-violet-800"
                    : "text-black"
                }`}
              >
                stake
              </a>
            </Link>
          </li>
          <li className="mx-3">
            <Link href="/unstake">
              <a
                className={` capitalize font-mono transition-all ease-in-out duration-400 hover:text-violet-500 ${
                  router.asPath === "/unstake"
                    ? "text-violet-800 hover:text-violet-800"
                    : "text-black"
                }`}
              >
                unstake
              </a>
            </Link>
          </li>
          <li className="mx-3">
            <Link href="/admin">
              <a
                className={` capitalize font-mono transition-all ease-in-out duration-400 hover:text-violet-500 ${
                  router.asPath === "/admin"
                    ? "text-violet-800 hover:text-violet-800"
                    : "text-black"
                }`}
              >
                admin
              </a>
            </Link>
          </li>
        </ul>
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
