<div align="center"> <img src="./img_readme/viking-left2.jpg" alt="Banner" width="180" height="250"> <img src="./img_readme/splashimage.png" alt="Banner" width="300" height="250"> <img src="./img_readme/viking-right2.jpg" alt="Banner" width="180" height="250"> </div> <p align="center"> <a href="https://git.io/typing-svg"> <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=900&size=50&pause=1000&color=30FFDD&width=800&height=80&lines=Welcome+to+DoctorAI+%E2%80%93+Ocular+Prediction+App" alt="Typing SVG" /> </a> </p> <p align="center"> <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=30&pause=1000&color=F96666&repeat=false&width=400&height=110&lines=Smarter+Vision+Starts+Here" alt="Typing SVG" /> </p> <div align="center"> <img src="./img_readme/survial.jpg" alt="Banner" width="330" height="450"> </div> <h3 align="center">Redefining medical diagnostics with deep learning and precision 🧠🩺</h3>
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
