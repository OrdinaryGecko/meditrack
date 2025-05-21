import { useState, useEffect } from 'react';

export default function AddDoctorModal({ open, onClose, onSave, initialValues = {}, mode = 'add' }) {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      if (mode === 'edit') {
        setFirstName(initialValues.firstname || '');
        setLastName(initialValues.lastname || '');
        setSpecialty(initialValues.specialty || '');
        setEmail(initialValues.email || '');
        setPhone(initialValues.phone || '');
      } else if (mode === 'add') {
        setFirstName('');
        setLastName('');
        setSpecialty('');
        setEmail('');
        setPhone('');
      }
    }
    if (!open) {
      setLoading(false);
    }
  }, [open, mode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstname || !lastname || !specialty || !email || !phone) {
      alert('Please fill all fields');
      return;
    }
    setLoading(true);
    await onSave({ ...initialValues, firstname, lastname, specialty, email, phone });
  };

  if (!open) return null;

  return (
    <div className="modal fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
        <div className="px-6 py-4 bg-purple-600">
          <h3 className="text-lg font-medium text-white">{mode === 'edit' ? 'Edit Doctor' : 'Add New Doctor'}</h3>
        </div>
        <form className="p-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="doctor-first-name">First Name</label>
              <input type="text" id="doctor-first-name" className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500${loading ? ' bg-gray-100 opacity-60' : ''}`} value={firstname} onChange={e => setFirstName(e.target.value)} required disabled={loading} />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="doctor-last-name">Last Name</label>
              <input type="text" id="doctor-last-name" className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500${loading ? ' bg-gray-100 opacity-60' : ''}`} value={lastname} onChange={e => setLastName(e.target.value)} required disabled={loading} />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="doctor-specialty">Specialty</label>
              <input type="text" id="doctor-specialty" className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500${loading ? ' bg-gray-100 opacity-60' : ''}`} value={specialty} onChange={e => setSpecialty(e.target.value)} required disabled={loading} />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="doctor-email">Email</label>
              <input type="email" id="doctor-email" className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500${loading ? ' bg-gray-100 opacity-60' : ''}`} value={email} onChange={e => setEmail(e.target.value)} required disabled={loading} />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="doctor-phone">Phone Number</label>
              <input type="tel" id="doctor-phone" className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500${loading ? ' bg-gray-100 opacity-60' : ''}`} value={phone} onChange={e => setPhone(e.target.value)} required disabled={loading} />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button type="button" className="cancel-modal px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500" disabled={loading}>
              {loading ? (mode === 'edit' ? 'Saving...' : 'Creating...') : (mode === 'edit' ? 'Save Changes' : 'Add New Doctor')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 