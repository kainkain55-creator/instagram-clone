# 🔧 Instagram Clone - Troubleshooting Guide

## Startup Issues

### Issue: `npm run dev` says "Cannot find module 'nodemon'"
```bash
# ✅ Fix:
npm install
npx nodemon server/index.js
```
**Why:** Dependencies weren't installed. `nodemon` auto-restarts the server on changes.

---

### Issue: "ECONNREFUSED: connection refused to MongoDB"
```
MongoError: connect ECONNREFUSED 127.0.0.1:27017
```

**✅ Solutions:**
1. Start MongoDB in a separate terminal:
   ```bash
   mongod
   ```

2. Or use MongoDB Atlas (cloud):
   ```bash
   # Create free account at https://www.mongodb.com/cloud/atlas
   # Copy connection string and update .env:
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/instagram-clone
   ```

3. Verify MongoDB is running:
   ```bash
   mongosh
   show dbs  # Should list databases
   ```

---

### Issue: "EADDRINUSE: address already in use :::5000"
```
Error: listen EADDRINUSE: address already in use :::5000
```

**✅ Solutions:**

**Option 1: Use a different port**
```env
# .env
PORT=5001
```

**Option 2: Kill the process using port 5000**

**macOS/Linux:**
```bash
lsof -ti:5000 | xargs kill -9
```

**Windows:**
```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

---

### Issue: ".env file not found" or variables undefined
```
TypeError: Cannot read property 'split' of undefined
```

**✅ Fix:**
1. Create `.env` in project **root** (not in client folder):
   ```bash
   cat > .env << EOF
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/instagram-clone
   JWT_SECRET=my_super_secret_key_12345
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:3000
   EOF
   ```

2. Restart backend:
   ```bash
   npm run dev
   ```

---

### Issue: JWT_SECRET is not set
```
Error: Unexpected token s in JSON at position 0
```

**✅ Fix:**
Ensure `.env` has `JWT_SECRET`:
```env
JWT_SECRET=replace_this_with_a_long_random_string
```

**Don't use:**
- `your_secret_key_here` (literal)
- Empty value
- Spaces: `JWT_SECRET = value`

---

## Frontend Issues

### Issue: "GET http://localhost:5000/api/auth/me 404 Not Found"

**✅ Check:**
1. Backend is running: `npm run dev` in root
2. Backend is on port 5000 (check `PORT` in `.env`)
3. Frontend `.env` has correct URL:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```
4. Restart frontend after changing `.env`

---

### Issue: CORS error in browser console
```
Access to XMLHttpRequest at 'http://localhost:5000/api/auth/login' 
from origin 'http://localhost:3000' has been blocked by CORS policy
```

**✅ Fix:**
1. Check backend `.env`:
   ```env
   CORS_ORIGIN=http://localhost:3000
   ```

2. If using different frontend port (e.g., 3001):
   ```env
   CORS_ORIGIN=http://localhost:3001
   ```

3. Restart backend:
   ```bash
   Ctrl+C
   npm run dev
   ```

---

### Issue: "Cannot find module 'react-router-dom'"

**✅ Fix:**
```bash
cd client
npm install
npm start
```

---

## Database Issues

### Issue: "MongoNetworkError: connect ENOTFOUND"
```
MongoNetworkError: getaddrinfo ENOTFOUND cluster.mongodb.net
```

**✅ Fix:**
1. Check internet connection
2. If using MongoDB Atlas, verify URL:
   ```bash
   # Should look like:
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/instagram-clone
   ```
3. Verify whitelist includes your IP: https://cloud.mongodb.com/v2/...

---

### Issue: MongoDB says "Database already exists" or schema errors

**✅ Solutions:**
```bash
# Option 1: Use existing database
# Just connect - MongoDB creates collections automatically

# Option 2: Clear everything and start fresh
# In mongosh:
use instagram-clone
db.dropDatabase()
exit
```

---

## Authentication Issues

### Issue: "Invalid credentials" on login
```
POST /api/auth/login → 400 { error: 'Invalid credentials' }
```

**✅ Check:**
1. Did you register first?
   ```bash
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"username":"test","email":"test@example.com","password":"password123"}'
   ```

2. Use exact email/password from registration

3. Password minimum 6 characters

---

### Issue: "No token, authorization denied"
```
GET /api/auth/me → 401 { error: 'No token, authorization denied' }
```

**✅ Fix:**
1. Login to get token:
   ```bash
   curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
   ```

2. Use token in requests:
   ```bash
   curl -H "Authorization: Bearer YOUR_TOKEN" \
     http://localhost:5000/api/auth/me
   ```

---

## Node/NPM Issues

### Issue: "npm: command not found"
```
bash: npm: command not found
```

**✅ Fix:**
1. Install Node.js from https://nodejs.org (v14+)
2. Verify:
   ```bash
   node -v
   npm -v
   ```

---

### Issue: "Unexpected token" or SyntaxError
```
SyntaxError: Unexpected token } in JSON
```

**✅ Check:**
1. `.env` file is not JSON (no commas):
   ```env
   # ✅ Correct
   PORT=5000
   JWT_SECRET=my_key
   
   # ❌ Wrong
   PORT=5000,
   JWT_SECRET="my_key"
   ```

2. Run `npm install` to ensure all dependencies are correct

---

## Debug Checklist

Run this to verify everything:

```bash
# 1. Check Node version (must be v14+)
node -v

# 2. Check npm
npm -v

# 3. Test MongoDB connection
mongosh -u admin -p --authenticationDatabase admin

# 4. Check .env file exists
ls -la .env

# 5. Test backend starts
npm run dev

# 6. Test backend responds (in another terminal)
curl http://localhost:5000/api/health

# 7. Test frontend can run
cd client && npm start
```

---

## Still Having Issues?

1. **Check all three terminals are running:**
   - Terminal 1: `mongod`
   - Terminal 2: `npm run dev` (backend)
   - Terminal 3: `cd client && npm start` (frontend)

2. **Copy full error message and check above**

3. **Reset everything:**
   ```bash
   # Backend
   rm -rf node_modules package-lock.json
   npm install
   npm run dev
   
   # Frontend (in new terminal)
   cd client
   rm -rf node_modules package-lock.json
   npm install
   npm start
   ```

4. **Check GitHub Issues:** https://github.com/kainkain55-creator/instagram-clone/issues
