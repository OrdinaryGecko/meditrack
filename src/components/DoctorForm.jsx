import React, { useState, useEffect } from 'react';
import { addDoctor, updateDoctor } from '../db';

export default function DoctorForm({ doctor, onSave }) {
  const [formData, setFormData] = useState({
    id: '',
    firstname: '',
    lastname: '',
    specialty: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    if (doctor) {
      setFormData({
        id: doctor.id || '',
        firstname: doctor.firstname || '',
        lastname: doctor.lastname || '',
        specialty: doctor.specialty || '',
        email: doctor.email || '',
        phone: doctor.phone || ''
      });
    }
  }, [doctor]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (doctor) {
      await updateDoctor(formData);
    } else {
      await addDoctor(formData);
    }
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">First Name</label>
        <input
          type="text"
          value={formData.firstname}
          onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Last Name</label>
        <input
          type="text"
          value={formData.lastname}
          onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Specialty</label>
        <input
          type="text"
          value={formData.specialty}
          onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {doctor ? 'Update Doctor' : 'Add Doctor'}
      </button>
    </form>
  );
} 