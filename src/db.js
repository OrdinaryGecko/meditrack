import { PGlite } from '@electric-sql/pglite';

// Initialize the database
const db = new PGlite('idb://meditrack');

// Table creation SQL
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

// Ensure tables exist
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
  await db.query(
    'INSERT INTO patients (id, firstName, lastName, email, phone, dob, gender, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
    [patient.id, patient.firstName, patient.lastName, patient.email, patient.phone, patient.dob, patient.gender, patient.address]
  );
}
export async function updatePatient(patient) {
  await init();
  await db.query(
    'UPDATE patients SET firstName=$1, lastName=$2, email=$3, phone=$4, dob=$5, gender=$6, address=$7 WHERE id=$8',
    [patient.firstName, patient.lastName, patient.email, patient.phone, patient.dob, patient.gender, patient.address, patient.id]
  );
}
export async function deletePatient(id) {
  await init();
  await db.query('DELETE FROM patients WHERE id=$1', [id]);
}

// Doctors
export async function getAllDoctors() {
  await init();
  const { rows } = await db.query('SELECT * FROM doctors');
  return rows;
}
export async function addDoctor(doctor) {
  await init();
  await db.query(
    'INSERT INTO doctors (id, firstName, lastName, specialty, email, phone) VALUES ($1, $2, $3, $4, $5, $6)',
    [doctor.id, doctor.firstName, doctor.lastName, doctor.specialty, doctor.email, doctor.phone]
  );
}
export async function updateDoctor(doctor) {
  await init();
  await db.query(
    'UPDATE doctors SET firstName=$1, lastName=$2, specialty=$3, email=$4, phone=$5 WHERE id=$6',
    [doctor.firstName, doctor.lastName, doctor.specialty, doctor.email, doctor.phone, doctor.id]
  );
}
export async function deleteDoctor(id) {
  await init();
  await db.query('DELETE FROM doctors WHERE id=$1', [id]);
}

// Appointments
export async function getAllAppointments() {
  await init();
  const { rows } = await db.query('SELECT * FROM appointments');
  return rows;
}
export async function addAppointment(appointment) {
  await init();
  await db.query(
    'INSERT INTO appointments (id, patientId, doctorId, date, time, type, notes) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    [appointment.id, appointment.patientId, appointment.doctorId, appointment.date, appointment.time, appointment.type, appointment.notes]
  );
}
export async function updateAppointment(appointment) {
  await init();
  await db.query(
    'UPDATE appointments SET patientId=$1, doctorId=$2, date=$3, time=$4, type=$5, notes=$6 WHERE id=$7',
    [appointment.patientId, appointment.doctorId, appointment.date, appointment.time, appointment.type, appointment.notes, appointment.id]
  );
}
export async function deleteAppointment(id) {
  await init();
  await db.query('DELETE FROM appointments WHERE id=$1', [id]);
}

// Admins
export async function getAllAdmins() {
  await init();
  const { rows } = await db.query('SELECT * FROM admins');
  return rows;
}
export async function addAdmin(admin) {
  await init();
  await db.query(
    'INSERT INTO admins (email, password, name) VALUES ($1, $2, $3)',
    [admin.email, admin.password, admin.name]
  );
}
export async function updateAdmin(admin) {
  await init();
  await db.query(
    'UPDATE admins SET password=$1, name=$2 WHERE email=$3',
    [admin.password, admin.name, admin.email]
  );
}
export async function deleteAdmin(email) {
  await init();
  await db.query('DELETE FROM admins WHERE email=$1', [email]);
} 