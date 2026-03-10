# dstalgo-quiz5 — Acronym Decipher Chatbot

A full-stack chatbot platform where users can sign up, sign in, and ask the AI bot to decipher acronyms (tech, medical, business). The bot **strictly outputs expanded words only** — it refuses to explain concepts or provide history.

Built with **Django REST Framework** (backend) and **React + Redux** (frontend), styled with a ChatGPT-like dark interface.

---

## Screenshots

### Login Screen
![Login Screen](https://github.com/user-attachments/assets/5dd41f15-d29d-466f-a432-fb30294f89b4)

### Register Screen
![Register Screen](https://github.com/user-attachments/assets/1623a891-6d65-4360-86e4-f8737d789201)

### Home Screen (Welcome / Empty State)
![Home Screen - Empty State](https://github.com/user-attachments/assets/a28398fc-c1df-42cd-851b-7cbc7ed18a93)

### Home Screen (Active Conversation)
![Home Screen - Chat](https://github.com/user-attachments/assets/2494f30e-c00a-4f39-ab5c-57619d89d993)

---

## Project Structure

```
dstalgo-quiz5/
├── backend/               # Django project
│   ├── base_app/          # Main Django settings & root URL router (/api/v1)
│   ├── conversations/     # Models, serializers, views for chat
│   ├── authentication/    # JWT auth — register & login
│   ├── requirements.txt
│   └── .env.example
└── frontend/              # React + Redux app
    └── src/
        ├── store/         # Redux slices (auth, conversations)
        ├── screens/       # LoginScreen, RegisterScreen, HomeScreen
        ├── components/    # FormComponent, Loader, Message, ConversationItem, EmptyState
        └── services/      # Axios API service
```

---

## Backend Setup

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Edit .env and set OPENAI_API_KEY (optional — falls back to demo mode)
python manage.py migrate
python manage.py runserver
```

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/signup/` | Register a new user |
| POST | `/api/v1/auth/signin/` | Login and receive JWT tokens |
| POST | `/api/v1/conversation/` | Send a message (creates or continues conversation) |
| GET  | `/api/v1/conversations/` | List user's conversations |
| GET  | `/api/v1/conversations/<id>/` | Get conversation detail with messages |

---

## Frontend Setup

```bash
cd frontend
npm install
REACT_APP_API_URL=http://localhost:8000/api/v1 npm start
```

---

## Environment Variables

**Backend** (`backend/.env`):
```
OPENAI_API_KEY=sk-...      # OpenAI API key (leave empty for demo mode)
DJANGO_SECRET_KEY=...      # Django secret key
```

**Frontend** (optional `.env` in `frontend/`):
```
REACT_APP_API_URL=http://localhost:8000/api/v1
```

---

## Features

- **Authentication**: Register / Login with JWT (stored in localStorage)
- **Conversation history**: Saved per user, listed in sidebar
- **Acronym-only AI**: System prompt enforces expansion-only responses
- **Demo mode**: Works without an OpenAI API key for UI testing
- **Redux**: Auth state + conversations state with async thunks
