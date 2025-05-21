import { useState, useEffect } from 'react';

export default function AddPatientModal({ open, onClose, onSave, initialValues = {}, mode = 'add' }) {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      if (mode === 'edit') {
        setFirstName(initialValues.firstname || '');
        setLastName(initialValues.lastname || '');
        setEmail(initialValues.email || '');
        setPhone(initialValues.phone || '');
        setDob(initialValues.dob || '');
        setGender(initialValues.gender || '');
        setAddress(initialValues.address || '');
      } else if (mode === 'add') {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setDob('');
        setGender('');
        setAddress('');
      }
    }
    if (!open) {
      setLoading(false);
    }
  }, [open, mode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstname || !lastname || !email || !phone || !dob || !gender || !address) {
      alert('Please fill all fields');
      return;
    }
    setLoading(true);
    await onSave({ ...initialValues, firstname, lastname, email, phone, dob, gender, address });
  };

  if (!open) return null;

  return (
    <div className="modal fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
        <div className="px-6 py-4 bg-blue-600">
          <h3 className="text-lg font-medium text-white">{mode === 'edit' ? 'Edit Patient' : 'Add New Patient'}</h3>
        </div>
        <form className="p-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="patient-first-name">First Name</label>
              <input type="text" id="patient-first-name" className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500${loading ? ' bg-gray-100 opacity-60' : ''}`} value={firstname} onChange={e => setFirstName(e.target.value)} required disabled={loading} />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="patient-last-name">Last Name</label>
              <input type="text" id="patient-last-name" className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500${loading ? ' bg-gray-100 opacity-60' : ''}`} value={lastname} onChange={e => setLastName(e.target.value)} required disabled={loading} />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="patient-email">Email</label>
              <input type="email" id="patient-email" className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500${loading ? ' bg-gray-100 opacity-60' : ''}`} value={email} onChange={e => setEmail(e.target.value)} required disabled={loading} />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="patient-phone">Phone Number</label>
              <input type="tel" id="patient-phone" className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500${loading ? ' bg-gray-100 opacity-60' : ''}`} value={phone} onChange={e => setPhone(e.target.value)} required disabled={loading} />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="patient-dob">Date of Birth</label>
              <input type="date" id="patient-dob" className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500${loading ? ' bg-gray-100 opacity-60' : ''}`} value={dob} onChange={e => setDob(e.target.value)} required disabled={loading} />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="patient-gender">Gender</label>
              <select id="patient-gender" className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500${loading ? ' bg-gray-100 opacity-60' : ''}`} value={gender} onChange={e => setGender(e.target.value)} required disabled={loading}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="patient-address">Address</label>
              <textarea id="patient-address" rows="2" className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500${loading ? ' bg-gray-100 opacity-60' : ''}`} value={address} onChange={e => setAddress(e.target.value)} required disabled={loading}></textarea>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button type="button" className="cancel-modal px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" disabled={loading}>
              {loading ? (mode === 'edit' ? 'Saving...' : 'Creating...') : (mode === 'edit' ? 'Save Changes' : 'Add New Patient')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 