import { PGlite } from '@electric-sql/pglite';

const db = new PGlite('idb://meditrack');

const tableSQL = [
  `CREATE TABLE IF NOT EXISTS patients (
    id TEXT PRIMARY KEY,
    firstName TEXT,
    lastName TEXT,
    email TEXT,
    phone TEXT,
    dob TEXT,
    gender TEXT,
    address TEXT
  );`,
  `CREATE TABLE IF NOT EXISTS doctors (
    id TEXT PRIMARY KEY,
    firstName TEXT,
    lastName TEXT,
    specialty TEXT,
    email TEXT,
    phone TEXT
  );`,
  `CREATE TABLE IF NOT EXISTS appointments (
    id TEXT PRIMARY KEY,
    patientId TEXT,
    doctorId TEXT,
    date TEXT,
    time TEXT,
    type TEXT,
    notes TEXT
  );`,
  `CREATE TABLE IF NOT EXISTS admins (
    email TEXT PRIMARY KEY,
    password TEXT,
    name TEXT
  );`
];

// To ensure tables exist,
async function init() {
  for (const sql of tableSQL) {
    await db.exec(sql);
  }
}

// --- CRUD functions ---

// Patients
export async function getAllPatients() {
  await init();
  const { rows } = await db.query('SELECT * FROM patients');
  return rows;
}
export async function addPatient(patient) {
  await init();
  await db.run(
    'INSERT INTO patients (id, firstName, lastName, email, phone, dob, gender, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [patient.id, patient.firstName, patient.lastName, patient.email, patient.phone, patient.dob, patient.gender, patient.address]
  );
}
export async function updatePatient(patient) {
  await init();
  await db.run(
    'UPDATE patients SET firstName=?, lastName=?, email=?, phone=?, dob=?, gender=?, address=? WHERE id=?',
    [patient.firstName, patient.lastName, patient.email, patient.phone, patient.dob, patient.gender, patient.address, patient.id]
  );
}
export async function deletePatient(id) {
  await init();
  await db.run('DELETE FROM patients WHERE id=?', [id]);
}

// Doctors
export async function getAllDoctors() {
  await init();
  const { rows } = await db.query('SELECT * FROM doctors');
  return rows;
}
export async function addDoctor(doctor) {
  await init();
  await db.run(
    'INSERT INTO doctors (id, firstName, lastName, specialty, email, phone) VALUES (?, ?, ?, ?, ?, ?)',
    [doctor.id, doctor.firstName, doctor.lastName, doctor.specialty, doctor.email, doctor.phone]
  );
}
export async function updateDoctor(doctor) {
  await init();
  await db.run(
    'UPDATE doctors SET firstName=?, lastName=?, specialty=?, email=?, phone=? WHERE id=?',
    [doctor.firstName, doctor.lastName, doctor.specialty, doctor.email, doctor.phone, doctor.id]
  );
}
export async function deleteDoctor(id) {
  await init();
  await db.run('DELETE FROM doctors WHERE id=?', [id]);
}

// Appointments
export async function getAllAppointments() {
  await init();
  const { rows } = await db.query('SELECT * FROM appointments');
  return rows;
}
export async function addAppointment(appointment) {
  await init();
  await db.run(
    'INSERT INTO appointments (id, patientId, doctorId, date, time, type, notes) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [appointment.id, appointment.patientId, appointment.doctorId, appointment.date, appointment.time, appointment.type, appointment.notes]
  );
}
export async function updateAppointment(appointment) {
  await init();
  await db.run(
    'UPDATE appointments SET patientId=?, doctorId=?, date=?, time=?, type=?, notes=? WHERE id=?',
    [appointment.patientId, appointment.doctorId, appointment.date, appointment.time, appointment.type, appointment.notes, appointment.id]
  );
}
export async function deleteAppointment(id) {
  await init();
  await db.run('DELETE FROM appointments WHERE id=?', [id]);
}

// Admins
export async function getAllAdmins() {
  await init();
  const { rows } = await db.query('SELECT * FROM admins');
  return rows;
}
export async function addAdmin(admin) {
  await init();
  await db.run(
    'INSERT INTO admins (email, password, name) VALUES (?, ?, ?)',
    [admin.email, admin.password, admin.name]
  );
}
export async function updateAdmin(admin) {
  await init();
  await db.run(
    'UPDATE admins SET password=?, name=? WHERE email=?',
    [admin.password, admin.name, admin.email]
  );
}
export async function deleteAdmin(email) {
  await init();
  await db.run('DELETE FROM admins WHERE email=?', [email]);
} 