import { ethers } from "ethers";
import contractABI from "./utils/contractABI.json"; 

const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS_HERE"; 

// Initialize provider, signer, and contract instance
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

// Function to call the flipCoin method on the contract
async function flipCoin(guess) {
  try {
    const transaction = await contract.flipCoin(guess, {
      value: ethers.utils.parseEther("0.1"), // Example bet amount
    });
    await transaction.wait();
    console.log("Coin flip transaction completed:", transaction);
  } catch (error) {
    console.error("Coin flip transaction failed:", error);
  }
}
