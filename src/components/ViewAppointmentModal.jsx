import { useState } from 'react';
import AddAppointmentModal from './AddAppointmentModal';

function getPatientName(patients, id) {
  const p = patients.find(p => p.id === id);
  return p ? `${p.firstname} ${p.lastname}` : 'Unknown Patient';
}
function getDoctorName(doctors, id) {
  const d = doctors.find(d => d.id === id);
  return d ? `Dr. ${d.firstname} ${d.lastname} (${d.specialty})` : 'Unknown Doctor';
}
function formatDate(date) {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}
function formatTime(time) {
  if (!time) return '';
  return time.length === 5 ? time : time.slice(0, 5);
}

export default function ViewAppointmentModal({ open, appointment, patients, doctors, onClose, onUpdateAppointment, onDeleteAppointment }) {
  const [editOpen, setEditOpen] = useState(false);

  if (!open || !appointment) return null;

  const handleEdit = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);
  const handleEditSave = async (updated) => {
    await onUpdateAppointment({ ...appointment, ...updated });
    setEditOpen(false);
    onClose();
  };
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      await onDeleteAppointment(appointment.id);
    }
  };

  return (
    <>
      <div className="modal fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
          <div className="px-6 py-4 bg-green-600 flex justify-between items-center">
            <h3 className="text-lg font-medium text-white">Appointment Details</h3>
            <button className="cancel-modal text-white hover:text-gray-200 focus:outline-none" onClick={onClose}>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <h4 className="text-xl font-medium text-gray-900">{appointment.type?.charAt(0).toUpperCase() + appointment.type?.slice(1)}</h4>
              <p className="text-sm text-gray-500">{formatDate(appointment.date)} at {formatTime(appointment.time)}</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Patient</p>
                <p className="mt-1">{getPatientName(patients, appointment.patientid)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Doctor</p>
                <p className="mt-1">{getDoctorName(doctors, appointment.doctorid)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Notes</p>
                <p className="mt-1">{appointment.notes || 'No notes'}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" onClick={handleEdit}>
                Edit
              </button>
              <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" onClick={handleDelete}>
                Cancel Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
      <AddAppointmentModal
        open={editOpen}
        onClose={handleEditClose}
        onSave={handleEditSave}
        patients={patients}
        doctors={doctors}
        initialValues={appointment}
        mode="edit"
      />
    </>
  );
} 