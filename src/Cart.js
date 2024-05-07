import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import gabAirlinesImage from './static/media/gabairlines.png';
import aliExpressImage from './static/media/aliexpress.png'
import nifTravelImage from './static/media/niftravel.png'
import javaEmiratesImage from './static/media/javaemirates.png'
import CancelBookingButton from './CancelBookingButton';
import InitPayment from './InitPayment';
import RefundButton from './RefundButton';

const BookingList = () => {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const airLineLogos = {
        'GabAirlines': gabAirlinesImage,
        'NifTravel': nifTravelImage,
        'JavaEmirates': javaEmiratesImage,
        'AliExpress': aliExpressImage
    };

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch('http://localhost:8082/api/bookings/customer/1');

                if (!response.ok) {
                    throw new Error('Failed to fetch bookings');
                }

                const data = await response.json();
                setBookings(data.filter(booking => booking.bookingStatus === true));
                setLoading(false);
            } catch (error) {
                setError('Error fetching bookings');
                setLoading(false);
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, []); // Empty dependency array to run this effect only once on component mount

    return (
        <>
            <Navbar />
            <h1 className="text-3xl my-5 font-extrabold flex justify-center">My Bookings</h1>
            {bookings.length > 0 && (
                <><div className='mx-20'>
                    <ul>
                        {bookings.map((booking) => (
                            <li key={booking.flight.id} className="bg-white border border-gray-200 rounded-lg shadow mb-5">
                                <div className="p-4 leading-normal">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{booking.flight.airplane.airplane}</h5>
                                    <div className='flex justify-content justify-between'>
                                        <img class="object-fit w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={airLineLogos[booking.flight.airplane.airplane]} alt="" />
                                        <p>
                                            <strong>Origin:</strong> {booking.flight.origin}
                                        </p>
                                        <p>
                                            <strong>Destination:</strong> {booking.flight.destination}
                                        </p>
                                        <p>
                                            <strong>Departure Time:</strong> {new Date(booking.flight.departureTime).toLocaleString()}
                                        </p>
                                        <p>
                                            <strong>Return Time:</strong> {new Date(booking.flight.returnTime).toLocaleString()}
                                        </p>
                                        <p>
                                            <strong>Price:</strong> ${booking.flight.amount.toFixed(0)}
                                        </p>
                                    </div>
                                    <div className="flex justify-end">
                                        <InitPayment bookingIds={[booking.id]} />
                                        {/* <CancelBookingButton bookingId={booking.flight.id}/> */}
                                    </div>
                                </div>
                            </li>

                        ))}
                    </ul>
                </div></>
            )}
        </>
    );
};

export default BookingList;