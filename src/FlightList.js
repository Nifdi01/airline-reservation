import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import gabAirlinesImage from './static/media/gabairlines.png';
import aliExpressImage from './static/media/aliexpress.png'
import nifTravelImage from './static/media/niftravel.png'
import javaEmiratesImage from './static/media/javaemirates.png'
import {ROUTES} from './routes';
import {Link} from 'react-router-dom';
import axios from 'axios';
import BookingButton from './BookingButton';
import Navbar from './Navbar';


const FlightSearchForm = () => {
  const [formData, setFormData] = useState({
    destination: '',
    departureTime: '',
    origin: '',
    returnTime: ''
  });
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8081/api/customers/1');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const customerData = await response.json();
            setCustomer(customerData);
        } catch (error) {
            console.error('Error fetching customer data:', error);
        }
    };

      fetchData();
  }, []); // Empty dependency array means this effect runs only once (on mount)

  if (!customer) {
      return <div>Loading...</div>;
  }

  // List of distinct locations
  const locations = [
    "Dubai International",
    "London Heathrow",
    "Los Angeles LAX",
    "Tokyo Haneda",
    "New York JFK",
    "Singapore Changi",
    "Paris CDG",
    "Sydney Kingsford",
    "Shanghai Pudong",
    "Hong Kong International",
  ];

  const airLineLogos = {
    'GabAirlines': gabAirlinesImage,
    'NifTravel': nifTravelImage,
    'JavaEmirates': javaEmiratesImage,
    'AliExpress': aliExpressImage
  };

  // Fetch flights based on form data
  const fetchFlights = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8082/api/flights/search', formData);
      setFlights(response.data); // Assuming API returns a list of flights
      setLoading(false);
    } catch (error) {
      console.error('Error fetching flights:', error);
      setLoading(false);
      setFlights([]);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchFlights();
  };

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (   
    <>
    <Navbar />
    <h1 className="text-3xl my-5 font-extrabold flex justify-center">Choose your flight</h1>
    <div className="mx-20 my-5">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className='flex justify-between'>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="origin">
              <>Origin</>
            </label>
            <select
              name="origin"
              id="origin"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
              value={formData.origin}
            >
              <option value="">Select Origin</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="destination">
              Destination
            </label>
            <select
              name="destination"
              id="destination"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
              value={formData.destination}
            >
              <option value="">Select Destination</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="departureTime">
              Departure Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="departureTime"
              name="departureTime"
              type="date"
              onChange={handleChange}
              value={formData.departureTime} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="returnTime">
              Return Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="returnTime"
              name="returnTime"
              type="date"
              onChange={handleChange}
              value={formData.returnTime} />
          </div>
        </div>
        
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search Flights'}
        </button>
      </form>
      {flights.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-2">Available Flights</h2>
          <ul>
            {flights.map((flight) => (
              <li key={flight.id} className="bg-white border border-gray-200 rounded-lg shadow mb-5">
                  <div className="p-4 leading-normal">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{flight.airplane.airplane}</h5>
                      <div className='flex justify-content justify-between'>
                        <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={airLineLogos[flight.airplane.airplane]} alt="" />
                        <p>
                          <strong>Origin:</strong> {flight.origin}
                        </p>
                        <p>
                          <strong>Destination:</strong> {flight.destination}
                        </p>
                        <p>
                          <strong>Departure Time:</strong> {new Date(flight.departureTime).toLocaleString()}
                        </p>
                        <p>
                          <strong>Return Time:</strong> {new Date(flight.returnTime).toLocaleString()}
                        </p>
                        <p>
                          <strong>Price:</strong> ${flight.amount.toFixed(0)}
                        </p>
                      </div>
                      <div className="flex justify-end">
                      <BookingButton
                          flightId={flight.id}
                          customerId={customer.id}
                      />
                      </div>
                  </div>
              </li>

            ))}
          </ul>
        </div>
      )}
    </div></>
  );
};

export default FlightSearchForm;
