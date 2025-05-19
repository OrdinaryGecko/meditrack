import { useState } from 'react';

export default function AuthContainer({ admins, setCurrentAdmin, onAddAdmin }) {
  const [tab, setTab] = useState('login');
  const [loginEmail, setLoginEmail] = useState('admin@example.com');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const admin = admins.find(a => a.email === loginEmail && a.password === loginPassword);
    if (admin) {
      setCurrentAdmin(admin);
    } else {
      alert('Invalid email or password');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (registerPassword !== registerConfirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (admins.some(a => a.email === registerEmail)) {
      alert('Email already registered');
      return;
    }
    setLoading(true);
    const newAdmin = { email: registerEmail, password: registerPassword, name: registerName };
    await onAddAdmin(newAdmin);
    setCurrentAdmin(newAdmin);
    setLoading(false);
  };

  return (
    <div className="auth-container min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-500 to-blue-700">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-md w-full">
        <div className="p-8">
          <div className="text-center mb-8">
            <svg className="w-12 h-12 mx-auto text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            <h2 className="mt-2 text-2xl font-bold text-gray-800">MediTrack</h2>
            <p className="text-gray-500">Patient Management System</p>
          </div>
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`auth-tab flex-1 py-2 font-medium ${tab === 'login' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => setTab('login')}
            >
              Login
            </button>
            <button
              className={`auth-tab flex-1 py-2 font-medium ${tab === 'register' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => setTab('register')}
            >
              Register
            </button>
          </div>
          {tab === 'login' ? (
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="login-email">Email</label>
                <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" id="login-email" type="email" required value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="login-password">Password</label>
                <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" id="login-password" type="password" required value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                Sign In
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="register-name">Full Name</label>
                <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" id="register-name" type="text" required value={registerName} onChange={e => setRegisterName(e.target.value)} />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="register-email">Email</label>
                <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" id="register-email" type="email" required value={registerEmail} onChange={e => setRegisterEmail(e.target.value)} />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="register-password">Password</label>
                <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" id="register-password" type="password" required value={registerPassword} onChange={e => setRegisterPassword(e.target.value)} />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="register-confirm-password">Confirm Password</label>
                <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" id="register-confirm-password" type="password" required value={registerConfirmPassword} onChange={e => setRegisterConfirmPassword(e.target.value)} />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors" disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
} 