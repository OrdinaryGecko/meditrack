import { useState } from 'react';
import AddPatientModal from './AddPatientModal';

function formatDateTime(date, time) {
  if (!date) return '';
  const dt = new Date(date + 'T' + (time || '00:00'));
  // Format: Jun 15, 2023, 10:00 AM
  return dt.toLocaleString(undefined, {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit', hour12: true
  });
}

export default function ViewPatientModal({ open, patient, onClose, onUpdatePatient, onDeletePatient, appointments = [], doctors = [] }) {
  const [editOpen, setEditOpen] = useState(false);

  if (!open || !patient) return null;

  // Get top 3 most recent appointments for this patient
  const recentAppointments = appointments
    .filter(a => a.patientid === patient.id)
    .sort((a, b) => (b.date + (b.time || '')).localeCompare(a.date + (a.time || '')))
    .slice(0, 3);

  const getDoctorName = (id) => {
    const d = doctors.find(doc => doc.id === id);
    return d ? `Dr. ${d.firstname} ${d.lastname}` : 'Unknown Doctor';
  };

  const typeColor = (type) => {
    switch (type) {
      case 'consultation': return 'bg-blue-100 text-blue-800';
      case 'check-up': return 'bg-green-100 text-green-800';
      case 'follow-up': return 'bg-yellow-100 text-yellow-800';
      case 'emergency': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEdit = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);
  const handleEditSave = async (updated) => {
    await onUpdatePatient({ ...patient, ...updated });
    setEditOpen(false);
    onClose();
  };
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      await onDeletePatient(patient.id);
    }
  };

  return (
    <>
      <div className="modal fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
          <div className="px-6 py-4 bg-blue-600 flex justify-between items-center">
            <h3 className="text-lg font-medium text-white">Patient Details</h3>
            <button className="cancel-modal text-white hover:text-gray-200 focus:outline-none" onClick={onClose}>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <h4 id="view-patient-name" className="text-xl font-medium text-gray-900">{patient.firstname} {patient.lastname}</h4>
              <p id="view-patient-id" className="text-sm text-gray-500">Patient ID: {patient.id}</p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
              <div className="sm:col-span-1">
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p id="view-patient-email" className="mt-1 break-all">{patient.email}</p>
              </div>
              <div className="sm:col-span-1">
                <p className="text-sm font-medium text-gray-500">Phone</p>
                <p id="view-patient-phone" className="mt-1 break-all">{patient.phone}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Date of Birth</p>
                <p id="view-patient-dob" className="mt-1">{patient.dob}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Gender</p>
                <p id="view-patient-gender" className="mt-1">{patient.gender}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm font-medium text-gray-500">Address</p>
                <p id="view-patient-address" className="mt-1">{patient.address}</p>
              </div>
            </div>
            {/* Recent Appointments Section */}
            <div className="mt-6 border-t border-gray-200 pt-4">
              <h5 className="font-medium text-gray-900 mb-2">Recent Appointments</h5>
              <ul id="view-patient-appointments" className="divide-y divide-gray-200">
                {recentAppointments.length === 0 && (
                  <li className="py-3 text-sm text-gray-500">No recent appointments.</li>
                )}
                {recentAppointments.map((appt) => (
                  <li className="py-3" key={appt.id}>
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{formatDateTime(appt.date, appt.time)}</p>
                        <p className="text-sm text-gray-500">With {getDoctorName(appt.doctorid)}</p>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColor(appt.type)}`}>
                        {appt.type?.charAt(0).toUpperCase() + appt.type?.slice(1)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button id="edit-patient-btn" className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={handleEdit}>
                Edit
              </button>
              <button id="delete-patient-btn" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" onClick={handleDelete}>
                Delete
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