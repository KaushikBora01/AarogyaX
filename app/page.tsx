"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import AISymptomChecker from "@/components/ai-symptom-checker"
import { Heart, Users, Pill, Phone, Shield, Globe, Stethoscope, Activity, FileText, Video, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [isSymptomModalOpen, setIsSymptomModalOpen] = useState(false)
  const [isMedicineModalOpen, setIsMedicineModalOpen] = useState(false)
  const [isRecordsModalOpen, setIsRecordsModalOpen] = useState(false)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  const languages = {
    en: {
      title: "AarogyaX ",
      subtitle: "Connecting Rural Healthcare",
      description: "Access quality healthcare from anywhere in rural communities",
      tagline: "Bridging the gap between rural communities and quality healthcare",
      selectRole: "Choose Your Portal",
      doctor: "Doctor Portal",
      doctorDesc: "Manage consultations and patient care",
      patient: "Patient Portal",
      patientDesc: "Book appointments and access health records",
      pharmacist: "Pharmacist Portal",
      pharmacistDesc: "Manage medicine inventory and orders",
      emergency: "Emergency Services",
      emergencyDesc: "24/7 emergency medical support",
      features: "Platform Features",
      feature1: "AI Symptom Checker",
      feature1Desc: "Instant health triage & guidance",
      feature2: "Video Consultations",
      feature2Desc: "Connect with doctors remotely",
      feature3: "Digital Health Records",
      feature3Desc: "Paperless digital prescriptions",
      feature4: "Medicine Availability",
      feature4Desc: "Check rural pharmacy stock",
      feature5: "Emergency Support",
      feature5Desc: "24/7 direct dispatch (108)",
      feature6: "Multilingual Support",
      feature6Desc: "English, Hindi & Punjabi",
      getStarted: "Get Started",
      loginToPortal: "Login to Portal",
    },
    hi: {
      title: "आयुनेट",
      subtitle: "ग्रामीण स्वास्थ्य सेवा को जोड़ना",
      description: "ग्रामीण समुदायों में कहीं से भी गुणवत्तापूर्ण स्वास्थ्य सेवा प्राप्त करें",
      tagline: "ग्रामीण समुदायों और गुणवत्तापूर्ण स्वास्थ्य सेवा के बीच की खाई को पाटना",
      selectRole: "अपना पोर्टल चुनें",
      doctor: "डॉक्टर पोर्टल",
      doctorDesc: "परामर्श और रोगी देखभाल का प्रबंधन करें",
      patient: "मरीज़ पोर्टल",
      patientDesc: "अपॉइंटमेंट बुक करें और स्वास्थ्य रिकॉर्ड एक्सेस करें",
      pharmacist: "फार्मासिस्ट पोर्टल",
      pharmacistDesc: "दवा इन्वेंटरी और ऑर्डर का प्रबंधन करें",
      emergency: "आपातकालीन सेवाएं",
      emergencyDesc: "24/7 आपातकालीन चिकित्सा सहायता",
      features: "प्लेटफॉर्म सुविधाएं",
      feature1: "AI लक्षण जांचकर्ता",
      feature1Desc: "तत्काल स्वास्थ्य मार्गदर्शन",
      feature2: "वीडियो परामर्श",
      feature2Desc: "डॉक्टरों से सीधे परामर्श लें",
      feature3: "डिजिटल स्वास्थ्य रिकॉर्ड",
      feature3Desc: "डिजिटल नुस्खे और रिपोर्ट्स",
      feature4: "दवा उपलब्धता",
      feature4Desc: "फार्मेसी स्टॉक की जांच करें",
      feature5: "आपातकालीन सहायता",
      feature5Desc: "24/7 तत्काल एम्बुलेंस सहायता (108)",
      feature6: "बहुभाषी समर्थन",
      feature6Desc: "अंग्रेजी, हिंदी और पंजाबी",
      getStarted: "शुरू करें",
      loginToPortal: "पोर्टल में लॉगिन करें",
    },
    pa: {
      title: "ਆਯੁਨੈੱਟ",
      subtitle: "ਪੇਂਡੂ ਸਿਹਤ ਸੇਵਾ ਨੂੰ ਜੋੜਨਾ",
      description: "ਪੇਂਡੂ ਭਾਈਚਾਰਿਆਂ ਵਿੱਚ ਕਿਤੇ ਵੀ ਗੁਣਵੱਤਾ ਵਾਲੀ ਸਿਹਤ ਸੇਵਾ ਪ੍ਰਾਪਤ ਕਰੋ",
      tagline: "ਪੇਂਡੂ ਭਾਈਚਾਰਿਆਂ ਅਤੇ ਗੁਣਵੱਤਾ ਵਾਲੀ ਸਿਹਤ ਸੇਵਾ ਵਿਚਕਾਰ ਪੁਲ ਬਣਾਉਣਾ",
      selectRole: "ਆਪਣਾ ਪੋਰਟਲ ਚੁਣੋ",
      doctor: "ਡਾਕਟਰ ਪੋਰਟਲ",
      doctorDesc: "ਸਲਾਹ ਅਤੇ ਮਰੀਜ਼ ਦੀ ਦੇਖਭਾਲ ਦਾ ਪ੍ਰਬੰਧਨ ਕਰੋ",
      patient: "ਮਰੀਜ਼ ਪੋਰਟਲ",
      patientDesc: "ਮੁਲਾਕਾਤ ਬੁੱਕ ਕਰੋ ਅਤੇ ਸਿਹਤ ਰਿਕਾਰਡ ਤੱਕ ਪਹੁੰਚ ਕਰੋ",
      pharmacist: "ਫਾਰਮਾਸਿਸਟ ਪੋਰਟਲ",
      pharmacistDesc: "ਦਵਾਈ ਇਨਵੈਂਟਰੀ ਅਤੇ ਆਰਡਰ ਦਾ ਪ੍ਰਬੰਧਨ ਕਰੋ",
      emergency: "ਐਮਰਜੈਂਸੀ ਸੇਵਾਵਾਂ",
      emergencyDesc: "24/7 ਐਮਰਜੈਂਸੀ ਮੈਡੀਕਲ ਸਹਾਇਤਾ",
      features: "ਪਲੇਟਫਾਰਮ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ",
      feature1: "AI ਲੱਛਣ ਜਾਂਚਕਰਤਾ",
      feature1Desc: "ਤੁਰੰਤ ਸਿਹਤ ਸਲਾਹ",
      feature2: "ਵੀਡੀਓ ਸਲਾਹ",
      feature2Desc: "ਡਾਕਟਰਾਂ ਨਾਲ ਆਨਲਾਈਨ ਮੁਲਾਕਾਤ",
      feature3: "ਡਿਜੀਟਲ ਸਿਹਤ ਰਿਕਾਰਡ",
      feature3Desc: "ਕਾਗਜ਼ ਰਹਿਤ ਡਿਜੀਟਲ ਨੁਸਖੇ",
      feature4: "ਦਵਾਈ ਉਪਲਬਧਤਾ",
      feature4Desc: "ਫਾਰਮੇਸੀ ਸਟਾਕ ਜਾਂਚੋ",
      feature5: "ਐਮਰਜੈਂਸੀ ਸਹਾਇਤਾ",
      feature5Desc: "24/7 ਐਮਰਜੈਂਸੀ ਮਦਦ (108)",
      feature6: "ਬਹੁਭਾਸ਼ੀ ਸਹਾਇਤਾ",
      feature6Desc: "ਅੰਗਰੇਜ਼ੀ, ਹਿੰਦੀ ਅਤੇ ਪੰਜਾਬੀ",
      getStarted: "ਸ਼ੁਰੂ ਕਰੋ",
      loginToPortal: "ਪੋਰਟਲ ਵਿੱਚ ਲਾਗਇਨ ਕਰੋ",
    },
  }

  const currentLang = languages[selectedLanguage as keyof typeof languages]

  const cycleLanguage = () => {
    if (selectedLanguage === "en") setSelectedLanguage("hi")
    else if (selectedLanguage === "hi") setSelectedLanguage("pa")
    else setSelectedLanguage("en")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5">
      <div
        className="absolute inset-0 opacity-5 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/medical-stethoscope-heartbeat-rural-healthcare-bac.png')`,
        }}
      />

      {/* Header */}
      <header className="relative bg-white/95 backdrop-blur-sm shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Stethoscope className="h-10 w-10 text-primary" />
                <Activity className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">{currentLang.title}</h1>
                <p className="text-sm text-muted-foreground">{currentLang.subtitle}</p>
              </div>
            </div>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-32 bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">हिंदी</SelectItem>
                <SelectItem value="pa">ਪੰਜਾਬੀ</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              {currentLang.description}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">{currentLang.tagline}</p>
          </div>

          {/* Emergency Button */}
          <Link href="/emergency">
            <Button
              size="lg"
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground mb-16 text-lg px-10 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Phone className="mr-3 h-6 w-6" />
              {currentLang.emergency}
            </Button>
          </Link>

          {/* Role Selection */}
          <div className="mb-20">
            <h3 className="text-3xl font-semibold text-foreground mb-12">{currentLang.selectRole}</h3>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Link href="/doctor/login">
                <Card className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-border hover:border-primary/50 bg-card/80 backdrop-blur-sm h-full">
                  <CardHeader className="text-center p-8">
                    <div className="mb-6 p-4 bg-primary/10 rounded-full w-20 h-20 mx-auto flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Users className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="text-xl text-card-foreground mb-3">{currentLang.doctor}</CardTitle>
                    <CardDescription className="text-muted-foreground mb-4">{currentLang.doctorDesc}</CardDescription>
                    <Button
                      variant="outline"
                      className="mt-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                    >
                      {currentLang.loginToPortal}
                    </Button>
                  </CardHeader>
                </Card>
              </Link>

              <Link href="/patient/login">
                <Card className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-border hover:border-secondary/50 bg-card/80 backdrop-blur-sm h-full">
                  <CardHeader className="text-center p-8">
                    <div className="mb-6 p-4 bg-secondary/10 rounded-full w-20 h-20 mx-auto flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                      <Heart className="h-10 w-10 text-secondary" />
                    </div>
                    <CardTitle className="text-xl text-card-foreground mb-3">{currentLang.patient}</CardTitle>
                    <CardDescription className="text-muted-foreground mb-4">{currentLang.patientDesc}</CardDescription>
                    <Button
                      variant="outline"
                      className="mt-2 group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors bg-transparent"
                    >
                      {currentLang.loginToPortal}
                    </Button>
                  </CardHeader>
                </Card>
              </Link>

              <Link href="/pharmacist/login">
                <Card className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-border hover:border-accent/50 bg-card/80 backdrop-blur-sm h-full">
                  <CardHeader className="text-center p-8">
                    <div className="mb-6 p-4 bg-accent/10 rounded-full w-20 h-20 mx-auto flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <Pill className="h-10 w-10 text-accent" />
                    </div>
                    <CardTitle className="text-xl text-card-foreground mb-3">{currentLang.pharmacist}</CardTitle>
                    <CardDescription className="text-muted-foreground mb-4">
                      {currentLang.pharmacistDesc}
                    </CardDescription>
                    <Button
                      variant="outline"
                      className="mt-2 group-hover:bg-accent group-hover:text-accent-foreground transition-colors bg-transparent"
                    >
                      {currentLang.loginToPortal}
                    </Button>
                  </CardHeader>
                </Card>
              </Link>
            </div>
          </div>

          {/* Features Section - Fully Interactive */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 border border-border shadow-xl">
            <h3 className="text-3xl font-semibold text-foreground mb-12">{currentLang.features}</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1: AI Symptom Checker */}
              <div
                onClick={() => setIsSymptomModalOpen(true)}
                className="flex flex-col items-center p-6 bg-white/80 rounded-2xl shadow-lg border border-border hover:shadow-2xl hover:border-primary/50 transition-all cursor-pointer group"
              >
                <div className="p-3 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground text-lg mb-1">{currentLang.feature1}</h4>
                <p className="text-xs text-muted-foreground mb-3">{currentLang.feature1Desc}</p>
                <Badge variant="outline" className="text-primary border-primary/40 group-hover:bg-primary group-hover:text-white transition-colors">
                  Launch Checker
                </Badge>
              </div>

              {/* Feature 2: Video Consultations */}
              <div
                onClick={() => setIsVideoModalOpen(true)}
                className="flex flex-col items-center p-6 bg-white/80 rounded-2xl shadow-lg border border-border hover:shadow-2xl hover:border-secondary/50 transition-all cursor-pointer group"
              >
                <div className="p-3 bg-secondary/10 rounded-full mb-4 group-hover:bg-secondary/20 transition-colors">
                  <Phone className="h-8 w-8 text-secondary" />
                </div>
                <h4 className="font-semibold text-foreground text-lg mb-1">{currentLang.feature2}</h4>
                <p className="text-xs text-muted-foreground mb-3">{currentLang.feature2Desc}</p>
                <Badge variant="outline" className="text-secondary border-secondary/40 group-hover:bg-secondary group-hover:text-white transition-colors">
                  Enter Consultation
                </Badge>
              </div>

              {/* Feature 3: Digital Health Records */}
              <div
                onClick={() => setIsRecordsModalOpen(true)}
                className="flex flex-col items-center p-6 bg-white/80 rounded-2xl shadow-lg border border-border hover:shadow-2xl hover:border-accent/50 transition-all cursor-pointer group"
              >
                <div className="p-3 bg-accent/10 rounded-full mb-4 group-hover:bg-accent/20 transition-colors">
                  <Heart className="h-8 w-8 text-accent" />
                </div>
                <h4 className="font-semibold text-foreground text-lg mb-1">{currentLang.feature3}</h4>
                <p className="text-xs text-muted-foreground mb-3">{currentLang.feature3Desc}</p>
                <Badge variant="outline" className="text-accent border-accent/40 group-hover:bg-accent group-hover:text-white transition-colors">
                  View Records
                </Badge>
              </div>

              {/* Feature 4: Medicine Availability */}
              <div
                onClick={() => setIsMedicineModalOpen(true)}
                className="flex flex-col items-center p-6 bg-white/80 rounded-2xl shadow-lg border border-border hover:shadow-2xl hover:border-primary/50 transition-all cursor-pointer group"
              >
                <div className="p-3 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
                  <Pill className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground text-lg mb-1">{currentLang.feature4}</h4>
                <p className="text-xs text-muted-foreground mb-3">{currentLang.feature4Desc}</p>
                <Badge variant="outline" className="text-primary border-primary/40 group-hover:bg-primary group-hover:text-white transition-colors">
                  Check Stock
                </Badge>
              </div>

              {/* Feature 5: Emergency Support */}
              <Link href="/emergency" className="block">
                <div className="flex flex-col items-center p-6 bg-white/80 rounded-2xl shadow-lg border border-border hover:shadow-2xl hover:border-destructive/50 transition-all cursor-pointer group h-full">
                  <div className="p-3 bg-destructive/10 rounded-full mb-4 group-hover:bg-destructive/20 transition-colors">
                    <Shield className="h-8 w-8 text-destructive" />
                  </div>
                  <h4 className="font-semibold text-foreground text-lg mb-1">{currentLang.feature5}</h4>
                  <p className="text-xs text-muted-foreground mb-3">{currentLang.feature5Desc}</p>
                  <Badge variant="destructive" className="group-hover:shadow transition-shadow">
                    Emergency Hotline
                  </Badge>
                </div>
              </Link>

              {/* Feature 6: Multilingual Support */}
              <div
                onClick={cycleLanguage}
                className="flex flex-col items-center p-6 bg-white/80 rounded-2xl shadow-lg border border-border hover:shadow-2xl hover:border-secondary/50 transition-all cursor-pointer group"
              >
                <div className="p-3 bg-secondary/10 rounded-full mb-4 group-hover:bg-secondary/20 transition-colors">
                  <Globe className="h-8 w-8 text-secondary" />
                </div>
                <h4 className="font-semibold text-foreground text-lg mb-1">{currentLang.feature6}</h4>
                <p className="text-xs text-muted-foreground mb-3">Current: {selectedLanguage === 'en' ? 'English' : selectedLanguage === 'hi' ? 'हिंदी' : 'ਪੰਜਾਬੀ'}</p>
                <Badge variant="outline" className="text-secondary border-secondary/40 group-hover:bg-secondary group-hover:text-white transition-colors">
                  Click to Switch
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Modal: AI Symptom Checker */}
      <Dialog open={isSymptomModalOpen} onOpenChange={setIsSymptomModalOpen}>
        <DialogContent className="max-w-2xl bg-white max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              AI Symptom Guidance Tool
            </DialogTitle>
            <DialogDescription>Describe your symptoms for preliminary clinical insights</DialogDescription>
          </DialogHeader>
          <div className="pt-2">
            <AISymptomChecker
              language={selectedLanguage}
              onEmergencyDetected={() => {
                setIsSymptomModalOpen(false)
                router.push("/emergency")
              }}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* 2. Modal: Video Consultation Selection */}
      <Dialog open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Video className="w-5 h-5 text-secondary" />
              Teleconsultation Video Rooms
            </DialogTitle>
            <DialogDescription>Select your consultation role to join a live room</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-3">
            <Link href="/consultation/1?role=doctor" className="block">
              <div className="p-4 border rounded-xl hover:border-primary hover:bg-primary/5 transition-all cursor-pointer flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">Join as Doctor</p>
                  <p className="text-xs text-muted-foreground">Clinical dashboard & prescription tools</p>
                </div>
                <Users className="w-5 h-5 text-primary" />
              </div>
            </Link>
            <Link href="/consultation/1?role=patient" className="block">
              <div className="p-4 border rounded-xl hover:border-secondary hover:bg-secondary/5 transition-all cursor-pointer flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">Join as Patient</p>
                  <p className="text-xs text-muted-foreground">Speak with your physician in real-time</p>
                </div>
                <Heart className="w-5 h-5 text-secondary" />
              </div>
            </Link>
          </div>
        </DialogContent>
      </Dialog>

      {/* 3. Modal: Digital Health Records Preview */}
      <Dialog open={isRecordsModalOpen} onOpenChange={setIsRecordsModalOpen}>
        <DialogContent className="max-w-lg bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent" />
              Digital Health Records System
            </DialogTitle>
            <DialogDescription>Encrypted, paperless patient histories & digital prescriptions</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 pt-2 text-sm">
            <div className="p-4 border rounded-xl bg-muted/30 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Recent Consultation Record</span>
                <Badge variant="outline">2024-01-10</Badge>
              </div>
              <p className="text-xs text-muted-foreground">Doctor: Dr. Priya Sharma (General Physician)</p>
              <p className="text-xs text-muted-foreground">Diagnosis: Common Cold & Seasonal Fever</p>
              <div className="p-2 bg-white rounded border text-xs font-mono text-primary">
                Rx: Rest, fluids, paracetamol 500mg (1-0-1)
              </div>
            </div>
            <div className="flex justify-between items-center pt-2">
              <Link href="/patient/login">
                <Button size="sm" className="bg-secondary text-white hover:bg-secondary/90">
                  Login to Access Full Records
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={() => setIsRecordsModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 4. Modal: Live Medicine Availability */}
      <Dialog open={isMedicineModalOpen} onOpenChange={setIsMedicineModalOpen}>
        <DialogContent className="max-w-lg bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Pill className="w-5 h-5 text-primary" />
              Rural Pharmacy Availability
            </DialogTitle>
            <DialogDescription>Live inventory at Kumar Medical Store (Nabha, Punjab)</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 pt-2 text-sm">
            <div className="space-y-2 max-h-60 overflow-y-auto">
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="font-semibold">Paracetamol 500mg</p>
                  <p className="text-xs text-muted-foreground">Pain Relief • ABC Pharma</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">₹25</p>
                  <Badge variant="default" className="text-[10px]">In Stock (150)</Badge>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="font-semibold">Amoxicillin 250mg</p>
                  <p className="text-xs text-muted-foreground">Antibiotic • XYZ Medical</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">₹85</p>
                  <Badge variant="secondary" className="text-[10px]">Low Stock (12)</Badge>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="font-semibold">Cough Syrup 100ml</p>
                  <p className="text-xs text-muted-foreground">Cold & Flu • DEF Healthcare</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">₹45</p>
                  <Badge variant="destructive" className="text-[10px]">Out of Stock</Badge>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="font-semibold">Vitamin D3</p>
                  <p className="text-xs text-muted-foreground">Supplements • GHI Nutrition</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">₹120</p>
                  <Badge variant="default" className="text-[10px]">In Stock (75)</Badge>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center pt-2">
              <Link href="/pharmacist/login">
                <Button size="sm" variant="outline">
                  Pharmacist Login
                </Button>
              </Link>
              <Button size="sm" onClick={() => setIsMedicineModalOpen(false)} className="bg-primary">
                Done
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
