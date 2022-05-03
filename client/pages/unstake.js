import {useContext} from 'react';
import Header from '../components/Header';
import { TransactionContext } from "../context/TransactionContext";


const unstake = () => {

    const { unstakeETH } = useContext(TransactionContext);
    return (
      <>
        <Header />
        <div className="flex flex-col w-screen h-96 justify-start items-center ">
          <h1 className="my-10">Unstake Your amount</h1>
          <button className="my-20 bg-indigo-100 px-3 py-2 rounded-lg text-xl" onClick={unstakeETH}>
            unstake
          </button>
        </div>
      </>
    );
};

export default unstake;
