# 🚀 Instagram Clone - Quick Start (5 Minutes)

## Prerequisites
- Node.js v14+ installed
- MongoDB running locally

## Setup (3 minutes)

### 1. Install & Configure
```bash
# Clone and install
git clone https://github.com/kainkain55-creator/instagram-clone.git
cd instagram-clone
npm install

# Create .env file in root
cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/instagram-clone
JWT_SECRET=your_secret_key_here
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
EOF
```

### 2. Start MongoDB (Terminal 1)
```bash
mongod
```

### 3. Start Backend (Terminal 2)
```bash
npm run dev
```
Expected output: `Server running on port 5000`

### 4. Start Frontend (Terminal 3)
```bash
cd client
npm install
cat > .env << EOF
REACT_APP_API_URL=http://localhost:5000/api
EOF
npm start
```

## ✅ Done!
- Frontend: http://localhost:3000
- Backend: http://localhost:5000/api/health

## Test It
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## Quick Fixes
| Error | Fix |
|-------|-----|
| `Cannot find module` | Run `npm install` again |
| `Port 5000 in use` | Change `PORT=5001` in `.env` |
| `MongoDB connection failed` | Run `mongod` in separate terminal |
| `CORS error in browser` | Restart backend with correct `CORS_ORIGIN` |

## File Structure
```
instagram-clone/
├── server/          → Backend (Node.js/Express)
├── client/          → Frontend (React)
├── .env             → Backend config (create this)
└── package.json
```

## Endpoints
- `POST /api/auth/register` — Create account
- `POST /api/auth/login` — Login
- `GET /api/auth/me` — Get current user
- `POST /api/messages/send` — Send message
- `GET /api/messages` — Get messages
- `POST /api/users/:userId/follow` — Follow user

For full setup details, see `SETUP_GUIDE.md`
