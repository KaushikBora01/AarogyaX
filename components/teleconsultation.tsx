"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Video,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  MessageSquare,
  Send,
  Monitor,
  FileText,
  Clock,
  User,
  Stethoscope,
  Camera,
  CameraOff,
  Volume2,
  VolumeX,
} from "lucide-react"

interface Message {
  id: number
  sender: "patient" | "doctor"
  message: string
  timestamp: string
  type: "text" | "prescription" | "file"
}

interface TeleconsultationProps {
  userType: "patient" | "doctor"
  patientName?: string
  doctorName?: string
  language: string
  onEndCall?: () => void
}

export default function Teleconsultation({
  userType,
  patientName = "Rajesh Kumar",
  doctorName = "Dr. Priya Sharma",
  language,
  onEndCall,
}: TeleconsultationProps) {
  const [isVideoCall, setIsVideoCall] = useState(false)
  const [isAudioCall, setIsAudioCall] = useState(false)
  const [isVideoEnabled, setIsVideoEnabled] = useState(true)
  const [isAudioEnabled, setIsAudioEnabled] = useState(true)
  const [isSpeakerOn, setIsSpeakerOn] = useState(true)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [connectionQuality, setConnectionQuality] = useState<"good" | "fair" | "poor">("good")
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "doctor",
      message: "Hello! How are you feeling today?",
      timestamp: "10:30 AM",
      type: "text",
    },
    {
      id: 2,
      sender: "patient",
      message: "I've been having headaches and mild fever for the past few days.",
      timestamp: "10:31 AM",
      type: "text",
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [showChat, setShowChat] = useState(true)
  const [callNotes, setCallNotes] = useState("")

  const videoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const localStreamRef = useRef<MediaStream | null>(null)

  const languages = {
    en: {
      videoCall: "Video Call",
      audioCall: "Audio Call",
      endCall: "End Call",
      startVideo: "Start Video",
      startAudio: "Start Audio",
      mute: "Mute",
      unmute: "Unmute",
      camera: "Camera",
      speaker: "Speaker",
      chat: "Chat",
      notes: "Notes",
      shareScreen: "Share Screen",
      stopSharing: "Stop Sharing",
      connectionGood: "Good Connection",
      connectionFair: "Fair Connection",
      connectionPoor: "Poor Connection",
      typeMessage: "Type your message...",
      sendMessage: "Send Message",
      callDuration: "Call Duration",
      consultationNotes: "Consultation Notes",
      addNotes: "Add notes about this consultation...",
      prescription: "Prescription",
      sendPrescription: "Send Prescription",
      patientInfo: "Patient Information",
      doctorInfo: "Doctor Information",
      callStarted: "Call Started",
      callEnded: "Call Ended",
      connecting: "Ready for consultation",
      waitingForDoctor: "Waiting for doctor to join...",
      waitingForPatient: "Waiting for patient to join...",
    },
    hi: {
      videoCall: "वीडियो कॉल",
      audioCall: "ऑडियो कॉल",
      endCall: "कॉल समाप्त करें",
      startVideo: "वीडियो शुरू करें",
      startAudio: "ऑडियो शुरू करें",
      mute: "म्यूट करें",
      unmute: "अनम्यूट करें",
      camera: "कैमरा",
      speaker: "स्पीकर",
      chat: "चैट",
      notes: "नोट्स",
      shareScreen: "स्क्रीन साझा करें",
      stopSharing: "साझाकरण बंद करें",
      connectionGood: "अच्छा कनेक्शन",
      connectionFair: "ठीक कनेक्शन",
      connectionPoor: "खराब कनेक्शन",
      typeMessage: "अपना संदेश टाइप करें...",
      sendMessage: "संदेश भेजें",
      callDuration: "कॉल की अवधि",
      consultationNotes: "परामर्श नोट्स",
      addNotes: "इस परामर्श के बारे में नोट्स जोड़ें...",
      prescription: "नुस्खा",
      sendPrescription: "नुस्खा भेजें",
      patientInfo: "मरीज़ की जानकारी",
      doctorInfo: "डॉक्टर की जानकारी",
      callStarted: "कॉल शुरू हुई",
      callEnded: "कॉल समाप्त हुई",
      connecting: "परामर्श के लिए तैयार",
      waitingForDoctor: "डॉक्टर के जुड़ने का इंतज़ार...",
      waitingForPatient: "मरीज़ के जुड़ने का इंतज़ार...",
    },
    pa: {
      videoCall: "ਵੀਡੀਓ ਕਾਲ",
      audioCall: "ਆਡੀਓ ਕਾਲ",
      endCall: "ਕਾਲ ਖਤਮ ਕਰੋ",
      startVideo: "ਵੀਡੀਓ ਸ਼ੁਰੂ ਕਰੋ",
      startAudio: "ਆਡੀਓ ਸ਼ੁਰੂ ਕਰੋ",
      mute: "ਮਿਊਟ ਕਰੋ",
      unmute: "ਅਨਮਿਊਟ ਕਰੋ",
      camera: "ਕੈਮਰਾ",
      speaker: "ਸਪੀਕਰ",
      chat: "ਚੈਟ",
      notes: "ਨੋਟਸ",
      shareScreen: "ਸਕ੍ਰੀਨ ਸਾਂਝੀ ਕਰੋ",
      stopSharing: "ਸਾਂਝਾਕਰਨ ਬੰਦ ਕਰੋ",
      connectionGood: "ਚੰਗਾ ਕਨੈਕਸ਼ਨ",
      connectionFair: "ਠੀਕ ਕਨੈਕਸ਼ਨ",
      connectionPoor: "ਮਾੜਾ ਕਨੈਕਸ਼ਨ",
      typeMessage: "ਆਪਣਾ ਸੰਦੇਸ਼ ਟਾਈਪ ਕਰੋ...",
      sendMessage: "ਸੰਦੇਸ਼ ਭੇਜੋ",
      callDuration: "ਕਾਲ ਦੀ ਮਿਆਦ",
      consultationNotes: "ਸਲਾਹ ਨੋਟਸ",
      addNotes: "ਇਸ ਸਲਾਹ ਬਾਰੇ ਨੋਟਸ ਜੋੜੋ...",
      prescription: "ਨੁਸਖਾ",
      sendPrescription: "ਨੁਸਖਾ ਭੇਜੋ",
      patientInfo: "ਮਰੀਜ਼ ਦੀ ਜਾਣਕਾਰੀ",
      doctorInfo: "ਡਾਕਟਰ ਦੀ ਜਾਣਕਾਰੀ",
      callStarted: "ਕਾਲ ਸ਼ੁਰੂ ਹੋਈ",
      callEnded: "ਕਾਲ ਖਤਮ ਹੋਈ",
      connecting: "ਸਲਾਹ ਲਈ ਤਿਆਰ",
      waitingForDoctor: "ਡਾਕਟਰ ਦੇ ਜੁੜਨ ਦੀ ਉਡੀਕ...",
      waitingForPatient: "ਮਰੀਜ਼ ਦੇ ਜੁੜਨ ਦੀ ਉਡੀਕ...",
    },
  }

  const t = languages[language as keyof typeof languages] || languages.en

  // Simulate call duration timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isVideoCall || isAudioCall) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isVideoCall, isAudioCall])

  // Cleanup media tracks on unmount
  useEffect(() => {
    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleStartVideoCall = async () => {
    setIsVideoCall(true)
    setCallDuration(0)

    try {
      if (typeof navigator !== "undefined" && navigator.mediaDevices?.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        })
        localStreamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.play().catch(() => {})
        }
      }
    } catch (err) {
      console.warn("Camera/mic permission unavailable or running headlessly; continuing in simulated video mode:", err)
    }
  }

  const handleStartAudioCall = async () => {
    setIsAudioCall(true)
    setCallDuration(0)

    try {
      if (typeof navigator !== "undefined" && navigator.mediaDevices?.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        })
        localStreamRef.current = stream
      }
    } catch (err) {
      console.warn("Microphone permission unavailable, continuing in simulated audio mode:", err)
    }
  }

  const handleToggleAudio = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = !isAudioEnabled
      })
    }
    setIsAudioEnabled(!isAudioEnabled)
  }

  const handleToggleVideo = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getVideoTracks().forEach((track) => {
        track.enabled = !isVideoEnabled
      })
    }
    setIsVideoEnabled(!isVideoEnabled)
  }

  const handleToggleScreenShare = async () => {
    if (!isScreenSharing) {
      try {
        if (typeof navigator !== "undefined" && navigator.mediaDevices?.getDisplayMedia) {
          const stream = await navigator.mediaDevices.getDisplayMedia({ video: true })
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = stream
            remoteVideoRef.current.play().catch(() => {})
          }
          setIsScreenSharing(true)
          stream.getVideoTracks()[0].onended = () => {
            setIsScreenSharing(false)
          }
        }
      } catch (err) {
        console.warn("Screen share cancelled:", err)
      }
    } else {
      setIsScreenSharing(false)
    }
  }

  const handleEndCall = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop())
      localStreamRef.current = null
    }
    setIsVideoCall(false)
    setIsAudioCall(false)
    setCallDuration(0)
    onEndCall?.()
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: chatMessages.length + 1,
      sender: userType,
      message: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: "text",
    }

    setChatMessages((prev) => [...prev, message])
    setNewMessage("")
  }

  const handleSendPrescription = async () => {
    const defaultPrescription = "Paracetamol 500mg - 1 tablet twice daily after meals for 3 days; Cetirizine 10mg - 1 tablet at bedtime for 3 days"
    const prescriptionText = window.prompt("Enter Digital Prescription details:", defaultPrescription) || defaultPrescription

    const prescriptionMsg: Message = {
      id: chatMessages.length + 1,
      sender: "doctor",
      message: `Prescription: ${prescriptionText}`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: "prescription",
    }

    setChatMessages((prev) => [...prev, prescriptionMsg])

    try {
      await fetch("/api/prescriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId: 1,
          patientName,
          doctorName,
          diagnosis: callNotes || "Teleconsultation Assessment",
          prescription: prescriptionText,
          notes: callNotes,
          medicines: [
            { name: "Paracetamol 500mg", quantity: 10, price: 25 },
            { name: "Cough Syrup", quantity: 1, price: 45 }
          ]
        }),
      })
      alert("Prescription has been digitally issued and sent to the patient and pharmacy!")
    } catch (err) {
      console.error("Prescription dispatch error:", err)
    }
  }

  const getConnectionBadge = () => {
    const variants = {
      good: "default",
      fair: "secondary",
      poor: "destructive",
    } as const

    const labels = {
      good: t.connectionGood,
      fair: t.connectionFair,
      poor: t.connectionPoor,
    }

    return (
      <Badge variant={variants[connectionQuality]} className="text-xs">
        {labels[connectionQuality]}
      </Badge>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>
                {userType === "patient" ? <Stethoscope className="w-5 h-5" /> : <User className="w-5 h-5" />}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">{userType === "patient" ? doctorName : patientName}</h2>
              <p className="text-sm text-muted-foreground">
                {isVideoCall || isAudioCall ? (
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    {formatDuration(callDuration)}
                  </span>
                ) : (
                  t.connecting
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getConnectionBadge()}
            <Button variant="ghost" size="sm" onClick={() => setShowChat(!showChat)}>
              <MessageSquare className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video/Audio Call Area */}
        <div className="flex-1 relative bg-muted/20 flex flex-col items-center justify-center">
          {isVideoCall ? (
            <div className="w-full h-full relative bg-slate-900 flex items-center justify-center">
              {/* Remote Video Stream or Avatar Card */}
              <video
                ref={remoteVideoRef}
                className={`w-full h-full object-cover ${isScreenSharing ? "block" : "hidden"}`}
                autoPlay
                playsInline
              />
              {!isScreenSharing && (
                <div className="text-center p-8">
                  <div className="w-32 h-32 bg-primary/20 border-4 border-primary/30 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    {userType === "patient" ? (
                      <Stethoscope className="w-16 h-16 text-primary" />
                    ) : (
                      <User className="w-16 h-16 text-primary" />
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {userType === "patient" ? doctorName : patientName}
                  </h3>
                  <Badge variant="secondary" className="mb-4">
                    Live Video Consultation
                  </Badge>
                  <p className="text-sm text-slate-300">
                    Encrypted Rural Telemedicine Channel
                  </p>
                </div>
              )}

              {/* Local Video (Picture-in-Picture) */}
              <div className="absolute top-4 right-4 w-48 h-36 bg-slate-800 rounded-lg overflow-hidden border-2 border-primary/40 shadow-xl flex items-center justify-center">
                <video
                  ref={videoRef}
                  className={`w-full h-full object-cover ${isVideoEnabled ? "block" : "hidden"}`}
                  autoPlay
                  playsInline
                  muted
                />
                {!isVideoEnabled && (
                  <div className="text-center">
                    <CameraOff className="w-8 h-8 text-slate-400 mx-auto mb-1" />
                    <p className="text-xs text-slate-400">Camera Off</p>
                  </div>
                )}
                <div className="absolute bottom-1 left-2 text-[10px] bg-black/60 text-white px-1.5 py-0.5 rounded">
                  You ({userType})
                </div>
              </div>

              {/* Call Controls Overlay */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                <div className="flex items-center gap-3 bg-background/95 backdrop-blur-md rounded-full px-4 py-2.5 shadow-2xl border border-border">
                  <Button
                    size="sm"
                    variant={isAudioEnabled ? "default" : "destructive"}
                    onClick={handleToggleAudio}
                    className="rounded-full w-10 h-10 p-0"
                  >
                    {isAudioEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant={isVideoEnabled ? "default" : "destructive"}
                    onClick={handleToggleVideo}
                    className="rounded-full w-10 h-10 p-0"
                  >
                    {isVideoEnabled ? <Camera className="w-4 h-4" /> : <CameraOff className="w-4 h-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant={isSpeakerOn ? "outline" : "secondary"}
                    onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                    className="rounded-full w-10 h-10 p-0 bg-transparent"
                  >
                    {isSpeakerOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant={isScreenSharing ? "default" : "outline"}
                    onClick={handleToggleScreenShare}
                    className="rounded-full w-10 h-10 p-0 bg-transparent"
                  >
                    <Monitor className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={handleEndCall}
                    className="rounded-full w-10 h-10 p-0 bg-red-600 hover:bg-red-700"
                  >
                    <PhoneOff className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ) : isAudioCall ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Phone className="w-16 h-16 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{userType === "patient" ? doctorName : patientName}</h3>
                <p className="text-muted-foreground mb-6">{formatDuration(callDuration)}</p>
                <div className="flex items-center gap-3 justify-center">
                  <Button
                    size="sm"
                    variant={isAudioEnabled ? "default" : "destructive"}
                    onClick={handleToggleAudio}
                    className="rounded-full w-10 h-10 p-0"
                  >
                    {isAudioEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                    className="rounded-full w-10 h-10 p-0"
                  >
                    {isSpeakerOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={handleEndCall}
                    className="rounded-full w-10 h-10 p-0 bg-red-600 hover:bg-red-700"
                  >
                    <PhoneOff className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  {userType === "patient" ? (
                    <Stethoscope className="w-16 h-16 text-primary" />
                  ) : (
                    <User className="w-16 h-16 text-primary" />
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-2">{userType === "patient" ? doctorName : patientName}</h3>
                <p className="text-muted-foreground mb-6">
                  {userType === "patient" ? "Doctor is ready for consultation" : "Patient is in waiting room"}
                </p>
                <div className="flex gap-3 justify-center">
                  <Button onClick={handleStartVideoCall} className="bg-primary hover:bg-primary/90">
                    <Video className="w-4 h-4 mr-2" />
                    {t.startVideo}
                  </Button>
                  <Button variant="outline" onClick={handleStartAudioCall} className="bg-transparent">
                    <Phone className="w-4 h-4 mr-2" />
                    {t.startAudio}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chat Sidebar */}
        {showChat && (
          <div className="w-80 border-l bg-card/50 flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold">{t.chat}</h3>
              <Badge variant="outline" className="text-xs">
                Active Session
              </Badge>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === userType ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg p-3 ${
                        message.sender === userType
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      } ${message.type === "prescription" ? "border-2 border-secondary shadow-sm" : ""}`}
                    >
                      {message.type === "prescription" && (
                        <div className="flex items-center gap-2 mb-2 pb-1 border-b border-secondary/30">
                          <FileText className="w-4 h-4 text-secondary" />
                          <span className="text-xs font-semibold text-secondary">Digital Prescription</span>
                        </div>
                      )}
                      <p className="text-sm">{message.message}</p>
                      <p className="text-[10px] opacity-70 mt-1 text-right">{message.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t space-y-3">
              {userType === "doctor" && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleSendPrescription}
                  className="w-full bg-secondary/10 border-secondary text-secondary hover:bg-secondary/20"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  {t.sendPrescription}
                </Button>
              )}
              <div className="flex gap-2">
                <Input
                  placeholder={t.typeMessage}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className="bg-white"
                />
                <Button size="sm" onClick={handleSendMessage} className="bg-primary">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Notes Panel (Doctor Only) */}
      {userType === "doctor" && (
        <div className="border-t bg-card/80 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-primary" />
            <span className="font-medium text-sm">{t.consultationNotes}</span>
          </div>
          <Textarea
            placeholder={t.addNotes}
            value={callNotes}
            onChange={(e) => setCallNotes(e.target.value)}
            className="min-h-16 bg-white"
          />
        </div>
      )}
    </div>
  )
}
