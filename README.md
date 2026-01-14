# AarogyaX – Rural Telemedicine Platform

AarogyaX is a web-based telemedicine platform built to improve access to basic healthcare services in rural and underserved areas.  
The application enables patients, doctors, and pharmacists to interact through a single system, supporting online consultations, digital prescriptions, and basic health guidance.

This project focuses on practical healthcare workflows rather than theoretical features and is designed as a functional prototype using modern web technologies.

---

## Why AarogyaX?

In many rural regions, access to timely medical advice is limited due to distance, lack of specialists, or infrastructure gaps. AarogyaX aims to address this problem by providing a lightweight digital platform where:

- Patients can consult doctors remotely  
- Doctors can manage consultations and issue prescriptions  
- Pharmacists can view prescriptions and provide medicines  

The system is designed with simplicity and usability in mind.

---

## Core Features

- **Role-Based Access**
  - Separate dashboards for Patients, Doctors, and Pharmacists
  - Secure access based on user roles

- **Online Doctor Consultation**
  - Patients can request consultations
  - Doctors can review and respond to requests

- **Digital Prescriptions**
  - Doctors generate prescriptions digitally
  - Pharmacists can access prescriptions without paperwork

- **AI-Assisted Symptom Guidance (Prototype)**
  - Basic symptom input to guide patients before consultation
  - Intended as a support feature, not a diagnostic tool

- **Emergency Guidance**
  - Quick-access emergency instructions for critical situations

---

## User Roles

### Patient
- Request consultations
- View prescriptions
- Access symptom guidance

### Doctor
- Manage consultation requests
- Diagnose patients
- Issue digital prescriptions

### Pharmacist
- View prescriptions
- Manage medicine fulfillment

---

## Technology Stack

- **Frontend:** Next.js, React, Tailwind CSS  
- **Backend:** Node.js  
- **Database:** MySQL  
- **Authentication:** Role-based access control  

The project follows a modular structure to keep the codebase maintainable and scalable.

---

## Project Structure

```text
AarogyaX/
│
├── app/
│   ├── api/
│   ├── doctor/
│   ├── patient/
│   └── pharmacist/
│
├── components/
├── lib/
├── public/
│
├── package.json
└── README.md

Clone the repository
git clone https://github.com/KaushikBora01/AarogyaX.git
cd AarogyaX

2. Install dependencies
npm install

3. Environment configuration

Create a .env file in the root directory:

DATABASE_URL="mysql://username:password@localhost:3306/aarogyax"
SECRET_KEY="your-secret-key"

4. Run the development server
npm run dev


Open the application at:

http://localhost:3000

Project Status

This project is currently a functional prototype intended for learning, demonstration, and portfolio purposes.
Future improvements may include enhanced security, real-time communication, and advanced AI integration.

Disclaimer

AarogyaX is not a certified medical system and should not be used for real-world medical diagnosis or treatment.
All medical-related features are implemented for educational and demonstration purposes only.

Author

Kaushik Bora
Email: kaushikbora0120@gmail.com

License

This project is licensed under the MIT License.