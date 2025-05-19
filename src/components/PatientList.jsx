import React, { useState, useEffect } from 'react';
import { getAllPatients, deletePatient } from '../db';
import PatientForm from './PatientForm';

export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const loadPatients = async () => {
    const data = await getAllPatients();
    setPatients(data);
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const handleDelete = async (id) => {
    await deletePatient(id);
    loadPatients();
  };

  const handleEdit = (patient) => {
    setSelectedPatient(patient);
    setShowForm(true);
  };

  const handleSave = () => {
    setShowForm(false);
    setSelectedPatient(null);
    loadPatients();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Patients</h1>
      <button
        onClick={() => setShowForm(true)}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add New Patient
      </button>

      {showForm && (
        <div className="mb-4">
          <PatientForm patient={selectedPatient} onSave={handleSave} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {patients.map((patient) => (
          <div key={patient.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{patient.firstname} {patient.lastname}</h2>
            <p>Email: {patient.email}</p>
            <p>Phone: {patient.phone}</p>
            <p>DOB: {patient.dob}</p>
            <p>Gender: {patient.gender}</p>
            <p>Address: {patient.address}</p>
            <div className="mt-2">
              <button
                onClick={() => handleEdit(patient)}
                className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(patient.id)}
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