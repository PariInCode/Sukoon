# 🌿 Sukoon - AI Powered Mental Health Platform

Sukoon is a full-stack AI-powered mental health platform that helps users monitor their emotional well-being through mood tracking, AI-assisted conversations, and a supportive community. The application provides a safe and interactive space for users to log their moods, chat with an AI companion, share experiences, and visualize their mental health journey.

---

## 🚀 Features

- 🔐 Secure User Authentication (JWT)
- 🤖 AI Chatbot powered by Google Gemini
- 📊 Mood Tracking & Analytics Dashboard
- 📝 Community Forum (Create & View Posts)
- 👤 Personalized User Profile
- 📈 Weekly Mood Insights
- 📚 Mental Health Resources
- 💻 Responsive UI with Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Tailwind CSS
- Axios
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt

### AI Integration
- Google Gemini API

---

## 📂 Project Structure

```
Mental-Healthforum/
│
├── client/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/your-username/sukoon.git
```

```bash
cd sukoon
```

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_KEY=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

Run the backend

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

The frontend runs on

```
http://localhost:5173
```

The backend runs on

```
http://localhost:5000
```

---

## ✨ Key Functionalities

- Register & Login
- Secure JWT Authentication
- Track Daily Mood
- Mood Analytics Dashboard
- AI Mental Health Chat
- Community Posts
- Personalized Profile
- Responsive Design

---

## 📸 Screenshots

> Add screenshots of:
- Home Page
- Dashboard
- Mood Tracker
- AI Chat
- Community
- Profile

---

## 🔮 Future Improvements

- Like & Comment System
- Community Moderation
- Mood Calendar
- Email Notifications
- AI Mood Insights
- Crisis Detection
- Dark Mode
- Real-time Chat

---

## 👨‍💻 Author

**Pari**

GitHub: https://github.com/PariInCode

LinkedIn: https://www.linkedin.com/in/your-linkedin/

---

## 📄 License

This project is created for educational and portfolio purposes.