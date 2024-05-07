import React from 'react';
import axios from 'axios';

const RefundButton = ({ bookingId }) => {
  const handleRefund = async () => {
    try {
      // Make a POST request to the refund API endpoint
      const response = await axios.post(`http://localhost:8083/api/payments/refund/${bookingId}`);
      
      // Handle success response
      console.log('Refund successful:', response.data);
      alert('Refund successful');
      
      // You can also trigger further actions upon successful refund
    } catch (error) {
      // Handle error case
      console.error('Error occurred during refund:', error);
      alert('Refund failed. Please try again.');
    }
  };

  return (
    <button onClick={handleRefund}>
      Refund Payment
    </button>
  );
}; 

export default RefundButton;
