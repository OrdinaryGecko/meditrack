import { useState, useEffect } from 'react';
import PatientsTabContent from './PatientsTabContent';
import AddPatientModal from './AddPatientModal';
import ViewPatientModal from './ViewPatientModal';
import DoctorsTabContent from './DoctorsTabContent';
import AddDoctorModal from './AddDoctorModal';
import ViewDoctorModal from './ViewDoctorModal';
import AppointmentsTabContent from './AppointmentsTabContent';
import AddAppointmentModal from './AddAppointmentModal';
import ViewAppointmentModal from './ViewAppointmentModal';
import { addPatient, addDoctor, addAppointment, updateDoctor, deleteDoctor, updatePatient, deletePatient, updateAppointment, deleteAppointment, getAllPatients, getAllDoctors, getAllAppointments } from '../db';
import { broadcastChange, subscribeToChanges } from '../sync';

export default function DashboardContainer({ currentAdmin, setCurrentAdmin, patients, setPatients, doctors, setDoctors, appointments, setAppointments }) {
  const [activeTab, setActiveTab] = useState('doctors');
  const [addPatientOpen, setAddPatientOpen] = useState(false);
  const [viewPatientOpen, setViewPatientOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [addDoctorOpen, setAddDoctorOpen] = useState(false);
  const [viewDoctorOpen, setViewDoctorOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [addAppointmentOpen, setAddAppointmentOpen] = useState(false);
  const [viewAppointmentOpen, setViewAppointmentOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Generate next patient ID (P001, P002, ...)
  function getNextPatientId() {
    const max = patients.reduce((acc, p) => {
      const n = parseInt(p.id?.replace('P', '')) || 0;
      return n > acc ? n : acc;
    }, 0);
    return `P${String(max + 1).padStart(3, '0')}`;
  }

  // Generate next doctor ID (D001, D002, ...)
  function getNextDoctorId() {
    const max = doctors.reduce((acc, d) => {
      const n = parseInt(d.id?.replace('D', '')) || 0;
      return n > acc ? n : acc;
    }, 0);
    return `D${String(max + 1).padStart(3, '0')}`;
  }

  // Generate next appointment ID (A001, A002, ...)
  function getNextAppointmentId() {
    const max = appointments.reduce((acc, a) => {
      const n = parseInt(a.id?.replace('A', '')) || 0;
      return n > acc ? n : acc;
    }, 0);
    return `A${String(max + 1).padStart(3, '0')}`;
  }

  function getTodayString() {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  }

  const todaysAppointmentsCount = appointments.filter(a => a.date === getTodayString()).length;

  useEffect(() => {
    const handleSync = async (msg) => {
      const [patients, doctors, appointments] = await Promise.all([
        getAllPatients(),
        getAllDoctors(),
        getAllAppointments(),
      ]);
      setPatients(patients);
      setDoctors(doctors);
      setAppointments(appointments);
    };
    subscribeToChanges(handleSync);
  }, []);

  async function handleAddPatient(data) {
    const newPatient = { ...data, id: getNextPatientId() };
    await addPatient(newPatient);
    const patientsFromDb = await getAllPatients();
    setPatients(patientsFromDb);
    setAddPatientOpen(false);
    broadcastChange('patient', { action: 'add', id: newPatient.id });
  }

  function handleViewPatient(patient) {
    setSelectedPatient(patient);
    setViewPatientOpen(true);
  }

  function handleCloseViewPatient() {
    setViewPatientOpen(false);
    setSelectedPatient(null);
  }

  async function handleAddDoctor(data) {
    const newDoctor = { ...data, id: getNextDoctorId() };
    await addDoctor(newDoctor);
    const doctorsFromDb = await getAllDoctors();
    setDoctors(doctorsFromDb);
    setAddDoctorOpen(false);
    broadcastChange('doctor', { action: 'add', id: newDoctor.id });
  }

  function handleViewDoctor(doctor) {
    setSelectedDoctor(doctor);
    setViewDoctorOpen(true);
  }

  function handleCloseViewDoctor() {
    setViewDoctorOpen(false);
    setSelectedDoctor(null);
  }

  async function handleAddAppointment(data) {
    const newAppointment = { ...data, id: getNextAppointmentId() };
    await addAppointment(newAppointment);
    const appointmentsFromDb = await getAllAppointments();
    setAppointments(appointmentsFromDb);
    setAddAppointmentOpen(false);
    broadcastChange('appointment', { action: 'add', id: newAppointment.id });
  }

  function handleViewAppointment(appointment) {
    setSelectedAppointment(appointment);
    setViewAppointmentOpen(true);
  }

  function handleCloseViewAppointment() {
    setViewAppointmentOpen(false);
    setSelectedAppointment(null);
  }

  async function handleUpdateDoctor(updatedDoctor) {
    await updateDoctor(updatedDoctor);
    const doctorsFromDb = await getAllDoctors();
    setDoctors(doctorsFromDb);
    broadcastChange('doctor', { action: 'update', id: updatedDoctor.id });
  }

  async function handleDeleteDoctor(doctorId) {
    await deleteDoctor(doctorId);
    setDoctors(doctors.filter(d => d.id !== doctorId));
    setViewDoctorOpen(false);
    setSelectedDoctor(null);
    broadcastChange('doctor', { action: 'delete', id: doctorId });
  }

  async function handleUpdatePatient(updatedPatient) {
    await updatePatient(updatedPatient);
    const patientsFromDb = await getAllPatients();
    setPatients(patientsFromDb);
    broadcastChange('patient', { action: 'update', id: updatedPatient.id });
  }

  async function handleDeletePatient(patientId) {
    await deletePatient(patientId);
    setPatients(patients.filter(p => p.id !== patientId));
    setViewPatientOpen(false);
    setSelectedPatient(null);
    broadcastChange('patient', { action: 'delete', id: patientId });
  }

  async function handleUpdateAppointment(updatedAppointment) {
    await updateAppointment(updatedAppointment);
    const appointmentsFromDb = await getAllAppointments();
    setAppointments(appointmentsFromDb);
    broadcastChange('appointment', { action: 'update', id: updatedAppointment.id });
  }

  async function handleDeleteAppointment(appointmentId) {
    await deleteAppointment(appointmentId);
    setAppointments(appointments.filter(a => a.id !== appointmentId));
    setViewAppointmentOpen(false);
    setSelectedAppointment(null);
    broadcastChange('appointment', { action: 'delete', id: appointmentId });
  }

  return (
    <div className="dashboard-container min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                <span className="ml-2 text-xl font-bold text-gray-800">MediTrack</span>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700 mr-4">{currentAdmin?.name}</span>
              <button
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => setCurrentAdmin(null)}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your patients, appointments, and doctors.</p>
        </div>
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Patients</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{patients.length}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Appointments</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{appointments.length}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Doctors</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{doctors.length}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Today's Appointments</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{todaysAppointmentsCount}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              className={`dashboard-tab whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'patients' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}
              onClick={() => setActiveTab('patients')}
            >
              Patients
            </button>
            <button
              className={`dashboard-tab whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'appointments' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}
              onClick={() => setActiveTab('appointments')}
            >
              Appointments
            </button>
            <button
              className={`dashboard-tab whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'doctors' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}
              onClick={() => setActiveTab('doctors')}
            >
              Doctors
            </button>
          </nav>
        </div>
        {/* Tab Content */}
        <div>
          {activeTab === 'patients' && (
            <div className="tab-content active">
              <PatientsTabContent
                patients={patients}
                onAddPatient={() => setAddPatientOpen(true)}
                onViewPatient={handleViewPatient}
              />
              <AddPatientModal
                open={addPatientOpen}
                onClose={() => setAddPatientOpen(false)}
                onSave={handleAddPatient}
              />
              <ViewPatientModal
                open={viewPatientOpen}
                patient={selectedPatient}
                onClose={handleCloseViewPatient}
                onUpdatePatient={handleUpdatePatient}
                onDeletePatient={handleDeletePatient}
                appointments={appointments}
                doctors={doctors}
              />
            </div>
          )}
          {activeTab === 'appointments' && (
            <div className="tab-content active">
              <AppointmentsTabContent
                appointments={appointments}
                patients={patients}
                doctors={doctors}
                onAddAppointment={() => setAddAppointmentOpen(true)}
                onViewAppointment={handleViewAppointment}
              />
              <AddAppointmentModal
                open={addAppointmentOpen}
                onClose={() => setAddAppointmentOpen(false)}
                onSave={handleAddAppointment}
                patients={patients}
                doctors={doctors}
              />
              <ViewAppointmentModal
                open={viewAppointmentOpen}
                appointment={selectedAppointment}
                patients={patients}
                doctors={doctors}
                onClose={handleCloseViewAppointment}
                onUpdateAppointment={handleUpdateAppointment}
                onDeleteAppointment={handleDeleteAppointment}
              />
            </div>
          )}
          {activeTab === 'doctors' && (
            <div className="tab-content active">
              <DoctorsTabContent
                doctors={doctors}
                onAddDoctor={() => setAddDoctorOpen(true)}
                onViewDoctor={handleViewDoctor}
              />
              <AddDoctorModal
                open={addDoctorOpen}
                onClose={() => setAddDoctorOpen(false)}
                onSave={handleAddDoctor}
              />
              <ViewDoctorModal
                open={viewDoctorOpen}
                doctor={selectedDoctor}
                onClose={handleCloseViewDoctor}
                onUpdateDoctor={handleUpdateDoctor}
                onDeleteDoctor={handleDeleteDoctor}
                appointments={appointments}
                patients={patients}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 