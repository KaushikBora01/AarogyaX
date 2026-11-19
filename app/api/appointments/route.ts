import { NextResponse } from 'next/server'
import { getStore, saveStore, Appointment } from '@/lib/storage'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const doctorId = searchParams.get('doctorId')
    const patientId = searchParams.get('patientId')

    const store = getStore()
    let appointments = store.appointments || []

    if (doctorId) {
      appointments = appointments.filter(a => String(a.doctorId) === doctorId)
    }
    if (patientId) {
      appointments = appointments.filter(a => String(a.patientId) === patientId)
    }

    return NextResponse.json(appointments)
  } catch (error) {
    console.error('Error fetching appointments:', error)
    return NextResponse.json({ message: 'Failed to fetch appointments' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { doctorId, doctor, patientId, patient, specialty, date, time, type, symptoms, priority } = body

    if (!doctor || !patient || !date || !time) {
      return NextResponse.json({ message: 'Missing required appointment fields.' }, { status: 400 })
    }

    const store = getStore()
    const newId = (store.appointments.length > 0 ? Math.max(...store.appointments.map(a => a.id)) : 0) + 1

    const newAppointment: Appointment = {
      id: newId,
      doctorId: Number(doctorId) || 1,
      doctor: doctor || "Dr. Priya Sharma",
      patientId: Number(patientId) || 1,
      patient: patient || "Patient",
      specialty: specialty || "General Physician",
      date,
      time,
      type: type || "Video Consultation",
      status: "pending",
      symptoms: symptoms || "General checkup",
      priority: priority || "normal",
      age: body.age || 30,
      lastVisit: new Date().toISOString().split('T')[0]
    }

    store.appointments.unshift(newAppointment)
    saveStore(store)

    return NextResponse.json({ message: 'Appointment booked successfully!', appointment: newAppointment }, { status: 201 })
  } catch (error) {
    console.error('Error creating appointment:', error)
    return NextResponse.json({ message: 'Failed to book appointment' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json()
    const store = getStore()
    const appointment = store.appointments.find(a => a.id === Number(id))

    if (!appointment) {
      return NextResponse.json({ message: 'Appointment not found' }, { status: 404 })
    }

    appointment.status = status
    saveStore(store)

    return NextResponse.json({ message: 'Appointment updated successfully', appointment })
  } catch (error) {
    console.error('Error updating appointment:', error)
    return NextResponse.json({ message: 'Failed to update appointment' }, { status: 500 })
  }
}
