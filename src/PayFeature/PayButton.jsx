import { useState } from "react";
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";
import TxList from "./TxList";

const supportedChains = {
  bscTestnet: {
    chainId: 97, // BSC Testnet chain ID
    rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545", // BSC Testnet RPC URL
  },
};

const startPayment = async ({ setError, setTxs, bnb, addr }) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    // Convert the chainId to a hexadecimal string with a 0x prefix
    const chainIdHex = `0x${supportedChains.bscTestnet.chainId.toString(16)}`;

    // Check if user is connected to the BSC Testnet
    if (window.ethereum.chainId !== chainIdHex) {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainIdHex }],
      });
    }

    // After network switch, reinitialize the provider and signer
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []); // Request accounts if not already requested
    const signer = provider.getSigner();

    // Validate address format
    ethers.utils.getAddress(addr);

    // Send BNB on BSC Testnet
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseUnits(bnb.toString(), 18), // Convert BNB amount to Wei (18 decimals)
    });

    console.log({ bnb, addr });
    console.log("tx", tx);
    setTxs([tx]);
  } catch (err) {
    setError(err.message);
  }
};

export default function App() {
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);
  const address = "0xE9Ea08c292d1FBf65f9cC8ddD1453465B406021C";
  const amount = 0.005;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError();
    await startPayment({
      setError,
      setTxs,
      bnb: amount, // Use the correct variable names
      addr: address, // Use the correct variable names
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
