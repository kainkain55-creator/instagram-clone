# Instagram Clone 📸💬

A full-stack Instagram-like social media application with real-time messaging, photo sharing, and user interactions.

## Features

✨ **User Authentication**
- User registration and login
- JWT token-based authentication
- Password hashing with bcryptjs

💬 **Messaging System**
- Send and receive direct messages
- Read/unread message tracking
- Message timestamps
- Delete messages
- Unread message count
- Conversation history

👥 **User Profiles**
- User profiles with bio and profile picture
- Follow/Unfollow users
- View follower/following lists
- Update profile information

📱 **Responsive Design**
- Instagram-inspired UI
- Mobile-friendly design
- Clean and intuitive interface

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** for database
- **JWT** for authentication
- **Bcryptjs** for password hashing
- **CORS** for cross-origin requests

### Frontend
- **React** 18
- **React Router** for navigation
- **Axios** for API calls
- **CSS3** for styling

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup

1. Clone the repository:
```bash
git clone https://github.com/kainkain55-creator/instagram-clone.git
cd instagram-clone
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/instagram-clone
JWT_SECRET=your_secret_key_here
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

4. Start MongoDB:
```bash
mongod
```

5. Run the backend server:
```bash
npm run dev
```

The server will start on `http://localhost:5000`

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the React app:
```bash
npm start
```

The app will open on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Messages
- `GET /api/messages` - Get all messages for current user
- `GET /api/messages/conversation/:userId` - Get conversation with specific user
- `POST /api/messages/send` - Send a new message
- `PUT /api/messages/:messageId/read` - Mark message as read
- `GET /api/messages/unread/count` - Get unread message count
- ` show /api/messages/:messageId` - Delete a message

### Users
- `GET /api/users/:username` - Get user by username
- `GET /api/users/id/:userId` - Get user by ID
- `PUT /api/users/profile/update` - Update user profile
- `POST /api/users/:userId/follow` - Follow a user
- `POST /api/users/:userId/unfollow` - Unfollow a user

## Usage

### Registering a New User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

### Logging In
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Sending a Message
```bash
curl -X POST http://localhost:5000/api/messages/send \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"recipientId":"USER_ID","content":"Hello!"}'
```

## Project Structure

```
instagram-clone/
├── server/
│   ├── models/
│   │   ├── User.js
│   │   └── Message.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── messages.js
│   │   └── users.js
│   ├── middleware/
│   │   └── auth.js
│   └── index.js
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── MessagesPage.jsx
│   │   │   └── MessagesPage.css
│   │   ├── api.js
│   │   ├── App.jsx
│   │   └── App.css
│   └── package.json
├── .env.example
└── package.json
```

## Future Enhancements

- [ ]show Real-time messaging with Socket.io
- [ ] show Photo sharing and uploads
- [ ]show Stories functionality
- [ ]show Notifications system
- [ ] show Comments and likes on posts
- [ ] show Search functionality
- [ ] show Dark mode
- [ ]show Video calling

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the ISC License.

## Author

**kainkain55-creator**

---

Made with ❤️ by kainkain55-creator
