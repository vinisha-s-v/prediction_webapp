import React, { useState } from 'react'
import { toast } from 'react-toastify';

const WithdrawModal = ({ isOpen, onClose, onWithdraw, walletBalance }) => {

    const [withdrawAmount, setWithdrawAmount] = useState('');

    const handleInputChange = (e) => setWithdrawAmount(e.target.value);
  
    const handleWithdrawClick = () => {
      const amount = parseInt(withdrawAmount);
      if (amount >= 100 && amount <= walletBalance) {
        onWithdraw(amount);
      } else {
        toast.info("Please enter a valid amount above ₹100 and within your balance.");
      }
    };
  
    if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-bold mb-4">Withdraw Amount</h2>
        <input
          type="number"
          value={withdrawAmount}
          onChange={handleInputChange}
          placeholder="Enter amount"
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          onClick={handleWithdrawClick}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Confirm Withdraw
        </button>
        <button
          onClick={onClose}
          className="w-full bg-red-500 text-white py-2 mt-2 rounded-lg hover:bg-red-600"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default WithdrawModal
