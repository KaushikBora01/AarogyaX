import { NextResponse } from 'next/server'
import { getStore, saveStore, Medicine } from '@/lib/storage'

export async function GET() {
  try {
    const store = getStore()
    return NextResponse.json({
      medicines: store.medicines || [],
      orders: store.orders || []
    })
  } catch (error) {
    console.error('Error fetching inventory:', error)
    return NextResponse.json({ message: 'Failed to fetch inventory' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, category, price, stock, minStock, supplier, expiryDate, batchNumber } = body

    if (!name || !category || price === undefined || stock === undefined) {
      return NextResponse.json({ message: 'Missing required medicine fields.' }, { status: 400 })
    }

    const store = getStore()
    const newId = (store.medicines.length > 0 ? Math.max(...store.medicines.map(m => m.id)) : 0) + 1

    const newMed: Medicine = {
      id: newId,
      name,
      category,
      price: Number(price),
      stock: Number(stock),
      minStock: Number(minStock) || 15,
      supplier: supplier || "Medical Supplier",
      expiryDate: expiryDate || "2026-12-31",
      batchNumber: batchNumber || `BATCH${newId.toString().padStart(3, '0')}`
    }

    store.medicines.push(newMed)
    saveStore(store)

    return NextResponse.json({ message: 'Medicine added to inventory successfully', medicine: newMed }, { status: 201 })
  } catch (error) {
    console.error('Error adding medicine:', error)
    return NextResponse.json({ message: 'Failed to add medicine' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { action, medicineId, change, orderId } = body
    const store = getStore()

    // 1. Update medicine stock
    if (action === 'updateStock' && medicineId !== undefined) {
      const med = store.medicines.find(m => m.id === Number(medicineId))
      if (!med) {
        return NextResponse.json({ message: 'Medicine not found' }, { status: 404 })
      }
      med.stock = Math.max(0, med.stock + Number(change))
      saveStore(store)
      return NextResponse.json({ message: 'Stock updated', medicine: med })
    }

    // 2. Fulfill order
    if (action === 'fulfillOrder' && orderId !== undefined) {
      const order = store.orders.find(o => o.id === Number(orderId))
      if (!order) {
        return NextResponse.json({ message: 'Order not found' }, { status: 404 })
      }
      order.status = 'completed'

      // Deduct inventory for items in order if available
      order.medicines.forEach(item => {
        const med = store.medicines.find(m => m.name.toLowerCase() === item.name.toLowerCase())
        if (med) {
          med.stock = Math.max(0, med.stock - item.quantity)
        }
      })

      saveStore(store)
      return NextResponse.json({ message: 'Order fulfilled successfully', order, medicines: store.medicines })
    }

    return NextResponse.json({ message: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Error updating inventory:', error)
    return NextResponse.json({ message: 'Failed to update inventory' }, { status: 500 })
  }
}
