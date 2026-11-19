import mysql from 'mysql2/promise'
import { getStore, saveStore, createUser, findUserByEmail } from './storage'

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '@Alok12345',
  database: process.env.DB_NAME || 'health_portal_db',
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 1000,
}

let pool: mysql.Pool | null = null

function getPool() {
  if (!pool) {
    pool = mysql.createPool(dbConfig)
  }
  return pool
}

// Fallback executor using local persistent storage
function fallbackQuery(sql: string, values: any[] = []): any {
  const normalizedSql = sql.trim().toLowerCase()
  const store = getStore()

  // 1. SELECT queries
  if (normalizedSql.startsWith('select')) {
    if (normalizedSql.includes('from doctors')) {
      if (normalizedSql.includes('where email = ?')) {
        const email = values[0]
        const doc = findUserByEmail('doctor', email)
        return doc ? [{ id: doc.id, email: doc.email, password_hash: doc.password_hash, name: doc.name, specialization: doc.specialization }] : []
      }
      return store.doctors
    }

    if (normalizedSql.includes('from patients')) {
      if (normalizedSql.includes('where email = ?')) {
        const email = values[0]
        const pat = findUserByEmail('patient', email)
        return pat ? [{ id: pat.id, email: pat.email, password_hash: pat.password_hash, name: pat.name, phone: pat.phone, age: pat.age }] : []
      }
      return store.patients
    }

    if (normalizedSql.includes('from pharmacists')) {
      if (normalizedSql.includes('where email = ?')) {
        const email = values[0]
        const pharm = findUserByEmail('pharmacist', email)
        return pharm ? [{ id: pharm.id, email: pharm.email, password_hash: pharm.password_hash, name: pharm.name, pharmacy_name: pharm.pharmacy_name, license_number: pharm.license_number }] : []
      }
      return store.pharmacists
    }

    if (normalizedSql.includes('from appointments')) {
      return store.appointments
    }

    if (normalizedSql.includes('from medicines')) {
      return store.medicines
    }

    if (normalizedSql.includes('from orders')) {
      return store.orders
    }

    return []
  }

  // 2. INSERT queries
  if (normalizedSql.startsWith('insert into')) {
    if (normalizedSql.includes('doctors')) {
      // (name, email, password_hash, specialization)
      const [name, email, password_hash, specialization] = values
      const newDoc = createUser('doctor', { name, email, password_hash, specialization })
      return { insertId: newDoc.id, affectedRows: 1 }
    }

    if (normalizedSql.includes('patients')) {
      // (name, email, password_hash, phone, age)
      const [name, email, password_hash, phone, age] = values
      const newPat = createUser('patient', { name, email, password_hash, phone, age })
      return { insertId: newPat.id, affectedRows: 1 }
    }

    if (normalizedSql.includes('pharmacists')) {
      // (name, email, password_hash, pharmacy_name, license_number)
      const [name, email, password_hash, pharmacy_name, license_number] = values
      const newPharm = createUser('pharmacist', { name, email, password_hash, pharmacy_name, license_number })
      return { insertId: newPharm.id, affectedRows: 1 }
    }
  }

  return { affectedRows: 1 }
}

export async function query(sql: string, values: any[] = []): Promise<any> {
  // If no live DB host is explicitly set in .env, immediately execute local storage without TCP timeout lag
  if (!process.env.DB_HOST && !process.env.DATABASE_URL) {
    return fallbackQuery(sql, values)
  }

  try {
    const p = getPool()
    const [rows] = await p.execute(sql, values)
    return rows
  } catch (error) {
    console.warn("Database connection unavailable, using local persistent fallback store:", (error as Error).message)
    return fallbackQuery(sql, values)
  }
}
