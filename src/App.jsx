import { useState, useEffect } from 'react'
import AuthContainer from './components/AuthContainer'
import DashboardContainer from './components/DashboardContainer'
import {
  getAllAdmins, addAdmin,
  getAllPatients, addPatient, updatePatient, deletePatient,
  getAllDoctors, addDoctor, updateDoctor, deleteDoctor,
  getAllAppointments, addAppointment, updateAppointment, deleteAppointment
} from './db'
import { broadcastChange, subscribeToChanges } from './sync';

function App() {
  const [admins, setAdmins] = useState([])
  const [currentAdmin, setCurrentAdminState] = useState(null)
  const [patients, setPatients] = useState([])
  const [doctors, setDoctors] = useState([])
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  const setCurrentAdmin = (admin, { suppressBroadcast } = {}) => {
    setCurrentAdminState(admin);
    if (admin) {
      localStorage.setItem('currentAdmin', JSON.stringify(admin));
      if (!suppressBroadcast) {
        broadcastChange('auth', { action: 'login', admin });
      }
    } else {
      localStorage.removeItem('currentAdmin');
      if (!suppressBroadcast) {
        broadcastChange('auth', { action: 'logout' });
      }
    }
  };

  useEffect(() => {
    const savedAdmin = localStorage.getItem('currentAdmin');
    if (savedAdmin) {
      setCurrentAdminState(JSON.parse(savedAdmin));
    }
    async function loadAll() {
      setLoading(true)
      setAdmins(await getAllAdmins())
      setPatients(await getAllPatients())
      setDoctors(await getAllDoctors())
      setAppointments(await getAllAppointments())
      setLoading(false)
    }
    loadAll();

    const handleSync = (msg) => {
      if (msg.type === 'auth') {
        if (msg.payload?.action === 'logout') {
          setCurrentAdmin(null, { suppressBroadcast: true });
        } else if (msg.payload?.action === 'login' && msg.payload.admin) {
          setCurrentAdmin(msg.payload.admin, { suppressBroadcast: true });
        }
      }
    };
    subscribeToChanges(handleSync);
  }, []);

  const handleAddAdmin = async (admin) => {
    await addAdmin(admin)
    setAdmins(await getAllAdmins())
  }

  const handleAddPatient = async (patient) => {
    await addPatient(patient)
    setPatients(await getAllPatients())
  }
  const handleUpdatePatient = async (patient) => {
    await updatePatient(patient)
    setPatients(await getAllPatients())
  }
  const handleDeletePatient = async (id) => {
    await deletePatient(id)
    setPatients(await getAllPatients())
  }

  const handleAddDoctor = async (doctor) => {
    await addDoctor(doctor)
    setDoctors(await getAllDoctors())
  }
  const handleUpdateDoctor = async (doctor) => {
    await updateDoctor(doctor)
    setDoctors(await getAllDoctors())
  }
  const handleDeleteDoctor = async (id) => {
    await deleteDoctor(id)
    setDoctors(await getAllDoctors())
  }

  const handleAddAppointment = async (appointment) => {
    await addAppointment(appointment)
    setAppointments(await getAllAppointments())
  }
  const handleUpdateAppointment = async (appointment) => {
    await updateAppointment(appointment)
    setAppointments(await getAllAppointments())
  }
  const handleDeleteAppointment = async (id) => {
    await deleteAppointment(id)
    setAppointments(await getAllAppointments())
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <img
            src="/meditrack-logo.svg"
            alt="MediTrack Logo"
            className="w-20 h-20 animate-bounce mb-4"
          />
          <span className="text-blue-700 text-xl font-semibold tracking-wide">MediTrack</span>
          <span className="text-gray-400 mt-2">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {!currentAdmin ? (
        <AuthContainer
          admins={admins}
          setAdmins={setAdmins}
          setCurrentAdmin={setCurrentAdmin}
          onAddAdmin={handleAddAdmin}
        />
      ) : (
        <DashboardContainer
          currentAdmin={currentAdmin}
          setCurrentAdmin={setCurrentAdmin}
          patients={patients}
          setPatients={setPatients}
          doctors={doctors}
          setDoctors={setDoctors}
          appointments={appointments}
          setAppointments={setAppointments}
          onAddPatient={handleAddPatient}
          onUpdatePatient={handleUpdatePatient}
          onDeletePatient={handleDeletePatient}
          onAddDoctor={handleAddDoctor}
          onUpdateDoctor={handleUpdateDoctor}
          onDeleteDoctor={handleDeleteDoctor}
          onAddAppointment={handleAddAppointment}
          onUpdateAppointment={handleUpdateAppointment}
          onDeleteAppointment={handleDeleteAppointment}
        />
      )}
    </div>
  )
}

export default App
