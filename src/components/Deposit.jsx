import React from 'react';

const Deposit = ({ isOpen, onClose, onDeposit }) => {
  const amounts = [100, 200, 300, 400, 500];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-bold mb-4">Select Amount to Deposit</h2>
        <div className="grid grid-cols-2 gap-4">
          {amounts.map((amount) => (
            <button
              key={amount}
              onClick={() => onDeposit(amount)}
              className="bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
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

export default Deposit;
