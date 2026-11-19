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

    let pharmacist: any = null

    try {
      const rows: any = await query('SELECT * FROM pharmacists WHERE email = ?', [email])
      if (rows && rows.length > 0) {
        pharmacist = rows[0]
      }
    } catch {
      pharmacist = findUserByEmail('pharmacist', email)
    }

    if (!pharmacist) {
      pharmacist = findUserByEmail('pharmacist', email)
    }

    if (!pharmacist) {
      return NextResponse.json(
        { message: 'Pharmacist not found with this email. Please check your credentials or register.' },
        { status: 404 }
      )
    }

    const isPasswordValid = await bcrypt.compare(password, pharmacist.password_hash)
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid password. Please try again.' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      message: 'Login successful!',
      user: {
        id: pharmacist.id,
        name: pharmacist.name,
        email: pharmacist.email,
        pharmacyName: pharmacist.pharmacy_name || pharmacist.pharmacyName,
        licenseNumber: pharmacist.license_number || pharmacist.licenseNumber,
        role: 'pharmacist'
      }
    })
  } catch (error) {
    console.error('Pharmacist Login Error:', error)
    return NextResponse.json(
      { message: 'An internal error occurred during login.' },
      { status: 500 }
    )
  }
}
