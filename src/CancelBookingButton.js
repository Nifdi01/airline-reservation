import React, { useState } from 'react';
import axios from 'axios';

const CancelBookingButton = ({ bookingId }) => {
    const [isCanceling, setIsCanceling] = useState(false);
    const [cancellationSuccess, setCancellationSuccess] = useState(false);
    const [cancellationError, setCancellationError] = useState(null);

    const handleCancellation = async () => {
        setIsCanceling(true);
        setCancellationSuccess(false);
        setCancellationError(null);

        try {
            const response = await axios.put(`http://localhost:8082/api/bookings/${bookingId}/cancel`);

            if (response.status === 200) {
                setCancellationSuccess(true);
            } else {
                throw new Error('Failed to cancel booking');
            }
        } catch (error) {
            console.error('Error cancelling booking:', error);
            setCancellationError('Failed to cancel booking');
        } finally {
            setIsCanceling(false);
        }
    };

    return (
        <div>
            <button
                className={`bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline 
                ${isCanceling ? 'opacity-50 cursor-not-allowed' : ''}`}
                
                onClick={handleCancellation}
                disabled={isCanceling} // Disable button if isCanceling or paymentStatus is true
            >
                {isCanceling ? 'Cancelling...' : 'Cancel Booking'}
            </button>
        </div>
    );
};

export default CancelBookingButton;
