import React from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";

function WalletConnect() {
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        toast.success("Wallet connected!");
      } catch (error) {
        toast.error("Wallet connection failed!");
        console.error(error);
      }
    } else {
      toast.error("Please install MetaMask!");
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>Connect Wallet</button>
    </div>
  );
}

export default WalletConnect;
