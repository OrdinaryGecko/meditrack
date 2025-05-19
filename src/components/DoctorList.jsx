import React, { useState, useEffect } from 'react';
import { getAllDoctors, deleteDoctor } from '../db';
import DoctorForm from './DoctorForm';

export default function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const loadDoctors = async () => {
    const data = await getAllDoctors();
    setDoctors(data);
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoctor(id);
    loadDoctors();
  };

  const handleEdit = (doctor) => {
    setSelectedDoctor(doctor);
    setShowForm(true);
  };

  const handleSave = () => {
    setShowForm(false);
    setSelectedDoctor(null);
    loadDoctors();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Doctors</h1>
      <button
        onClick={() => setShowForm(true)}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add New Doctor
      </button>

      {showForm && (
        <div className="mb-4">
          <DoctorForm doctor={selectedDoctor} onSave={handleSave} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{doctor.firstname} {doctor.lastname}</h2>
            <p>Specialty: {doctor.specialty}</p>
            <p>Email: {doctor.email}</p>
            <p>Phone: {doctor.phone}</p>
            <div className="mt-2">
              <button
                onClick={() => handleEdit(doctor)}
                className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(doctor.id)}
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