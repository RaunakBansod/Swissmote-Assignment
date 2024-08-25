import React from "react";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import default styles for react-toastify
import CoinFlip from "./CoinFlip";
import WalletConnect from "./components/WalletConnect";

function App() {
  return (
    <div className="App">
      <h1>Crypto Coin Flip Game</h1>
      <WalletConnect />
      <CoinFlip />
      {/* ToastContainer is added here to display toast notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
    </div>
  );
}

export default App;
