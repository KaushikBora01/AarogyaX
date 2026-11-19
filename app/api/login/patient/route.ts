import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { findUserByEmail } from '@/lib/storage'
import { query } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required.' },
        { status: 400 }
      )
    }

    let patient: any = null

    try {
      const rows: any = await query('SELECT * FROM patients WHERE email = ?', [email])
      if (rows && rows.length > 0) {
        patient = rows[0]
      }
    } catch {
      patient = findUserByEmail('patient', email)
    }

    if (!patient) {
      patient = findUserByEmail('patient', email)
    }

    if (!patient) {
      return NextResponse.json(
        { message: 'Patient not found with this email. Please check your credentials or register.' },
        { status: 404 }
      )
    }

    const isPasswordValid = await bcrypt.compare(password, patient.password_hash)
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid password. Please try again.' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      message: 'Login successful!',
      user: {
        id: patient.id,
        name: patient.name,
        email: patient.email,
        phone: patient.phone,
        age: patient.age,
        location: patient.location || 'Village Nabha, Punjab',
        role: 'patient'
      }
    })
  } catch (error) {
    console.error('Patient Login Error:', error)
    return NextResponse.json(
      { message: 'An internal error occurred during login.' },
      { status: 500 }
    )
  }
}
