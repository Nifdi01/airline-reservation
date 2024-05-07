import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RefundButton = ({ bookingId }) => {
    // Retrieve initial refund statuses or default to an empty object
    const initializeRefundStatus = () => {
        const storedRefunds = localStorage.getItem('refundStatuses');
        return storedRefunds ? JSON.parse(storedRefunds) : {};
    };

    // Initialize the state with the refund statuses from localStorage
    const [refundStatuses, setRefundStatuses] = useState(initializeRefundStatus);

    // Update localStorage whenever refund statuses change
    useEffect(() => {
        localStorage.setItem('refundStatuses', JSON.stringify(refundStatuses));
    }, [refundStatuses]);

    // Check if the current booking has already been refunded
    const isRefunded = refundStatuses[bookingId] || false;

    // Handle refund process
    const handleRefund = async () => {
        try {
            // Make a POST request to refund the booking
            const response = await axios.post(`http://localhost:8083/api/payments/refund/${bookingId}`);
            
            // Handle the successful refund
            console.log('Refund successful:', response.data);
            alert('Refund successful');

            // Update the refund status
            setRefundStatuses((prevStatuses) => ({
                ...prevStatuses,
                [bookingId]: true,
            }));
        } catch (error) {
            // Handle any errors that occur during the refund process
            console.error('Error occurred during refund:', error);
            alert('Refund failed. Please try again.');
        }
    };

    // Determine button styles and text based on refund status
    const buttonStyle = isRefunded ? 'bg-gray-300 text-black' : 'bg-red-500 hover:bg-red-700 text-white';

    return (
        <button
            onClick={handleRefund}
            disabled={isRefunded}
            className={`${buttonStyle} font-bold py-2 px-4 mr-3 rounded focus:outline-none`}
        >
            {isRefunded ? 'Refunded' : 'Refund Payment'}
        </button>
    );
};

export default RefundButton;
