


#  ResearchMate AI

ResearchMate AI is a Retrieval-Augmented Generation (RAG) platform that enables users to interact with PDF documents using Google's Gemini AI. Users can upload research papers, chat with documents, generate summaries, perform semantic search, and maintain conversational memory through a modern web interface.





<p align="center">
  <strong>An AI-Powered Research Assistant built with FastAPI, PostgreSQL, Next.js, and Google Gemini.</strong>
</p>

<p align="center">
  Upload PDF documents, chat with your files using AI, search across your research library, and manage your knowledge in one modern workspace.
</p>

---

#  Features

##  Authentication

- User Registration
- Secure Login
- JWT Authentication
- Protected Routes
- Password Hashing

---

##  Document Management

- Upload PDF Documents
- Extract PDF Text
- Store Documents in PostgreSQL
- View Uploaded Documents
- Download Documents
- Delete Documents

---

##  AI Features

- Chat with Uploaded Documents
- AI-powered Document Summarization
- Global AI Search Across All Documents
- Context-aware Responses
- Conversation Memory (Chat History)

---

##  AI & Retrieval

- Google Gemini AI
- PDF Text Extraction
- Document Chunking
- Vector Embeddings
- Semantic Retrieval
- RAG (Retrieval-Augmented Generation)

---

##  Dashboard

- Modern Dashboard
- Document Library
- AI Chat Interface
- Global Search
- Recent Conversations
- Workspace Statistics

---

#  Tech Stack

## Backend

- FastAPI
- SQLAlchemy
- PostgreSQL
- Alembic
- JWT Authentication
- Passlib
- Python-Jose

## AI

- Google Gemini API
- Google GenAI SDK
- NumPy
- PyPDF

## Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Axios
- Lucide React

---

#  Project Structure

```
researchmate-ai/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── database/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── utils/
│   │
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── lib/
│   │
│   └── package.json
│
├── uploads/
├── .env.example
├── README.md
└── .gitignore
```

---

#  Installation

## 1️ Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/ResearchMate-AI.git

cd ResearchMate-AI
```

---

## 2️ Backend Setup

Create a virtual environment

```bash
python -m venv venv
```

Activate it

Windows

```bash
venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run the backend

```bash
uvicorn backend.app.main:app --reload
```

Backend runs at

```
http://127.0.0.1:8000
```

Swagger UI

```
http://127.0.0.1:8000/docs
```

---

## 3️ Frontend Setup

Navigate to frontend

```bash
cd frontend
```

Install packages

```bash
npm install
```

Run

```bash
npm run dev
```

Frontend runs at

```
http://localhost:3000
```

---

#  Environment Variables

Create a `.env` file in the project root.

Example:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/researchmate

SECRET_KEY=your_secret_key

ALGORITHM=HS256

GEMINI_API_KEY=your_gemini_api_key
```

---

#  API Endpoints

## Authentication

- POST `/auth/register`
- POST `/auth/login`

---

## Documents

- POST `/upload`
- GET `/documents`
- GET `/documents/{id}`
- DELETE `/documents/{id}`

---

## AI

- POST `/ai/{document_id}/chat`
- POST `/ai/{document_id}/summarize`
- POST `/ai/search`

---

# 🧪 Current Status

### Backend

-  Authentication
-  PostgreSQL Integration
-  JWT Security
-  PDF Upload
-  Document CRUD
-  AI Chat
-  Global Search
-  Chat History
-  Semantic Retrieval

### Frontend

-  Landing Page
-  Login
-  Register
-  Dashboard
-  Upload Documents
-  AI Chat
-  Global Search
-  Recent Chats
-  Protected Routes

---

#  Future Improvements

- AI Streaming Responses
- Multiple File Upload
- Folder Organization
- Document Sharing
- OCR Support
- Dark Mode
- User Profile
- Deployment (Docker)
- CI/CD Pipeline

---

#  Screenshots

> Screenshots will be added soon.

- Landing Page
- Login Page
- Register Page
- Dashboard
- Upload Documents
- AI Chat
- Global Search

---

#  Author

**Shahib Hasan Jihan**

Backend Developer | Python | FastAPI | AI Applications

GitHub

https://github.com/Shaibjihan

LinkedIn

https://www.linkedin.com/in/shahib-hasan-jihan

---

#  If you found this project useful

Please consider giving it a  on GitHub.