export default function DoctorsTabContent({ doctors, onAddDoctor, onViewDoctor }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Doctor Directory</h2>
        <button
          onClick={onAddDoctor}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Doctor
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" id="doctor-list">
        {doctors.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">No doctors found. Add a new doctor to get started.</div>
        ) : (
          doctors.map(doctor => (
            <div key={doctor.id} className="card bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-100 rounded-full p-3">
                    <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <h3 className="text-lg font-medium text-gray-900">Dr. {doctor.firstname} {doctor.lastname}</h3>
                    <p className="text-sm text-gray-500">{doctor.specialty}</p>
                  </div>
                </div>
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      {/* Appointments count can be added here later */}
                    </div>
                    <button
                      className="view-doctor-btn inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      onClick={() => onViewDoctor(doctor)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 