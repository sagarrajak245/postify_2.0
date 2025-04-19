# Postify 2.0 🚀

Postify 2.0 is a certificate-based social media posting automation tool that streamlines the process of turning your achievements into professional social media content.

## 🔥 Project Overview

Postify 2.0 automatically:
- ✅ Scans emails for new certificates (Gmail API + LangChain + Pinecone)
- ✅ Extracts content using AI (GPT-4)
- ✅ Generates social media posts (LinkedIn, Twitter, Instagram)
- ✅ Stores user data securely (Supabase)
- ✅ Queues tasks for background processing (Redis)
- ✅ Notifies users about post status (Flask-Mail + Web Push)

## 🏗️ Tech Stack

### Backend
- **Flask**: Main web framework
- **Supabase**: Authentication and database
- **Redis & RQ**: Background task processing
- **OpenAI GPT-4**: AI post generation
- **Google APIs**: Gmail integration
- **LangChain & Pinecone**: Email processing and vector search
- **Cloudinary**: Certificate storage

### Frontend
- **React + Vite**: UI framework
- **Tailwind CSS**: Styling
- **TypeScript**: Type-safe code

## 📁 Project Structure

```
/postify
│── /backend
│   │── app.py               # Main Flask app
│   │── config.py            # App Configurations
│   │── models.py            # Database Models
│   │── routes.py            # API Routes
│   │── /services
│   │   │── auth_service.py  # User Authentication
│   │   │── email_service.py # Gmail API + LangChain
│   │   │── ai_service.py    # GPT-4 AI-generated content
│   │   │── redis_queue.py   # Redis Queue setup
│   │   │── social_service.py # LinkedIn/Twitter APIs
│   │   │── storage_service.py # Cloudinary Integration
│   │   │── notification_service.py # Flask-Mail + Web Push
│   ├── requirements.txt     # Dependencies
│   ├── wsgi.py              # Deployment Setup
│── /frontend
│   │── src/
│   │   │── components/      # Reusable Components
│   │   │── pages/           # UI Pages
│   │   │── services/        # API Calls to Flask Backend
│   │   │── App.tsx          # Main React Component
│   │── tailwind.config.js   # Tailwind CSS Config
│   │── package.json         # Frontend Dependencies
│── .env                     # API Keys & Configurations
│── README.md                # Project Documentation
```

## 🚀 Getting Started

### Prerequisites
- Python 3.9+
- Node.js 16+
- Redis server
- Supabase account
- Gmail API credentials
- OpenAI API key
- Cloudinary account

### Backend Setup

1. Create a virtual environment and activate it:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
cd postify/backend
pip install -r requirements.txt
```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Fill in your API keys and credentials

4. Run the development server:
```bash
flask run
```

5. Start the Redis worker (in a separate terminal):
```bash
rq worker postify-tasks
```

### Frontend Setup

1. Install dependencies:
```bash
cd postify/frontend
npm install
```

2. Start development server:
```bash
npm run dev
```

## 🌐 API Endpoints

### Authentication
- `POST /auth/signup`: Register a new user
- `POST /auth/login`: Login and get JWT token
- `GET /auth/profile`: Get user profile
- `POST /auth/logout`: Logout user

### Email Management
- `POST /email/scan`: Scan emails for certificates

### Social Media
- `POST /social/post`: Create and queue social media posts

## 🔐 Authentication Flow

1. User registers with email/password via Supabase
2. User logs in and receives JWT token
3. All protected routes require valid JWT in Authorization header

## 🔄 Background Processing

Certificate processing happens asynchronously:
1. Emails are scanned for certificates
2. Certificate text is extracted using AI
3. Social media posts are generated
4. Posts are queued for publishing
5. User is notified of post status

## 📱 Features Roadmap

- [x] User authentication with Supabase
- [ ] Email scanning with Gmail API
- [ ] Certificate extraction with AI
- [ ] Social media post generation
- [ ] LinkedIn/Twitter/Instagram posting
- [ ] User dashboard for post tracking
- [ ] Scheduled posting

## 🚀 Deployment

### Backend
- Deploy Flask app on Render:
  - Push to GitHub
  - Create a new Web Service on Render
  - Set environment variables

### Frontend
- Deploy React app on Vercel:
```bash
npm install -g vercel
vercel login
vercel deploy
```

## 📄 License

[MIT License](LICENSE)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

Built with ❤️ using Flask, React, and AI
