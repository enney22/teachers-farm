'use client';

import axios from 'axios'; // Import Axios
import { useState, useEffect } from 'react';
import BasicLayout from '../components/BasicLayout'; // Adjust path as necessary
import FadeInSection from '../components/FadeInSection';
import { motion } from 'framer-motion';
import { ArrowRight, DollarSign } from 'lucide-react';

type DonationInfo = {
  id: number;
  description: string;
  name: string;
  orangemoneyname: string;
  orangemoneynumber: string;
  mtnmoneyname: string;
  mtnmoneynumber: string;
};

import { useQuery, useMutation } from '@tanstack/react-query';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export default function Donate() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [contactNumber, setContactNumber] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Fetch donation info from the new FastAPI
  const { data: donationInfo = [], isLoading } = useQuery({
    queryKey: ['donations'],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/public/donations`);
      return response.data;
    },
  });

  // Handle donation submission with mutation
  const mutation = useMutation({
    mutationFn: (donorData: any) => axios.post(`${API_BASE_URL}/public/donor-infos`, donorData),
    onSuccess: () => {
      setIsSubmitted(true);
    },
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      donorsname: name,
      donorsamount: parseFloat(amount),
      dornorsnumber: contactNumber,
    });
  };

  return (
    <BasicLayout>
      <FadeInSection>
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.h1
              className="text-4xl font-bold mb-10 text-center text-green-800"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Support Our Mission
            </motion.h1>
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Side: Donation Information */}
                <div className="border-r pr-8">
                  <h2 className="text-2xl font-semibold mb-4 text-green-700">
                    Please use this information to make your donation
                  </h2>
                  <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    {isLoading ? (
                      <div className="text-center">
                        <p className="text-gray-600 animate-pulse">Loading donation information...</p>
                      </div>
                    ) : donationInfo.length > 0 ? (
                      donationInfo.map((info: DonationInfo) => (
                        <div key={info.id} className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
                          <h3 className="text-lg font-semibold text-green-800 mb-2">
                            Donation Information
                          </h3>
                          <div className="space-y-2">
                            <p className="flex items-center">
                              <strong className="mr-2 text-gray-700">Name:</strong>
                              <span className="text-gray-900">{info.name}</span>
                            </p>
                            <div className="bg-green-50 p-3 rounded-lg mt-2">
                              <p className="text-green-700 font-medium mb-1">MTN Mobile Money:</p>
                              <p className="ml-4">
                                <strong>Name:</strong> {info.mtnmoneyname}
                              </p>
                              <p className="ml-4">
                                <strong>Number:</strong> {info.mtnmoneynumber}
                              </p>
                            </div>
                            <div className="bg-orange-50 p-3 rounded-lg mt-2">
                              <p className="text-orange-700 font-medium mb-1">Orange Mobile Money:</p>
                              <p className="ml-4">
                                <strong>Name:</strong> {info.orangemoneyname}
                              </p>
                              <p className="ml-4">
                                <strong>Number:</strong> {info.orangemoneynumber}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500">No donation information available.</p>
                    )}
                  </div>
                </div>

                {/* Right Side: Donation Form */}
                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-green-700">
                    Please input your name, amount, and contact for a personalized message.
                  </h2>
                  {!isSubmitted ? (
                    <motion.form
                      onSubmit={handleSubmit}
                      className="space-y-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="block mb-1 font-medium">Donor's Name:</label>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full p-2 border rounded-md"
                          placeholder="Enter your name"
                          required
                        />
                      </div>

                      {/* Amount */}
                      <div>
                        <label htmlFor="amount" className="block mb-1 font-medium">Donation Amount:</label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full p-2 pl-8 border rounded-md"
                            placeholder="Enter the donation amount"
                            required
                          />
                          <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-md px-2 py-1"
                          >
                            <option value="USD">USD</option>
                            <option value="LRD">LRD</option>
                          </select>
                        </div>
                      </div>

                      {/* Contact Number */}
                      <div>
                        <label htmlFor="contactNumber" className="block mb-1 font-medium">Contact Number:</label>
                        <input
                          type="tel"
                          id="contactNumber"
                          value={contactNumber}
                          onChange={(e) => setContactNumber(e.target.value)}
                          className="w-full p-2 border rounded-md"
                          placeholder="Enter your contact number"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700"
                      >
                        Submit <ArrowRight className="ml-2" />
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="text-xl font-semibold mb-2 text-green-600">Thank You for Your Donation!</h3>
                      <p>We appreciate your generosity, {name}.</p>
                      <p>Your contribution of {currency} {amount} has been recorded.</p>
                      <p>We will contact you at {contactNumber} soon.</p>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>
    </BasicLayout>
  );
}
