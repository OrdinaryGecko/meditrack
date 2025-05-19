import { useState } from 'react'
import AuthContainer from './components/AuthContainer'
import DashboardContainer from './components/DashboardContainer'

function App() {
  const [admins, setAdmins] = useState([
    { email: 'admin@example.com', password: 'password123', name: 'Admin User' },
  ])
  const [currentAdmin, setCurrentAdmin] = useState(null)
  const [patients, setPatients] = useState([])
  const [doctors, setDoctors] = useState([])
  const [appointments, setAppointments] = useState([])

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {!currentAdmin ? (
        <AuthContainer
          admins={admins}
          setAdmins={setAdmins}
          setCurrentAdmin={setCurrentAdmin}
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
        />
      )}
    </div>
  )
}

export default App
