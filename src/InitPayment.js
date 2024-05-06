import React, { useState } from 'react';
import axios from 'axios';
import CancelBookingButton from './CancelBookingButton'; // Assuming the CancelBookingButton component is in a separate file

const InitPayment = ({ bookingIds }) => {
    const [paymentStatus, setPaymentStatus] = useState(() => {
        const storedStatus = localStorage.getItem('paymentStatus');
        return storedStatus ? storedStatus === 'true' : 'false';
    });
    

    const handleButtonClick = async () => {
        try {
            const response = await axios.post('http://localhost:8083/api/payments/initiate', bookingIds);
            const isPaymentSuccessful = response.data[0].paymentStatus;
            setPaymentStatus(isPaymentSuccessful);
        } catch (error) {
            console.error('Error initiating payment:', error);
            setPaymentStatus(false); // Reset payment status on error
        }
    };

    return (
        <div className="flex justify-end">
            <button
                className={`${paymentStatus ? 'bg-gray-300 hover:bg-gray-400 text-black' : 'bg-blue-500 hover:bg-blue-700 text-white'} font-bold py-2 px-4 mr-3 rounded focus:outline-none focus:shadow-outline`}
                disabled={paymentStatus}
                onClick={handleButtonClick}
            >
                {paymentStatus ? 'Payment Successful' : 'Initiate Payment'}
            </button>

            <CancelBookingButton bookingId={bookingIds[0]} paymentStatus={paymentStatus} />
        </div>
    );
};

export default InitPayment;
