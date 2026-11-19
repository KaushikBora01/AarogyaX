import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { findUserByEmail, getStore } from '@/lib/storage'
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

    let doctor: any = null

    // Try query first (supports MySQL if connected, falls back to storage)
    try {
      const rows: any = await query('SELECT * FROM doctors WHERE email = ?', [email])
      if (rows && rows.length > 0) {
        doctor = rows[0]
      }
    } catch {
      // Fallback directly to storage
      doctor = findUserByEmail('doctor', email)
    }

    if (!doctor) {
      doctor = findUserByEmail('doctor', email)
    }

    if (!doctor) {
      return NextResponse.json(
        { message: 'Doctor not found with this email. Please check your credentials or register.' },
        { status: 404 }
      )
    }

    const isPasswordValid = await bcrypt.compare(password, doctor.password_hash)
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid password. Please try again.' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      message: 'Login successful!',
      user: {
        id: doctor.id,
        name: doctor.name,
        email: doctor.email,
        specialization: doctor.specialization,
        role: 'doctor'
      }
    })
  } catch (error) {
    console.error('Doctor Login Error:', error)
    return NextResponse.json(
      { message: 'An internal error occurred during login.' },
      { status: 500 }
    )
  }
}
