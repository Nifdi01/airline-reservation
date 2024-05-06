import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingButton = ({ flightId, customerId }) => {
    const [isBooked, setIsBooked] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const checkBookingStatus = async () => {
            try {
                const response = await axios.get(`http://localhost:8082/api/bookings/check/${flightId}/${customerId}`);

                setIsBooked(response.data.bookingStatus);
            } catch (error) {
                console.error('Error checking booking status:', error);
            }
        };

        checkBookingStatus();
    }, [flightId, customerId]);

    const handleBooking = async () => {
        setLoading(true);
        
        try {
            const response = await axios.post('http://localhost:8082/api/bookings', {
                flightId,
                customerId
            });

            if (!response.data.bookingStatus) {
                throw new Error('Booking request failed');
            }

            setIsBooked(true); // Update state to indicate booking success
            console.log('Booking successful:', response.data);
        } catch (error) {
            console.error('Error making booking:', error);
        } finally {
            setLoading(false); // Reset loading state after request completes
        }
    };

    const handleCancelBooking = async () => {
        setLoading(true);

        try {
            const response = await axios.delete(`http://localhost:8082/api/bookings/${flightId}/${customerId}`);

            if (!response.data.success) {
                throw new Error('Cancellation request failed');
            }

            setIsBooked(false); // Update state to indicate cancellation success
            console.log('Cancellation successful:', response.data);
        } catch (error) {
            console.error('Error cancelling booking:', error);
        } finally {
            setLoading(false); // Reset loading state after request completes
        }
    };

    return (
        <button
            className={`${isBooked ? 'bg-gray-300 hover:bg-gray-400 text-black' : 'bg-blue-500 hover:bg-blue-700 text-white'}  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            disabled={loading || isBooked}
            onClick={isBooked ? handleCancelBooking : handleBooking}
        >
            {isBooked ? 'Already Booked' : 'Book Flight'}
        </button>
    );
};

export default BookingButton;
