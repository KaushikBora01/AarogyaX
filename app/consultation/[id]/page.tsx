"use client"

import { useState, useEffect, use, Suspense } from "react"
import Teleconsultation from "@/components/teleconsultation"
import { useRouter, useSearchParams } from "next/navigation"

interface ConsultationPageProps {
  params: Promise<{
    id: string
  }>
}

function ConsultationContent({ params }: ConsultationPageProps) {
  const resolvedParams = use(params)
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [userType, setUserType] = useState<"patient" | "doctor">("patient")
  const [patientName, setPatientName] = useState("Rajesh Kumar")
  const [doctorName, setDoctorName] = useState("Dr. Priya Sharma")
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const roleParam = searchParams.get('role')
    const doctorData = localStorage.getItem("doctorData")
    const patientData = localStorage.getItem("patientData")

    if (roleParam === 'doctor' || (doctorData && !patientData)) {
      setUserType("doctor")
      if (doctorData) {
        try {
          const doc = JSON.parse(doctorData)
          setDoctorName(doc.name ? (doc.name.startsWith("Dr.") ? doc.name : `Dr. ${doc.name}`) : "Dr. Priya Sharma")
        } catch {}
      }
    } else {
      setUserType("patient")
      if (patientData) {
        try {
          const pat = JSON.parse(patientData)
          setPatientName(pat.name || "Rajesh Kumar")
        } catch {}
      }
    }
  }, [searchParams])

  const handleEndCall = () => {
    if (userType === "doctor") {
      router.push("/doctor")
    } else {
      router.push("/patient")
    }
  }

  return (
    <div className="h-screen">
      <Teleconsultation
        userType={userType}
        patientName={patientName}
        doctorName={doctorName}
        language={selectedLanguage}
        onEndCall={handleEndCall}
      />
    </div>
  )
}

export default function ConsultationPage(props: ConsultationPageProps) {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading consultation room...</div>}>
      <ConsultationContent {...props} />
    </Suspense>
  )
}
