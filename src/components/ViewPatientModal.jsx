import { useState } from 'react';
import AddPatientModal from './AddPatientModal';

export default function ViewPatientModal({ open, patient, onClose, onUpdatePatient, onDeletePatient }) {
  const [editOpen, setEditOpen] = useState(false);

  if (!open || !patient) return null;

  const handleEdit = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);
  const handleEditSave = async (updated) => {
    await onUpdatePatient({ ...patient, ...updated });
    setEditOpen(false);
    onClose();
  };
  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${patient.firstname} ${patient.lastname}?`)) {
      await onDeletePatient(patient.id);
      onClose();
    }
  };

  return (
    <>
      <div className="modal fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
          <div className="px-6 py-4 bg-blue-600">
            <h3 className="text-lg font-medium text-white">Patient Details</h3>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <h4 className="text-xl font-medium text-gray-900">{patient.firstname} {patient.lastname}</h4>
              <p className="text-sm text-gray-500">Patient ID: {patient.id}</p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="mt-1">{patient.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Phone</p>
                <p className="mt-1">{patient.phone}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Date of Birth</p>
                <p className="mt-1">{patient.dob}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Gender</p>
                <p className="mt-1">{patient.gender?.charAt(0).toUpperCase() + patient.gender?.slice(1)}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm font-medium text-gray-500">Address</p>
                <p className="mt-1">{patient.address}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={handleEdit}
              >
                Edit
              </button>
              <button
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <AddPatientModal
        open={editOpen}
        onClose={handleEditClose}
        onSave={handleEditSave}
        initialValues={patient}
        mode="edit"
      />
    </>
  );
} 