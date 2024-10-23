"use client";  // Indique que ce composant doit être rendu côté client

import { useState } from 'react';

export default function Formulaire() {
  const [formData, setFormData] = useState({
    lastname: '',
    firstname: '',
    email: '',
    message: ''
  });

  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData); // Enregistre les données soumises
  };

  return (
    <div className="h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center">
      <div className="mx-auto p-12 bg-white shadow-lg rounded-lg ">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 ">Formulaire de Contact</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="lastname" className="block text-lg font-medium text-gray-700">Lastname:</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="firstname" className="block text-lg font-medium text-gray-700">Firstname:</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-900">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-lg font-medium text-gray-900">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 h-32 resize-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Envoyer
          </button>
        </form>

        {submittedData && (
          <div className="mt-6 p-4 bg-green-100 border border-green-500 rounded-md">
            <h2 className="text-xl font-bold text-green-700">Données soumises</h2>
            <p className="text-green-700"><strong>Lastname:</strong> {submittedData.lastname}</p>
            <p className="text-green-700"><strong>Firstname:</strong> {submittedData.firstname}</p>
            <p className="text-green-700"><strong>Email:</strong> {submittedData.email}</p>
            <p className="text-green-700"><strong>Message:</strong> {submittedData.message}</p>
          </div>
        )}
      </div>
    </div>  
  );
}
