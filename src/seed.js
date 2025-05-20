import { addAdmin, addPatient, addDoctor, addAppointment } from './db';

export async function seedTestData() {
  // Admins
  await addAdmin({ email: 'admin@example.com', password: 'password123', name: 'Admin User' });
  await addAdmin({ email: 'admin2@example.com', password: 'password123', name: 'Admin Two' });
  await addAdmin({ email: 'admin3@example.com', password: 'password123', name: 'Admin Three' });
  await addAdmin({ email: 'admin4@example.com', password: 'password123', name: 'Admin Four' });
  await addAdmin({ email: 'admin5@example.com', password: 'password123', name: 'Admin Five' });

  // Patients
  await addPatient({
    id: 'P001', firstname: 'John', lastname: 'Doe', email: 'john.doe@example.com',
    phone: '(555) 123-4567', dob: '1985-06-15', gender: 'male', address: '123 Main St, Anytown, CA 12345'
  });
  await addPatient({
    id: 'P002', firstname: 'Jane', lastname: 'Smith', email: 'jane.smith@example.com',
    phone: '(555) 987-6543', dob: '1990-03-22', gender: 'female', address: '456 Oak Ave, Somewhere, CA 67890'
  });
  await addPatient({
    id: 'P003', firstname: 'Alice', lastname: 'Johnson', email: 'alice.johnson@example.com',
    phone: '(555) 234-5678', dob: '1978-11-30', gender: 'female', address: '789 Pine Rd, Elsewhere, CA 54321'
  });
  await addPatient({
    id: 'P004', firstname: 'Bob', lastname: 'Williams', email: 'bob.williams@example.com',
    phone: '(555) 345-6789', dob: '1995-08-14', gender: 'male', address: '101 Elm St, Nowhere, CA 13579'
  });
  await addPatient({
    id: 'P005', firstname: 'Charlie', lastname: 'Brown', email: 'charlie.brown@example.com',
    phone: '(555) 456-7890', dob: '1982-04-05', gender: 'male', address: '202 Maple Dr, Anywhere, CA 24680'
  });

  // Doctors
  await addDoctor({
    id: 'D001', firstname: 'Robert', lastname: 'Johnson', specialty: 'Cardiology',
    email: 'robert.johnson@example.com', phone: '(555) 234-5678'
  });
  await addDoctor({
    id: 'D002', firstname: 'Sarah', lastname: 'Williams', specialty: 'Pediatrics',
    email: 'sarah.williams@example.com', phone: '(555) 876-5432'
  });
  await addDoctor({
    id: 'D003', firstname: 'Michael', lastname: 'Brown', specialty: 'Neurology',
    email: 'michael.brown@example.com', phone: '(555) 345-6789'
  });
  await addDoctor({
    id: 'D004', firstname: 'Emily', lastname: 'Davis', specialty: 'Dermatology',
    email: 'emily.davis@example.com', phone: '(555) 456-7890'
  });
  await addDoctor({
    id: 'D005', firstname: 'David', lastname: 'Miller', specialty: 'Orthopedics',
    email: 'david.miller@example.com', phone: '(555) 567-8901'
  });

  // Appointments
  await addAppointment({
    id: 'A001', patientid: 'P001', doctorid: 'D001', date: '2023-06-15', time: '10:00',
    type: 'consultation', notes: 'Initial consultation for heart palpitations'
  });
  await addAppointment({
    id: 'A002', patientid: 'P002', doctorid: 'D002', date: '2023-06-16', time: '14:30',
    type: 'check-up', notes: 'Regular annual check-up'
  });
  await addAppointment({
    id: 'A003', patientid: 'P003', doctorid: 'D003', date: '2023-06-17', time: '09:15',
    type: 'follow-up', notes: 'Follow-up for migraine treatment'
  });
  await addAppointment({
    id: 'A004', patientid: 'P004', doctorid: 'D004', date: '2023-06-18', time: '11:45',
    type: 'consultation', notes: 'Skin condition evaluation'
  });
  await addAppointment({
    id: 'A005', patientid: 'P005', doctorid: 'D005', date: '2023-06-19', time: '15:30',
    type: 'check-up', notes: 'Post-surgery check-up'
  });
} 