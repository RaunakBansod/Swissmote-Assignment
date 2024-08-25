import React, { useState } from "react";
import { ethers } from "ethers";
import contractABI from "./utils/contractABI.json";
import { toast } from "react-toastify";

const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS_HERE"; // Replace with your deployed contract address

function CoinFlip() {
  const [betAmount, setBetAmount] = useState("");
  const [guess, setGuess] = useState(true); // true for heads, false for tails
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      const _provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(_provider);

      const _signer = _provider.getSigner();
      setSigner(_signer);

      const _contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        contractABI,
        _signer
      );
      setContract(_contract);

      await window.ethereum.request({ method: "eth_requestAccounts" });
      toast.success("Wallet connected!");
    } else {
      toast.error("Please install MetaMask!");
    }
  };

  const handleBet = async () => {
    if (!provider || !signer || !contract) {
      toast.error("Please connect your wallet first!");
      return;
    }

    try {
      const transaction = await contract.flipCoin(guess, {
        value: ethers.utils.parseEther(betAmount),
      });
      await transaction.wait();
      toast.success("Transaction successful!");
    } catch (error) {
      toast.error("Transaction failed. Make sure you have enough ETH.");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Place Your Bet</h2>
      <input
        type="text"
        placeholder="Amount in ETH"
        value={betAmount}
        onChange={(e) => setBetAmount(e.target.value)}
      />
      <div>
        <label>
          <input
            type="radio"
            value="heads"
            checked={guess === true}
            onChange={() => setGuess(true)}
          />
          Heads
        </label>
        <label>
          <input
            type="radio"
            value="tails"
            checked={guess === false}
            onChange={() => setGuess(false)}
          />
          Tails
        </label>
      </div>
      <button onClick={handleBet}>Flip Coin</button>
    </div>
  );
}

export default CoinFlip;
