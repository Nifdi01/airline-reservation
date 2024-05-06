import React, { useState } from "react";
import axios from "axios";
import Navbar from './Navbar';

const BalanceUpdateForm = () => {
    const [cardHolderName, setCardHolderName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCvv] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [newBalance, setNewBalance] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleBalanceUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage('');
        setErrorMessage('');

        const requestData = {
            newBalance: parseFloat(newBalance),
            operation: '+',
            cardNumber,
            cardHolderName,
            expirationDate,
            cvv
        };

        try {
            const response = await fetch('http://localhost:8081/api/customers/1/updateBalance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                throw new Error('Failed to update balance');
            }

            setSuccessMessage('Balance updated successfully!');
        } catch (error) {
            setErrorMessage('Error updating balance');
            console.error('Error updating balance:', error);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <>
        <Navbar />
            <section class="text-gray-600 body-font relative">
                <div class="container px-5 py-24 mx-auto">
                    <div class="flex flex-col text-center w-full mb-12">
                        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                            Increase Balance
                        </h1>
                    </div>
                    {successMessage && <div class="mx-auto w-1/3 p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
                                        <span class="font-medium">{successMessage}</span>
                                        </div>}
                    {errorMessage && <div class="mx-auto w-1/3 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                                    <span class="font-medium">{errorMessage}</span> Change a few things up and try submitting again.
                                    </div>}
                    <form onSubmit={handleBalanceUpdate} class="lg:w-1/3 md:w-2/3 mx-auto">
                        <div class="flex flex-wrap -m-2">
                            <div class="p-2 w-full">
                                <div class="relative">
                                    <label for="name" class="leading-7 text-sm text-gray-600">
                                        Card Holder Name
                                    </label>
                                    <input
                                        value={cardHolderName}
                                        onChange={(e) => setCardHolderName(e.target.value)}
                                        required
                                        type="text"
                                        placeholder="John Doe"
                                        class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                </div>
                            </div>
                            <div class="p-2 w-2/3">
                                <div class="relative">
                                    <label for="email" class="leading-7 text-sm text-gray-600">
                                        Card Number
                                    </label>
                                    <input
                                        value={cardNumber}
                                        onChange={(e) => setCardNumber(e.target.value)}
                                        required
                                        type="text"
                                        placeholder="1234 4312 3321 4342"
                                        class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                </div>
                            </div>
                            <div class="p-2 w-1/3">
                                <div class="relative">
                                    <label for="name" class="leading-7 text-sm text-gray-600">
                                        CVV
                                    </label>
                                    <input
                                        value={cvv}
                                        onChange={(e) => setCvv(e.target.value)}
                                        required
                                        type="text"
                                        placeholder="432"
                                        class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                </div>
                            </div>
                            <div class="p-2 w-1/2">
                                <div class="relative">
                                    <label for="name" class="leading-7 text-sm text-gray-600">
                                        Expiration Date
                                    </label>
                                    <input
                                        value={expirationDate}
                                        onChange={(e) => setExpirationDate(e.target.value)}
                                        required
                                        type="text"
                                        placeholder="06/26"
                                        class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                </div>
                            </div>
                            <div class="p-2 w-1/2">
                                <div class="relative">
                                    <label for="name" class="leading-7 text-sm text-gray-600">
                                        Amount ($)
                                    </label>
                                    <input
                                        value={newBalance}
                                        onChange={(e) => setNewBalance(e.target.value)}
                                        required
                                        type="number"
                                        placeholder="700"
                                        class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                </div>
                            </div>
                            <div class="p-2 w-full">
                                <button type="submit" disabled={isLoading} class="flex mx-auto text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg">
                                {isLoading ? "Updating..." : "Update Balance"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
            {/* <div>
                <h2>Update Balance</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {updatedBalance && (
                    <p style={{ color: "green" }}>
                        Balance updated successfully! New balance: ${updatedBalance}
                    </p>
                )}
                <form onSubmit={handleBalanceUpdate}>
                    <label>
                        New Balance:
                        <input
                            type="number"
                            value={newBalance}
                            onChange={(e) => setNewBalance(e.target.value)}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Card Number:
                        <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Card Holder Name:
                        <input
                            type="text"
                            value={cardHolderName}
                            onChange={(e) => setCardHolderName(e.target.value)}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Expiration Date:
                        <input
                            type="text"
                            value={expirationDate}
                            onChange={(e) => setExpirationDate(e.target.value)}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        CVV:
                        <input
                            type="text"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            required
                        />
                    </label>
                    <br />
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? "Updating..." : "Update Balance"}
                    </button>
                </form>
            </div> */}
        </>
    );
};

export default BalanceUpdateForm;
