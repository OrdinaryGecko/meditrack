import { useState } from 'react';

function getPatientName(patients, id) {
  const p = patients.find(p => p.id === id);
  return p ? `${p.firstname} ${p.lastname}` : 'Unknown Patient';
}
function getDoctorName(doctors, id) {
  const d = doctors.find(d => d.id === id);
  return d ? `Dr. ${d.firstname} ${d.lastname}` : 'Unknown Doctor';
}
function formatDate(date) {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}
function formatTime(time) {
  if (!time) return '';
  return time.length === 5 ? time : time.slice(0, 5);
}

export default function AppointmentsTabContent({ appointments, patients, doctors, onAddAppointment, onViewAppointment }) {
  const [showPast, setShowPast] = useState(false);
  const now = new Date();
  const futureAppointments = appointments.filter(a => {
    const dt = new Date(a.date + 'T' + (a.time || '00:00'));
    return dt >= now;
  }).sort((a, b) => (a.date + (a.time || '')).localeCompare(b.date + (b.time || '')));
  const pastAppointments = appointments.filter(a => {
    const dt = new Date(a.date + 'T' + (a.time || '00:00'));
    return dt < now;
  }).sort((a, b) => (a.date + (a.time || '')).localeCompare(b.date + (b.time || '')));

  const listToShow = showPast ? pastAppointments : futureAppointments;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Appointment Schedule</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowPast(false)}
            className={`px-3 py-1 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 ${!showPast ? 'bg-gray-200 text-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setShowPast(true)}
            className={`px-3 py-1 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 ${showPast ? 'bg-gray-200 text-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Past
          </button>
          <button
            onClick={onAddAppointment}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ml-2"
          >
            <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Schedule Appointment
          </button>
        </div>
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {listToShow.length === 0 ? (
            <li className="px-6 py-4 text-center text-gray-500">
              {showPast ? 'No past appointments.' : 'No appointments scheduled. Create a new appointment to get started.'}
            </li>
          ) : (
            listToShow.map(appointment => {
              const patient = getPatientName(patients, appointment.patientid);
              const doctor = getDoctorName(doctors, appointment.doctorid);
              return (
                <li key={appointment.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${appointment.type === 'consultation' ? 'bg-blue-100 text-blue-800' : appointment.type === 'check-up' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {appointment.type?.charAt(0).toUpperCase() + appointment.type?.slice(1)}
                          </span>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{formatDate(appointment.date)} at {formatTime(appointment.time)}</p>
                          <p className="text-sm text-gray-500">{patient} with {doctor}</p>
                        </div>
                      </div>
                    </div>
                    <button
                      className="view-appointment-btn inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      onClick={() => onViewAppointment(appointment)}
                    >
                      View
                    </button>
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
} 