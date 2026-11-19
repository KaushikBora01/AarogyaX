import fs from 'fs'
import path from 'path'

export interface Doctor {
  id: number
  name: string
  email: string
  password_hash: string
  specialization: string
  phone?: string
  is_available?: boolean
}

export interface Patient {
  id: number
  name: string
  email: string
  password_hash: string
  phone: string
  age: number
  location?: string
  blood_group?: string
  vitals?: {
    bp: string
    heartRate: number
    temp: string
    oxygen: string
  }
}

export interface Pharmacist {
  id: number
  name: string
  email: string
  password_hash: string
  pharmacy_name: string
  license_number: string
  phone?: string
  location?: string
}

export interface Appointment {
  id: number
  doctorId: number
  doctor: string
  patientId: number
  patient: string
  specialty: string
  date: string
  time: string
  type: string
  status: 'pending' | 'completed' | 'cancelled'
  symptoms?: string
  priority?: 'urgent' | 'normal'
  age?: number
  lastVisit?: string
}

export interface HealthRecord {
  id: number
  patientId: number
  date: string
  type: string
  doctor?: string
  test?: string
  status?: string
  diagnosis?: string
  prescription?: string
  notes?: string
}

export interface Medicine {
  id: number
  name: string
  category: string
  price: number
  stock: number
  minStock: number
  supplier: string
  expiryDate: string
  batchNumber: string
}

export interface OrderItem {
  name: string
  quantity: number
  price: number
}

export interface Order {
  id: number
  patientName: string
  prescribedBy: string
  medicines: OrderItem[]
  status: 'pending' | 'completed' | 'rejected'
  orderDate: string
  total: number
}

export interface EmergencyAlert {
  id: number
  patient: string
  symptoms: string
  time: string
  location: string
  severity: 'critical' | 'high' | 'medium'
  status: 'active' | 'responded' | 'resolved'
  assignedDoctor?: string
  estimatedArrival?: string
}

export interface DataStore {
  doctors: Doctor[]
  patients: Patient[]
  pharmacists: Pharmacist[]
  appointments: Appointment[]
  records: HealthRecord[]
  medicines: Medicine[]
  orders: Order[]
  emergencies: EmergencyAlert[]
}

const DATA_DIR = path.join(process.cwd(), 'data')
const DATA_FILE = path.join(DATA_DIR, 'storage.json')

// Default seed data with password123 ($2b$10$JBwHz/Wk8RmVuA79Ob0IVeJaaxHlbw3hTecaxFjhtBd/Rodr7Yvze)
const defaultData: DataStore = {
  doctors: [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      email: "doctor@aarogyax.com",
      password_hash: "$2b$10$JBwHz/Wk8RmVuA79Ob0IVeJaaxHlbw3hTecaxFjhtBd/Rodr7Yvze",
      specialization: "General Physician",
      phone: "+91-98765-43210",
      is_available: true
    },
    {
      id: 2,
      name: "Dr. Amit Singh",
      email: "amit@aarogyax.com",
      password_hash: "$2b$10$JBwHz/Wk8RmVuA79Ob0IVeJaaxHlbw3hTecaxFjhtBd/Rodr7Yvze",
      specialization: "Cardiologist",
      phone: "+91-98765-43211",
      is_available: true
    }
  ],
  patients: [
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "patient@aarogyax.com",
      password_hash: "$2b$10$JBwHz/Wk8RmVuA79Ob0IVeJaaxHlbw3hTecaxFjhtBd/Rodr7Yvze",
      phone: "+91 98765 43210",
      age: 45,
      location: "Village Nabha, Punjab",
      blood_group: "B+",
      vitals: {
        bp: "120/80",
        heartRate: 72,
        temp: "98.6°F",
        oxygen: "98%"
      }
    },
    {
      id: 2,
      name: "Sunita Devi",
      email: "sunita@aarogyax.com",
      password_hash: "$2b$10$JBwHz/Wk8RmVuA79Ob0IVeJaaxHlbw3hTecaxFjhtBd/Rodr7Yvze",
      phone: "+91 98765 43212",
      age: 32,
      location: "Village Bhadson, Punjab",
      blood_group: "O+"
    },
    {
      id: 3,
      name: "Harpreet Singh",
      email: "harpreet@aarogyax.com",
      password_hash: "$2b$10$JBwHz/Wk8RmVuA79Ob0IVeJaaxHlbw3hTecaxFjhtBd/Rodr7Yvze",
      phone: "+91 98765 43213",
      age: 28,
      location: "Village Nabha, Punjab",
      blood_group: "A+"
    }
  ],
  pharmacists: [
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "pharmacist@aarogyax.com",
      password_hash: "$2b$10$JBwHz/Wk8RmVuA79Ob0IVeJaaxHlbw3hTecaxFjhtBd/Rodr7Yvze",
      pharmacy_name: "Kumar Medical Store",
      license_number: "PB/12345/2024",
      phone: "+91-1765-222-333",
      location: "Nabha, Punjab"
    }
  ],
  appointments: [
    {
      id: 1,
      doctorId: 1,
      doctor: "Dr. Priya Sharma",
      patientId: 1,
      patient: "Rajesh Kumar",
      specialty: "General Physician",
      date: "2024-01-15",
      time: "09:30 AM",
      type: "Video Consultation",
      status: "pending",
      symptoms: "Chest pain, difficulty breathing",
      priority: "urgent",
      age: 45,
      lastVisit: "2024-01-10"
    },
    {
      id: 2,
      doctorId: 2,
      doctor: "Dr. Amit Singh",
      patientId: 2,
      patient: "Sunita Devi",
      specialty: "Cardiologist",
      date: "2024-01-18",
      time: "10:15 AM",
      type: "Phone Consultation",
      status: "pending",
      symptoms: "Fever, headache",
      priority: "normal",
      age: 32,
      lastVisit: "2024-01-08"
    },
    {
      id: 3,
      doctorId: 1,
      doctor: "Dr. Priya Sharma",
      patientId: 3,
      patient: "Harpreet Singh",
      specialty: "General Physician",
      date: "2024-01-12",
      time: "11:00 AM",
      type: "Follow-up",
      status: "completed",
      symptoms: "Stomach pain, nausea",
      priority: "normal",
      age: 28,
      lastVisit: "2024-01-12"
    }
  ],
  records: [
    {
      id: 1,
      patientId: 1,
      date: "2024-01-10",
      type: "Consultation",
      doctor: "Dr. Priya Sharma",
      diagnosis: "Common Cold",
      prescription: "Rest, fluids, paracetamol",
      notes: "Patient advised 3 days rest and plenty of fluids."
    },
    {
      id: 2,
      patientId: 1,
      date: "2024-01-05",
      type: "Lab Report",
      test: "Blood Test",
      status: "Normal",
      notes: "All parameters within normal range"
    }
  ],
  medicines: [
    {
      id: 1,
      name: "Paracetamol 500mg",
      category: "Pain Relief",
      price: 25,
      stock: 150,
      minStock: 50,
      supplier: "ABC Pharma",
      expiryDate: "2025-06-15",
      batchNumber: "PAR001"
    },
    {
      id: 2,
      name: "Amoxicillin 250mg",
      category: "Antibiotic",
      price: 85,
      stock: 12,
      minStock: 20,
      supplier: "XYZ Medical",
      expiryDate: "2024-12-30",
      batchNumber: "AMX002"
    },
    {
      id: 3,
      name: "Cough Syrup",
      category: "Cold & Flu",
      price: 45,
      stock: 0,
      minStock: 15,
      supplier: "DEF Healthcare",
      expiryDate: "2024-08-20",
      batchNumber: "CS003"
    },
    {
      id: 4,
      name: "Vitamin D3",
      category: "Supplements",
      price: 120,
      stock: 75,
      minStock: 30,
      supplier: "GHI Nutrition",
      expiryDate: "2025-03-10",
      batchNumber: "VD004"
    }
  ],
  orders: [
    {
      id: 1,
      patientName: "Rajesh Kumar",
      prescribedBy: "Dr. Priya Sharma",
      medicines: [
        { name: "Paracetamol 500mg", quantity: 10, price: 25 },
        { name: "Cough Syrup", quantity: 1, price: 45 }
      ],
      status: "pending",
      orderDate: "2024-01-15",
      total: 295
    },
    {
      id: 2,
      patientName: "Sunita Devi",
      prescribedBy: "Dr. Amit Singh",
      medicines: [{ name: "Amoxicillin 250mg", quantity: 21, price: 85 }],
      status: "completed",
      orderDate: "2024-01-14",
      total: 1785
    },
    {
      id: 3,
      patientName: "Harpreet Singh",
      prescribedBy: "Dr. Priya Sharma",
      medicines: [
        { name: "Vitamin D3", quantity: 1, price: 120 },
        { name: "Paracetamol 500mg", quantity: 5, price: 25 }
      ],
      status: "pending",
      orderDate: "2024-01-15",
      total: 245
    }
  ],
  emergencies: [
    {
      id: 1,
      patient: "Rajesh Kumar",
      symptoms: "Severe chest pain, shortness of breath",
      time: "5 minutes ago",
      location: "Village Nabha",
      severity: "critical",
      status: "active"
    },
    {
      id: 2,
      patient: "Kamala Devi",
      symptoms: "High fever, unconsciousness",
      time: "12 minutes ago",
      location: "Village Bhadson",
      severity: "high",
      status: "active"
    }
  ]
}

export function getStore(): DataStore {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2), 'utf-8')
      return defaultData
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf-8')
    return JSON.parse(raw)
  } catch (error) {
    console.error('Error reading data store, using defaults:', error)
    return defaultData
  }
}

export function saveStore(store: DataStore): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2), 'utf-8')
  } catch (error) {
    console.error('Error saving data store:', error)
  }
}

export function findUserByEmail(role: 'doctor' | 'patient' | 'pharmacist', email: string) {
  const store = getStore()
  const lower = email.toLowerCase().trim()
  if (role === 'doctor') {
    return store.doctors.find(d => d.email.toLowerCase().trim() === lower)
  } else if (role === 'patient') {
    return store.patients.find(p => p.email.toLowerCase().trim() === lower)
  } else {
    return store.pharmacists.find(p => p.email.toLowerCase().trim() === lower)
  }
}

export function createUser(role: 'doctor' | 'patient' | 'pharmacist', userData: any) {
  const store = getStore()
  if (role === 'doctor') {
    const id = (store.doctors.length > 0 ? Math.max(...store.doctors.map(d => d.id)) : 0) + 1
    const newDoc: Doctor = {
      id,
      name: userData.name,
      email: userData.email,
      password_hash: userData.password_hash,
      specialization: userData.specialization,
      is_available: true
    }
    store.doctors.push(newDoc)
    saveStore(store)
    return newDoc
  } else if (role === 'patient') {
    const id = (store.patients.length > 0 ? Math.max(...store.patients.map(p => p.id)) : 0) + 1
    const newPat: Patient = {
      id,
      name: userData.name,
      email: userData.email,
      password_hash: userData.password_hash,
      phone: userData.phone,
      age: Number(userData.age),
      vitals: {
        bp: "120/80",
        heartRate: 72,
        temp: "98.6°F",
        oxygen: "98%"
      }
    }
    store.patients.push(newPat)
    saveStore(store)
    return newPat
  } else {
    const id = (store.pharmacists.length > 0 ? Math.max(...store.pharmacists.map(p => p.id)) : 0) + 1
    const newPharm: Pharmacist = {
      id,
      name: userData.name,
      email: userData.email,
      password_hash: userData.password_hash,
      pharmacy_name: userData.pharmacyName || userData.pharmacy_name,
      license_number: userData.licenseNumber || userData.license_number
    }
    store.pharmacists.push(newPharm)
    saveStore(store)
    return newPharm
  }
}
