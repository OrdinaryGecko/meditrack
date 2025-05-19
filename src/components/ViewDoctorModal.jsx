export default function ViewDoctorModal({ open, doctor, onClose }) {
  if (!open || !doctor) return null;

  return (
    <div className="modal fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
        <div className="px-6 py-4 bg-purple-600 flex justify-between items-center">
          <h3 className="text-lg font-medium text-white">Doctor Details</h3>
          <button className="cancel-modal text-white hover:text-gray-200 focus:outline-none" onClick={onClose}>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <h4 className="text-xl font-medium text-gray-900">Dr. {doctor.firstname} {doctor.lastname}</h4>
            <p className="text-sm text-gray-500">{doctor.specialty}</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="mt-1">{doctor.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Phone</p>
              <p className="mt-1">{doctor.phone}</p>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 