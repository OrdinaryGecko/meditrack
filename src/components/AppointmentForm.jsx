import React, { useState, useEffect } from 'react';
import { addAppointment, updateAppointment } from '../db';

export default function AppointmentForm({ appointment, onSave }) {
  const [formData, setFormData] = useState({
    id: '',
    patientid: '',
    doctorid: '',
    date: '',
    time: '',
    type: '',
    notes: ''
  });

  useEffect(() => {
    if (appointment) {
      setFormData({
        id: appointment.id || '',
        patientid: appointment.patientid || '',
        doctorid: appointment.doctorid || '',
        date: appointment.date || '',
        time: appointment.time || '',
        type: appointment.type || '',
        notes: appointment.notes || ''
      });
    }
  }, [appointment]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (appointment) {
      await updateAppointment(formData);
    } else {
      await addAppointment(formData);
    }
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Patient ID</label>
        <input
          type="text"
          value={formData.patientid}
          onChange={(e) => setFormData({ ...formData, patientid: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Doctor ID</label>
        <input
          type="text"
          value={formData.doctorid}
          onChange={(e) => setFormData({ ...formData, doctorid: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Time</label>
        <input
          type="time"
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Type</label>
        <input
          type="text"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Notes</label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {appointment ? 'Update Appointment' : 'Add Appointment'}
      </button>
    </form>
  );
} 