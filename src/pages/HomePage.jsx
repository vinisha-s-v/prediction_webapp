import React, { useEffect, useState } from 'react';
import Deposit from '../components/Deposit';
import BettingModal from '../components/BettingModal';
import {  toast } from 'react-toastify';
import WithdrawModal from '../components/WithdrawModal';



const HomePage = () => {
  const [seconds, setSeconds] = useState(30); // Timer countdown
  const [walletBalance, setWalletBalance] = useState(0); // Wallet balance
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isBettingModalOpen, setIsBettingModalOpen] = useState(false);
  const [betAmount, setBetAmount] = useState(0);
  const [randomNumber, setRandomNumber] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(prev => {
        if (prev === 1) {
          // Reset timer and generate a new random number every 30 seconds
          generateRandomNumber();
          checkBetResult();
          return 30;
        }
        return prev - 1;
      }); 
    }, 1000);

    return () => clearInterval(intervalId);
  }, [selectedChoice, betAmount ]);

    const generateRandomNumber = () => {
      const newRandomNumber = Math.floor(Math.random() * 2); // Generates 0 or 1
      setRandomNumber(newRandomNumber);
      console.log(newRandomNumber);
      
    };

  const checkBetResult = () => {
    if (selectedChoice === null || betAmount === 0) return; // No bet placed

    if (randomNumber === selectedChoice) {
      setWalletBalance(prev => prev + betAmount);
      toast.success(`Correct! You won ₹${betAmount}.`, { autoClose: 700 });
    } else {
      // setWalletBalance(prev => prev - betAmount);
      toast.error(`Incorrect! You lost ₹${betAmount}.`, { autoClose: 700 });
    }

    // Reset bet after result
    setSelectedChoice(null);
    setBetAmount(0);
  };

  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const openDepositModal = () => setIsDepositModalOpen(true);
  const closeDepositModal = () => setIsDepositModalOpen(false);

  const openBettingModal = (choice) => {
    setSelectedChoice(choice); // 0 for Small, 1 for Big
    setIsBettingModalOpen(true);
  };

  const closeBettingModal = () => setIsBettingModalOpen(false);

  const handleDeposit = (amount) => {
    setWalletBalance(prev => prev + amount);
    toast.success(`${amount} is credited to your account`, { autoClose: 700 })
    closeDepositModal(); // Close modal after depositing
  };

  const handleBet = (amount) => {
    setWalletBalance(prev => prev - amount)
    setBetAmount(amount);
    setIsBettingModalOpen(false); // Close betting modal
    
    toast.info(`You bet ₹${amount} on ${selectedChoice === 1 ? 'Big' : 'Small'}`, { autoClose: 700 });
  };


  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  const openWithdrawModal = () => setIsWithdrawModalOpen(true);
  const closeWithdrawModal = () => setIsWithdrawModalOpen(false);

  const handleWithdraw = (amount) => {
    if (amount >= 100 && amount <= walletBalance) {
      setWalletBalance((prev) => prev - amount);
      closeWithdrawModal();
    } else {
      toast.info("Amount must be above ₹100 and within your wallet balance.", { autoClose: 700 });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-purple-300 flex flex-col items-center p-4 text-gray-800">
      {/* Header */}
      <div className="w-full max-w-md bg-white rounded-xl p-4 flex justify-center items-center shadow-md">
        <h1 className="text-xl font-bold text-gray-700">SVR</h1>
      </div>

      {/* Wallet Balance */}
      <div className="w-full max-w-md bg-white rounded-xl p-4 mt-4 shadow-md">
        <div className="flex flex-col justify-between items-center">
          <div className="text-2xl font-bold text-gray-700">Wallet Balance</div>
          <div className="text-2xl font-semibold text-gray-700">₹{walletBalance}</div>
        </div>
        <div className="flex justify-between mt-4">
          <button className="w-1/2 bg-red-500 text-white py-2 rounded-lg mr-2" onClick={openWithdrawModal}>Withdraw</button>
          <button onClick={openDepositModal} className="w-1/2 bg-green-500 text-white py-2 rounded-lg">Deposit</button>
        </div>
      </div>

      {/* Game Modes */}
      <div className="w-full max-w-md bg-white rounded-xl p-4 mt-4 shadow-md">
        <div className="flex justify-center space-x-4 overflow-auto">
          <button className="bg-orange-400 text-white px-4 py-2 rounded-lg">Win Go 30s</button>
          {/* <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg">Win Go 5Min</button>
          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg">Win Go 3Min</button>
          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg">Win Go 1Min</button> */}
        </div>
      </div>

      {/* Timer and Numbers */}
      <div className="w-full max-w-md bg-white rounded-xl p-4 mt-4 shadow-md flex justify-center items-center">
        <div>
          <p className="font-semibold">Time remaining</p>
          <p className="text-2xl font-bold text-center">{formatTime(seconds)}</p>
        </div>
        {/* <p className="text-lg font-semibold text-gray-600">20241102100051093</p> */}
      </div>

      {/* Big or Small */}
      <div className="w-full max-w-md bg-white rounded-xl mt-10 h-60 shadow-md flex justify-evenly items-center">
        <button
          type="button"
          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br shadow-lg shadow-red-500/50 font-medium rounded-lg text-4xl h-52 w-48 text-center focus:outline-none mb-2"
          onClick={() => openBettingModal(1)}
        >
          Big
        </button>
        <button
          type="button"
          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br shadow-lg shadow-red-500/50 font-medium rounded-lg text-4xl h-52 w-48 text-center focus:outline-none mb-2"
          onClick={() => openBettingModal(0)}
        >
          Small
        </button>
      </div>

      {/* Deposit and Betting Modals */}
      <Deposit isOpen={isDepositModalOpen} onClose={closeDepositModal} onDeposit={handleDeposit} />
      <BettingModal isOpen={isBettingModalOpen} onClose={closeBettingModal} onBet={handleBet} walletBalance={walletBalance} />
      <WithdrawModal 
        isOpen={isWithdrawModalOpen} 
        onClose={closeWithdrawModal} 
        onWithdraw={handleWithdraw} 
        walletBalance={walletBalance} 
      />
    </div>
  );
};

export default HomePage;
