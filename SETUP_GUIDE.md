# 🚀 Instagram Clone - Complete Setup Guide

Follow these steps in order to get your Instagram Clone running locally.

---

## **Step 1: Clone the Repository**

```bash
git clone https://github.com/kainkain55-creator/instagram-clone.git
cd instagram-clone
```

**What this does:** Downloads the project to your computer and navigates to the root directory.

---

## **Step 2: Install Backend Dependencies**

```bash
npm install
```

**What this does:** Downloads all required packages for the Node.js backend (Express, MongoDB driver, JWT, etc.)

**Troubleshooting:** If this fails, ensure you have Node.js v14+ installed:
```bash
node -v
npm -v
```

---

## **Step 3: Create Environment Files**

### **Backend .env File (in project root)**

Create a file named `.env` in the root directory with this content:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/instagram-clone
JWT_SECRET=your_secret_key_here
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

**Quick method:**
```bash
cp .env.example .env
```

---

## **Step 4: Start MongoDB**

Open a **new terminal** and run:

```bash
mongod
```

**What this does:** Starts the MongoDB database server (required for the app to store data).

**Note:** Keep this terminal running in the background while developing.

**Troubleshooting:** If `mongod` command not found:
- Install MongoDB from: https://docs.mongodb.com/manual/installation/
- Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

---

## **Step 5: Start the Backend Server**

In your original terminal (project root), run:

```bash
npm run dev
```

**Expected output:**
```
Server running on http://localhost:5000
Connected to MongoDB
```

**What this does:** Starts the Express.js backend server on port 5000.

**Troubleshooting:**
- If port 5000 is in use, change `PORT` in `.env` to another number (e.g., 5001)
- If MongoDB connection fails, ensure `mongod` is running (Step 4)

---

## **Step 6: Install Frontend Dependencies**

Open a **third terminal** and run:

```bash
cd client
npm install
```

**What this does:** Downloads React and frontend packages in the `client` folder.

---

## **Step 7: Create Frontend Environment File**

In the `client` folder, create `.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

**Note:** Must start with `REACT_APP_` for React to recognize it.

---

## **Step 8: Start the Frontend Server**

In the same terminal (still in `client` folder), run:

```bash
npm start
```

**Expected output:**
```
Compiled successfully!
You can now view instagram-clone in the browser.

  Local:            http://localhost:3000
```

**What this does:** Starts the React development server on port 3000 and opens it in your browser.

---

## **✅ Verification Checklist**

- [ ] Backend running on `http://localhost:5000`
- [ ] Frontend running on `http://localhost:3000`
- [ ] MongoDB server running (terminal with `mongod`)
- [ ] No errors in any terminal
- [ ] React app loaded in browser

---

## **🎯 Your Terminal Setup Should Look Like:**

| Terminal | Command | Expected Output |
|----------|---------|-----------------|
| **Terminal 1** | `mongod` | `Listening on 27017` |
| **Terminal 2** | `npm run dev` | `Server running on http://localhost:5000` |
| **Terminal 3** | `cd client && npm start` | Browser opens to `http://localhost:3000` |

---

## **📝 Common Commands**

### **Stop All Servers**
Press `Ctrl+C` in each terminal.

### **Restart Backend**
```bash
# Terminal 2
Ctrl+C
npm run dev
```

### **Restart Frontend**
```bash
# Terminal 3
Ctrl+C
npm start
```

### **Reset Everything (if broken)**
```bash
# In project root
rm -rf node_modules package-lock.json
npm install

# Then repeat Steps 5-8
```

---

## **🔗 API Endpoints to Test**

Once running, test these in your browser or with curl:

### **Health Check**
```bash
curl http://localhost:5000/api/auth/me
```

### **Register User**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

### **Login**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

---

## **🐛 Troubleshooting**

### **"Cannot find module" error**
```bash
npm install
```

### **"Port 5000 already in use"**
```bash
# Change PORT in .env to 5001, or kill the process:
# macOS/Linux:
lsof -ti:5000 | xargs kill -9

# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### **"Cannot connect to MongoDB"**
```bash
# Ensure MongoDB is running:
mongod

# Or use MongoDB Atlas cloud:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/instagram-clone
```

### **CORS errors in frontend**
Check that `.env` has:
```env
CORS_ORIGIN=http://localhost:3000
```

### **Frontend can't reach backend**
Check `client/.env` has:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## **📚 Full Project Structure**

```
instagram-clone/
├── server/                    # Backend code
│   ├── models/
│   │   ├── User.js
│   │   └── Message.js
│   ├── routes/
│   │   ├── auth.js            # Auth endpoints
│   │   ├── messages.js        # Message endpoints
│   │   └── users.js           # User endpoints
│   ├── middleware/
│   │   └── auth.js            # JWT auth middleware
│   └── index.js               # Main server entry
├── client/                    # Frontend code (React)
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── api.js             # API calls
│   │   ├── App.jsx
│   │   └── index.jsx
│   ├── .env                   # Frontend config
│   └── package.json
├── .env                       # Backend config (create this)
├── .env.example               # Template
├── package.json               # Backend dependencies
└── README.md
```

---

## **🎓 Next Steps**

Once everything is running:
1. Open http://localhost:3000 in your browser
2. Register a new account
3. Log in
4. Explore the messaging and profile features
5. Check the browser console (F12) for any errors
6. Check backend terminal for server logs

---

## **Need Help?**

If you get stuck:
1. Paste the exact error message
2. Tell me which step you're on
3. Share which terminal the error is in

Good luck! 🚀
