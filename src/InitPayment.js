import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CancelBookingButton from './CancelBookingButton';

const InitPayment = ({ bookingIds }) => {
    // Retrieve and parse the stored statuses from localStorage or initialize an empty object
    const initializeStatuses = () => {
        const storedStatuses = localStorage.getItem('paymentStatuses');
        return storedStatuses ? JSON.parse(storedStatuses) : {};
    };

    // Initialize local state with retrieved statuses
    const [paymentStatuses, setPaymentStatuses] = useState(initializeStatuses);

    // Update localStorage whenever paymentStatuses state changes
    useEffect(() => {
        localStorage.setItem('paymentStatuses', JSON.stringify(paymentStatuses));
    }, [paymentStatuses]);

    // Function to handle payment initiation
    const handleButtonClick = async () => {
        try {
            // Initiate payments for multiple booking IDs
            const response = await axios.post('http://localhost:8083/api/payments/initiate', bookingIds);
            const paymentResults = response.data;

            // Update payment statuses for each booking ID in the response
            const updatedStatuses = { ...paymentStatuses };
            paymentResults.forEach(({ bookingId, paymentStatus }) => {
                updatedStatuses[bookingId] = paymentStatus;
            });

            setPaymentStatuses(updatedStatuses);
        } catch (error) {
            console.error('Error initiating payment:', error);
        }
    };

    // Helper function to get button text and styles dynamically
    const getButtonState = (bookingId) => {
        const isPaid = paymentStatuses[bookingId] || false;
        return isPaid
            ? { text: 'Payment Successful', style: 'bg-gray-300 text-black' }
            : { text: 'Initiate Payment', style: 'bg-blue-500 text-white' };
    };

    return (
        <div className="flex flex-col space-y-2">
            {bookingIds.map((bookingId) => {
                const { text, style } = getButtonState(bookingId);
                return (
                    <div key={bookingId} className="flex justify-end">
                        <button
                            className={`${style} font-bold py-2 px-4 mr-3 rounded focus:outline-none`}
                            disabled={paymentStatuses[bookingId] || false}
                            onClick={handleButtonClick}
                        >
                            {text}
                        </button>
                        <CancelBookingButton bookingId={bookingId} paymentStatus={paymentStatuses[bookingId] || false} />
                    </div>
                );
            })}
        </div>
    );
};

export default InitPayment;
