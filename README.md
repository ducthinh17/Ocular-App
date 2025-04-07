# 👁️ DoctorAI – Ocular Disease Prediction App

DoctorAI is a web-based application that enables accurate prediction of **eight ocular diseases** using a deep learning model. The backend model is hosted on **Railway**, and the frontend is a **Node.js application** that runs locally, offering users a seamless prediction experience through an intuitive interface.

## 🔬 Supported Eye Diseases
DoctorAI is trained to detect the following conditions:

1. Cataract  
2. Glaucoma  
3. Hypertensive Retinopathy  
4. Myopia  
5. Age-related Macular Degeneration  
6. Diabetic Retinopathy  
7. Retinal Detachment  
8. Normal (No Disease)

---

## 🚀 Demo

> 🔗 **Live API Endpoint** (hosted on Railway):  
> api: [https://doctorai-ocular.up.railway.app/](https://doctorai-ocular.up.railway.app/)
> web: [https://doctor-calculate2-0.vercel.app/](https://doctor-calculate2-0.vercel.app/) 

## 📁 Project Structure

```
src/
├── app.ts
├── css/
├── global.d.ts
├── components/
├── database/
├── hooks.ts
├── pages/
│   ├── AccountDetails.tsx
│   ├── Calendar.tsx
│   ├── Guild.tsx
│   ├── Records.tsx
│   ├── Result_medical.tsx
│   ├── Suggestions.tsx
│   ├── Survey.css
│   ├── Survey.tsx
│   ├── calendar_date.tsx
│   ├── camera.tsx         <-- API integration here
│   ├── cart/
│   ├── category.tsx
│   ├── history.tsx
│   ├── historytest.tsx
│   ├── index/
│   ├── notification.tsx
│   ├── profile.tsx
│   ├── result.tsx
│   ├── search/
│   ├── statistics.tsx
│   ├── stepGuide.tsx
│   └── treatments.tsx
├── state.ts
├── static/
├── types/
└── utils/
```


## 🛠️ Installation & Setup

Follow these steps to clone the project, install dependencies, and run the application locally.

### 1. Clone the Repository

```bash
git clone https://github.com/ducthinh17/Ocular-App
cd Ocular-App
```
### 2. Install Dependencies (Using Yarn)
Ensure you have Node.js and Yarn installed. Then run:

```bash
yarn install
```
🔗 Install Yarn: https://classic.yarnpkg.com/en/docs/install
🔗 Install Node.js: https://nodejs.org/
### 3. Configure API Endpoint
Open the predict.js file (typically in the src/ folder) and locate the API URL definition. Update it to point to the Railway backend:

### 4. Start the Development Server

```bash
yarn dev
```
You should now see output similar to:
```bash
Local: http://localhost:3000
```
Open this URL in your browser to start using DoctorAI.
