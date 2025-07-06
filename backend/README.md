# Mentorship Platform Backend API

A comprehensive backend API for a mentorship and startup consultation platform built with Node.js, Express, and MongoDB.

## Features

### 🔐 Authentication & User Management
- User registration and login (Mentee/Mentor)
- JWT-based authentication
- Role-based access control
- Email verification (optional)
- Profile management

### 👥 User Profiles
- **Mentee Profiles**: Bio, education, goals, areas of interest
- **Mentor Profiles**: Domain expertise, experience, LinkedIn, hourly rate, availability
- Profile picture support
- Subscription plans (Free/Pro)

### 🎯 Session Management
- Create session requests
- Accept/reject session requests
- Session scheduling with availability
- Session status tracking (pending, accepted, completed, cancelled)
- Session feedback and ratings

### 💬 Real-time Chat
- Socket.io integration for real-time messaging
- Message history
- Typing indicators
- File and image sharing support
- Read receipts

### 📊 Admin Dashboard
- Mentor verification system
- Platform statistics
- User management
- Session monitoring
- Admin-only operations

### 🔍 Search & Discovery
- Mentor search with filters
- Expertise-based filtering
- Rating and price filtering
- Pagination support

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Real-time**: Socket.io
- **Email**: Nodemailer
- **Validation**: Zod
- **Password Hashing**: bcrypt

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/mentorship-platform
   JWT_SECRET=your-super-secret-jwt-key
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## API Endpoints

### Authentication

#### POST `/user/signup`
Register a new user (mentee or mentor)
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "mentee"
}
```

#### POST `/user/signin`
Login user
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### POST `/user/logout`
Logout user

### User Management

#### GET `/user/profile`
Get current user profile (requires auth)

#### PUT `/user/profile`
Update user profile (requires auth)
```json
{
  "name": "John Doe",
  "bio": "Experienced software engineer",
  "education": "Computer Science",
  "goals": "Learn advanced React",
  "areasOfInterest": ["Web Development", "React"],
  "domainExpertise": ["JavaScript", "React", "Node.js"],
  "linkedinProfile": "https://linkedin.com/in/johndoe",
  "hourlyRate": 50,
  "availability": [
    {
      "day": "monday",
      "slots": [
        {"startTime": "09:00", "endTime": "12:00"},
        {"startTime": "14:00", "endTime": "17:00"}
      ]
    }
  ]
}
```

#### PUT `/user/subscription`
Update subscription plan (requires auth)
```json
{
  "subscriptionPlan": "pro"
}
```

### Mentor Discovery

#### GET `/user/mentors`
Get all verified mentors with filters
```
Query Parameters:
- search: Search by name or bio
- expertise: Filter by expertise
- minRating: Minimum rating filter
- maxRate: Maximum hourly rate filter
- page: Page number (default: 1)
- limit: Items per page (default: 10)
```

#### GET `/user/mentors/:mentorId`
Get specific mentor details

### Session Management

#### POST `/session`
Create a new session request (requires auth - mentee only)
```json
{
  "mentorId": "mentor-id",
  "title": "React Best Practices",
  "description": "Learn advanced React patterns",
  "scheduledDate": "2024-01-15T10:00:00Z",
  "duration": 60,
  "sessionType": "video"
}
```

#### GET `/session`
Get user's sessions (requires auth)
```
Query Parameters:
- status: Filter by status (pending, accepted, completed, cancelled)
- page: Page number
- limit: Items per page
```

#### GET `/session/:sessionId`
Get session details (requires auth)

#### PUT `/session/:sessionId/accept`
Accept session request (requires auth - mentor only)

#### PUT `/session/:sessionId/reject`
Reject session request (requires auth - mentor only)
```json
{
  "reason": "Not available at that time"
}
```

#### PUT `/session/:sessionId/complete`
Complete session (requires auth)

#### PUT `/session/:sessionId/cancel`
Cancel session (requires auth)
```json
{
  "reason": "Emergency came up"
}
```

#### POST `/session/:sessionId/feedback`
Add session feedback (requires auth - mentee only)
```json
{
  "rating": 5,
  "feedback": "Great session, learned a lot!"
}
```

### Messaging

#### POST `/message`
Send a message (requires auth)
```json
{
  "sessionId": "session-id",
  "content": "Hello! How are you?",
  "messageType": "text",
  "fileUrl": "optional-file-url"
}
```

#### GET `/message/session/:sessionId`
Get session messages (requires auth)
```
Query Parameters:
- page: Page number
- limit: Items per page
```

#### PUT `/message/session/:sessionId/read`
Mark messages as read (requires auth)

#### GET `/message/session/:sessionId/unread`
Get unread message count (requires auth)

#### DELETE `/message/:messageId`
Delete a message (requires auth - sender only)

### Admin Operations

#### GET `/admin/mentors/pending`
Get pending mentor verifications (requires admin auth)

#### PUT `/admin/mentors/:mentorId/verify`
Verify/unverify a mentor (requires admin auth)
```json
{
  "isVerified": true
}
```

#### GET `/admin/stats`
Get platform statistics (requires admin auth)

#### GET `/admin/users`
Get all users (requires admin auth)
```
Query Parameters:
- role: Filter by role (mentee, mentor, admin)
- page: Page number
- limit: Items per page
```

#### GET `/admin/sessions`
Get all sessions (requires admin auth)
```
Query Parameters:
- status: Filter by status
- page: Page number
- limit: Items per page
```

#### DELETE `/admin/users/:userId`
Delete a user (requires admin auth)

## Socket.io Events

### Client to Server
- `join_session`: Join a session room
- `send_message`: Send a new message
- `typing_start`: Start typing indicator
- `typing_stop`: Stop typing indicator
- `session_status_update`: Update session status

### Server to Client
- `new_message`: New message received
- `message_notification`: Message notification
- `user_typing`: User is typing
- `user_stop_typing`: User stopped typing
- `session_status_changed`: Session status updated
- `error`: Error message

## Database Models

### User Model
- Basic info (name, email, password)
- Role (mentee, mentor, admin)
- Profile fields (bio, education, goals, etc.)
- Mentor-specific fields (expertise, hourly rate, availability)
- Verification and subscription status

### Session Model
- Mentor and mentee references
- Session details (title, description, date, duration)
- Status tracking
- Payment and feedback information

### Message Model
- Session reference
- Sender and receiver
- Message content and type
- Read status

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | No (default: 3000) |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `EMAIL_USER` | Email service username | No |
| `EMAIL_PASSWORD` | Email service password | No |
| `FRONTEND_URL` | Frontend URL for CORS | No |

## Error Handling

The API uses consistent error responses:
```json
{
  "message": "Error description",
  "error": "Detailed error information (optional)"
}
```

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation with Zod
- CORS configuration
- Role-based access control
- Rate limiting (can be added)

## Development

### Running in Development
```bash
npm run dev
```

### Running Tests
```bash
npm test
```

### Code Structure
```
backend/
├── config/
│   └── db.js
├── controllers/
│   ├── userController.js
│   ├── sessionController.js
│   ├── messageController.js
│   └── adminController.js
├── middlewares/
│   └── authMiddleware.js
├── models/
│   ├── user.model.js
│   ├── session.model.js
│   └── message.model.js
├── routes/
│   ├── user.routes.js
│   ├── session.routes.js
│   ├── message.routes.js
│   └── admin.routes.js
├── utils/
│   ├── generateToken.js
│   ├── emailService.js
│   └── socketService.js
├── app.js
└── package.json
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License. 