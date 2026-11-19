import { NextResponse } from 'next/server'
import { getStore, saveStore, HealthRecord, Order } from '@/lib/storage'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const patientId = searchParams.get('patientId')
    const store = getStore()
    let records = store.records || []

    if (patientId) {
      records = records.filter(r => String(r.patientId) === patientId)
    }

    return NextResponse.json(records)
  } catch (error) {
    console.error('Error fetching records:', error)
    return NextResponse.json({ message: 'Failed to fetch records' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { patientId, patientName, doctorName, diagnosis, prescription, medicines, notes } = body

    if (!prescription) {
      return NextResponse.json({ message: 'Prescription details are required.' }, { status: 400 })
    }

    const store = getStore()
    const recordId = (store.records.length > 0 ? Math.max(...store.records.map(r => r.id)) : 0) + 1
    const today = new Date().toISOString().split('T')[0]

    const newRecord: HealthRecord = {
      id: recordId,
      patientId: Number(patientId) || 1,
      date: today,
      type: "Prescription",
      doctor: doctorName || "Dr. Priya Sharma",
      diagnosis: diagnosis || "General Consultation",
      prescription: prescription,
      notes: notes || "Digital prescription issued via AarogyaX teleconsultation."
    }

    store.records.unshift(newRecord)

    // Automatically create pharmacy order if medicines are included or parse from prescription
    const medsList = Array.isArray(medicines) && medicines.length > 0 
      ? medicines 
      : [{ name: prescription.includes("Paracetamol") ? "Paracetamol 500mg" : "Prescribed Medication", quantity: 1, price: 25 }]

    const total = medsList.reduce((acc: number, m: any) => acc + (Number(m.price) || 25) * (Number(m.quantity) || 1), 0)

    const orderId = (store.orders.length > 0 ? Math.max(...store.orders.map(o => o.id)) : 0) + 1
    const newOrder: Order = {
      id: orderId,
      patientName: patientName || "Rajesh Kumar",
      prescribedBy: doctorName || "Dr. Priya Sharma",
      medicines: medsList,
      status: "pending",
      orderDate: today,
      total
    }

    store.orders.unshift(newOrder)
    saveStore(store)

    return NextResponse.json({
      message: 'Prescription issued and sent to Pharmacy!',
      record: newRecord,
      order: newOrder
    }, { status: 201 })
  } catch (error) {
    console.error('Error issuing prescription:', error)
    return NextResponse.json({ message: 'Failed to issue prescription' }, { status: 500 })
  }
}
