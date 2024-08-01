'use client';
import React, { useState, useContext } from "react";
import { UserContext } from "@/context/UserContext";

export default function TransferMoney() {
    const [accountNumber, setAccountNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    const handleTransfer = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        if (user) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/balance/add`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    },
                    body: JSON.stringify({
                        userId: user.id,
                        amount: parseFloat(amount)  // Ensure amount is a number
                    })
                });

                console.log(response);

                if (response.ok) {
                    const updatedBalance = await response.json();
                    setSuccessMessage(`Successfully added $${amount} to your account.`);
                    setError(null);
                } else {
                    setError("Failed to transfer money. Please try again.");
                    setSuccessMessage(null);
                }
            } catch (error) {
                setError("An error occurred. Please try again.");
                setSuccessMessage(null);
            } finally {
                setLoading(false);
            }
        } else {
            setError("User not found. Please log in again.");
            setSuccessMessage(null);
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-5">
            <div className="relative h-screen bg-cover bg-center text-center bg-white bg-opacity-85 bg-blend-overlay" style={{ backgroundImage: "url('/icons/SENDMONEY/gMbg.jpg')" }}>
                <div className="w-full h-7 bg-no-repeat bg-contain" style={{ backgroundImage: "url('/icons/SENDMONEY/gmBg.jp')" }}></div>
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold mb-4">Secure Money Transfer</h1>
                    <p className="text-xl">Add your money safely and freely.</p>
                </div>
                <div className="flex flex-wrap justify-between gap-10 bg-white w-4/5 p-8 mx-auto text-center mb-10 lg:flex-nowrap">
                    <div className="flex flex-col w-full lg:w-1/2">
                        <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-lg rounded-lg p-8 w-full border border-gray-200">
                            <form onSubmit={handleTransfer} className="space-y-5">
                                <div>
                                    <label className="block text-lg font-medium">Amount</label>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        min={1}
                                        className="mt-1 block w-full p-3 bg-white bg-opacity-60 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3 bg-yellow-500 text-white font-semibold rounded-md shadow-md hover:bg-yellow-600 transition duration-300"
                                >
                                    Transfer Money
                                </button>
                                {loading && <div>Loading ...</div>}
                                {error && <p className="text-red-500 mt-3">{error}</p>}
                                {successMessage && <p className="text-green-500 mt-3">{successMessage}</p>}
                            </form>
                        </div>
                    </div>
                    <div className="w-full lg:w-[45%] flex items-center hidden lg:flex">
                        <img src="/icons/SENDMONEY/addmoney.jpeg" alt="" className="w-full" />
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-11 bg-no-repeat bg-contain" style={{ backgroundImage: "url('/images/curved-bottom.svg')" }}></div>
            </div>
        </main>
    );
}
