import React, { useState } from 'react';
import axios from 'axios';
import CancelBookingButton from './CancelBookingButton'; // Assuming the CancelBookingButton component is in a separate file

const InitPayment = ({ bookingIds }) => {
    const [paymentStatus, setPaymentStatus] = useState(false);

    const handleButtonClick = async () => {
        try {
            const response = await axios.post('http://localhost:8083/api/payments/initiate', bookingIds);
            console.log('Response data:', response.data);
            const isPaymentSuccessful = response.data.paymentStatus;
            console.log('Payment status:', isPaymentSuccessful);
            setPaymentStatus(isPaymentSuccessful);
            localStorage.setItem('paymentStatus', isPaymentSuccessful);
        } catch (error) {
            console.error('Error initiating payment:', error);
            setPaymentStatus(false);
            localStorage.setItem('paymentStatus', false);
        }
    };

    const [textState, setTextState] = useState("Initiate Payment");
    const [style, setStyle] = useState("disabled")
 
    const toggleText = () => {
        // setTextState((state) => (state === "Initiate Payment" ? "Payment Succesfull" : "Initiate Payment"));

        if (textState === "Initiate Payment" && !paymentStatus) {
            setTextState("Payment Successful");
            setStyle("disabled");
            handleButtonClick();
        }
    };



    return (
        <div className="flex justify-end">
            <button
                className={`${paymentStatus
                        ? 'bg-gray-300 hover:bg-gray-400 text-black'
                        : 'bg-blue-500 hover:bg-blue-700 text-white'
                    } font-bold py-2 px-4 mr-3 rounded focus:outline-none focus:shadow-outline`}
                disabled={paymentStatus}
                // onClick={changeStyle}     
                onClick={toggleText}  


            >
                {/* {paymentStatus ? 'Payment Successful' : 'Initiate Payment'} */}
                {textState}
            </button>

            <CancelBookingButton bookingId={bookingIds[0]} paymentStatus={paymentStatus} />
        </div>
    );
};

export default InitPayment;
