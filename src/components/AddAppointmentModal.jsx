import { useState } from 'react';

export default function AddAppointmentModal({ open, onClose, onSave, patients, doctors }) {
  const [patientid, setPatientId] = useState('');
  const [doctorid, setDoctorId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [type, setType] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!patientid || !doctorid || !date || !time || !type || !notes) {
      alert('Please fill all fields');
      return;
    }
    onSave({ patientid, doctorid, date, time, type, notes });
    setPatientId(''); setDoctorId(''); setDate(''); setTime(''); setType(''); setNotes('');
  };

  if (!open) return null;

  return (
    <div className="modal fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
        <div className="px-6 py-4 bg-blue-600">
          <h3 className="text-lg font-medium text-white">Add New Appointment</h3>
        </div>
        <form className="p-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="appointment-patient-id">Patient ID</label>
              <input type="text" id="appointment-patient-id" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" value={patientid} onChange={e => setPatientId(e.target.value)} required />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="appointment-doctor-id">Doctor ID</label>
              <input type="text" id="appointment-doctor-id" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" value={doctorid} onChange={e => setDoctorId(e.target.value)} required />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="appointment-date">Date</label>
              <input type="date" id="appointment-date" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" value={date} onChange={e => setDate(e.target.value)} required />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="appointment-time">Time</label>
              <input type="time" id="appointment-time" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" value={time} onChange={e => setTime(e.target.value)} required />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="appointment-type">Type</label>
              <input type="text" id="appointment-type" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" value={type} onChange={e => setType(e.target.value)} required />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="appointment-notes">Notes</label>
              <textarea id="appointment-notes" rows="2" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" value={notes} onChange={e => setNotes(e.target.value)} required></textarea>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button type="button" className="cancel-modal px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Save Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 