import React, { useState, useEffect } from 'react';
import { getAllAppointments, deleteAppointment } from '../db';
import AppointmentForm from './AppointmentForm';

export default function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const loadAppointments = async () => {
    const data = await getAllAppointments();
    setAppointments(data);
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleDelete = async (id) => {
    await deleteAppointment(id);
    loadAppointments();
  };

  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
    setShowForm(true);
  };

  const handleSave = () => {
    setShowForm(false);
    setSelectedAppointment(null);
    loadAppointments();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Appointments</h1>
      <button
        onClick={() => setShowForm(true)}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add New Appointment
      </button>

      {showForm && (
        <div className="mb-4">
          <AppointmentForm appointment={selectedAppointment} onSave={handleSave} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">Appointment {appointment.id}</h2>
            <p>Patient ID: {appointment.patientid}</p>
            <p>Doctor ID: {appointment.doctorid}</p>
            <p>Date: {appointment.date}</p>
            <p>Time: {appointment.time}</p>
            <p>Type: {appointment.type}</p>
            <p>Notes: {appointment.notes}</p>
            <div className="mt-2">
              <button
                onClick={() => handleEdit(appointment)}
                className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(appointment.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 