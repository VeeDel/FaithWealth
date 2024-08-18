import { useEffect, useState } from "react";
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";
import TxList from "./TxList";
import { useAuth } from "../Context/AuthContext";

export default function App({ amount, address }) {
  const { startPayment } = useAuth();
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError();
    await startPayment({
      setError,
      setTxs,
      bnb: amount,
      addr: address,
    });
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      <main className=" ">
        <h1 className="text-xl font-semibold text-white text-center underline">
          Upgrade Level?
        </h1>
        <div className="">
          <div className="my-3 border-borderBlack rounded-md border-[2px]">
            <h3 className="bg-dimblack border-borderBlack p-2 w-full rounded-md text-[9px]">
              {address}
            </h3>
          </div>
          <div className="my-3 border-borderBlack rounded-md border-[2px]">
            <h3 className="bg-dimblack border-borderBlack p-2 w-full rounded-md text-[9px]">
              {amount} BNB
            </h3>
          </div>
        </div>
      </main>
      <footer className="">
        <button
          type="submit"
          className="bg-primary w-full font-semibold p-2 rounded-md"
        >
          Pay now
        </button>
        <ErrorMessage message={error} />
        <TxList txs={txs} />
      </footer>
    </form>
  );
}
