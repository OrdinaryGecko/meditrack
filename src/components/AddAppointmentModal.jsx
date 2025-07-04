import { useState, useEffect } from 'react';

export default function AddAppointmentModal({ open, onClose, onSave, patients, doctors, initialValues = {}, mode = 'add' }) {
  const [patientid, setPatientId] = useState('');
  const [doctorid, setDoctorId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [type, setType] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      if (mode === 'edit') {
        setPatientId(initialValues.patientid || '');
        setDoctorId(initialValues.doctorid || '');
        setDate(initialValues.date || '');
        setTime(initialValues.time || '');
        setType(initialValues.type || '');
        setNotes(initialValues.notes || '');
      } else if (mode === 'add') {
        setPatientId('');
        setDoctorId('');
        setDate('');
        setTime('');
        setType('');
        setNotes('');
      }
    }
    if (!open) {
      setLoading(false);
    }
  }, [open, mode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!patientid || !doctorid || !date || !time || !type) {
      alert('Please fill all fields');
      return;
    }
    // Prevent past appointments
    const selectedDateTime = new Date(date + 'T' + time);
    if (selectedDateTime < new Date()) {
      alert('Cannot create an appointment in the past.');
      return;
    }
    setLoading(true);
    await onSave({ ...initialValues, patientid, doctorid, date, time, type, notes });
  };

  if (!open) return null;

  return (
    <div className="modal fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
        <div className="px-6 py-4 bg-green-600">
          <h3 className="text-lg font-medium text-white">{mode === 'edit' ? 'Edit Appointment' : 'Add New Appointment'}</h3>
        </div>
        <form className="p-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="appointment-patient">Patient</label>
              <select
                id="appointment-patient"
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500${loading ? ' bg-gray-100 opacity-60' : ''}`}
                value={patientid}
                onChange={e => setPatientId(e.target.value)}
                required
                disabled={loading}
              >
                <option value="">Select Patient</option>
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>{p.firstname} {p.lastname}</option>
                ))}
              </select>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="appointment-doctor">Doctor</label>
              <select
                id="appointment-doctor"
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500${loading ? ' bg-gray-100 opacity-60' : ''}`}
                value={doctorid}
                onChange={e => setDoctorId(e.target.value)}
                required
                disabled={loading}
              >
                <option value="">Select Doctor</option>
                {doctors.map((d) => (
                  <option key={d.id} value={d.id}>{d.firstname} {d.lastname} ({d.specialty})</option>
                ))}
              </select>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="appointment-date">Date</label>
              <input type="date" id="appointment-date" className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500${loading ? ' bg-gray-100 opacity-60' : ''}`} value={date} onChange={e => setDate(e.target.value)} required disabled={loading} />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="appointment-time">Time</label>
              <input type="time" id="appointment-time" className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500${loading ? ' bg-gray-100 opacity-60' : ''}`} value={time} onChange={e => setTime(e.target.value)} required disabled={loading} />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="appointment-type">Appointment Type</label>
              <select
                id="appointment-type"
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500${loading ? ' bg-gray-100 opacity-60' : ''}`}
                value={type}
                onChange={e => setType(e.target.value)}
                required
                disabled={loading}
              >
                <option value="">Select Type</option>
                <option value="consultation">Consultation</option>
                <option value="follow-up">Follow-up</option>
                <option value="check-up">Check-up</option>
                <option value="emergency">Emergency</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="appointment-notes">Notes</label>
              <textarea id="appointment-notes" rows="2" className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500${loading ? ' bg-gray-100 opacity-60' : ''}`} value={notes} onChange={e => setNotes(e.target.value)} disabled={loading} />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button type="button" className="cancel-modal px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" disabled={loading}>
              {loading ? (mode === 'edit' ? 'Saving...' : 'Creating...') : (mode === 'edit' ? 'Save Changes' : 'Add New Appointment')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 