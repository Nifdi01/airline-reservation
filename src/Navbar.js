import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for routing
import {ROUTES} from './routes';

const Navbar = () => {
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8081/api/customers/1");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const customerData = await response.json();
                setCustomer(customerData);
            } catch (error) {
                console.error("Error fetching customer data:", error);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs only once (on mount)

    if (!customer) {
        return <div>Loading...</div>;
    }

    return (
        <header className="text-gray-600 body-font bg-gray-100">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <Link to={ROUTES.MAIN_PAGE}>
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
                        viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>
                    </Link>
                    <Link to={ROUTES.MAIN_PAGE} className="ml-3 text-xl">
                    Twin Airline Agency
                    </Link>
                </a>
                <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                    <a className="mr-5 text-m hover:text-gray-900">
                        <span className="font-semibold">@{customer.username}</span>
                    </a>
                    <Link to={ROUTES.UPDATE_BALANCE} className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 mr-2 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                        Balance ${customer.accountBalance.toFixed(0)}
                    </Link>
                    <Link
                        to={ROUTES.CART}
                        type="button"
                        className="py-2 px-3 mr-2 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                    >
                        <svg
                            className="flex-shrink-0 size-4"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m5 11 4-7"></path>
                            <path d="m19 11-4-7"></path>
                            <path d="M2 11h20"></path>
                            <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4"></path>
                            <path d="m9 11 1 9"></path>
                            <path d="M4.5 15.5h15"></path>
                            <path d="m15 11-1 9"></path>
                        </svg>
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
