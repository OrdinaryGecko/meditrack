import { useState } from 'react'
import AuthContainer from './components/AuthContainer'

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
      <AuthContainer
        admins={admins}
        setAdmins={setAdmins}
        setCurrentAdmin={setCurrentAdmin}
      />
    </div>
  )
}

export default App
