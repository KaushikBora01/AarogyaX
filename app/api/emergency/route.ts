import { NextResponse } from 'next/server'
import { getStore, saveStore, EmergencyAlert } from '@/lib/storage'

export async function GET() {
  try {
    const store = getStore()
    return NextResponse.json(store.emergencies || [])
  } catch (error) {
    console.error('Error fetching emergencies:', error)
    return NextResponse.json({ message: 'Failed to fetch emergencies' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { patient, symptoms, location, severity, type } = body

    const store = getStore()
    const newId = (store.emergencies.length > 0 ? Math.max(...store.emergencies.map(e => e.id)) : 0) + 1

    const newAlert: EmergencyAlert = {
      id: newId,
      patient: patient || "Emergency Patient",
      symptoms: symptoms || "Critical emergency reported",
      time: "Just now",
      location: location || "Village Nabha, Punjab",
      severity: severity || "critical",
      status: "active",
      assignedDoctor: type === "doctor" ? "Dr. Priya Sharma" : undefined,
      estimatedArrival: type === "ambulance" ? "5-8 minutes" : undefined
    }

    store.emergencies.unshift(newAlert)
    saveStore(store)

    return NextResponse.json({ message: 'Emergency broadcasted successfully!', alert: newAlert }, { status: 201 })
  } catch (error) {
    console.error('Error triggering emergency:', error)
    return NextResponse.json({ message: 'Failed to broadcast emergency' }, { status: 500 })
  }
}
