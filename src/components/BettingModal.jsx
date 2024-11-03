import React from 'react';

const BettingModal = ({ isOpen, onClose, onBet, walletBalance }) => {
  const betAmounts = [10, 20, 30, 40, 50, 100];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-bold mb-4">Select Betting Amount</h2>
        <div className="grid grid-cols-2 gap-4">
          {betAmounts.map((amount) => ( 
            <button
              key={amount}
              onClick={() => onBet(amount)}
              className={`py-2 rounded-lg ${
                amount <= walletBalance
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={amount > walletBalance}
            >
              ₹{amount}
            </button>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BettingModal;
