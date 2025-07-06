# Email Verification System

This document explains the email verification system implemented for the FoundersTalk platform.

## Overview

The email verification system ensures that users verify their email addresses before they can sign in to the platform. This helps maintain data quality and security.

## Features

- ✅ Email verification on signup
- ✅ Verification token with 24-hour expiry
- ✅ Beautiful HTML email template
- ✅ Resend verification email functionality
- ✅ Email verification status check on signin
- ✅ User-friendly verification page

## How It Works

### 1. User Signup Process

When a user signs up:

1. User submits signup form with email, password, and other details
2. System generates a unique verification token (32 bytes hex)
3. Token is stored in database with 24-hour expiry
4. Verification email is sent to user's email address
5. User account is created but marked as unverified
6. User receives success message asking to check email

### 2. Email Verification Process

When user clicks verification link:

1. User clicks link in email: `http://localhost:3000/user/verify-email?token=abc123...`
2. System validates token and checks expiry
3. If valid, user's email is marked as verified
4. Token is cleared from database
5. User sees success page and can now sign in

### 3. Signin Process

When user tries to sign in:

1. System checks if email is verified
2. If not verified, returns error message
3. If verified, proceeds with normal signin process

## API Endpoints

### Public Routes

- `POST /user/signup` - User registration with email verification
- `POST /user/signin` - User login (requires email verification)
- `GET /user/verify-email/:token` - Verify email with token
- `POST /user/resend-verification` - Resend verification email
- `GET /user/verify-email` - Serve verification page

### Request/Response Examples

#### Signup
```json
POST /user/signup
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "mentee"
}

Response:
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "mentee",
  "isEmailVerified": false,
  "message": "Account created successfully! Please check your email to verify your account."
}
```

#### Signin (Unverified Email)
```json
POST /user/signin
{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "message": "Please verify your email address before signing in. Check your inbox for the verification link.",
  "isEmailVerified": false
}
```

#### Verify Email
```json
GET /user/verify-email/abc123...

Response:
{
  "message": "Email verified successfully! You can now sign in to your account.",
  "isEmailVerified": true
}
```

#### Resend Verification
```json
POST /user/resend-verification
{
  "email": "john@example.com"
}

Response:
{
  "message": "Verification email sent successfully! Please check your inbox."
}
```

## Database Schema

The User model includes these email verification fields:

```javascript
{
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  emailVerificationExpires: Date
}
```

## Environment Variables

Add these to your `.env` file:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Backend URL (for email verification links)
BACKEND_URL=http://localhost:3000
```

## Gmail Setup

To use Gmail for sending emails:

1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use the generated password as `EMAIL_PASSWORD`

## Testing

Run the test script to verify the setup:

```bash
cd backend
node test-email-verification.js
```

## Email Template

The verification email includes:
- Professional design with FoundersTalk branding
- Clear call-to-action button
- Fallback link for manual copy-paste
- 24-hour expiry notice
- Responsive design

## Security Features

- ✅ 32-byte random tokens (cryptographically secure)
- ✅ 24-hour token expiry
- ✅ Tokens are cleared after use
- ✅ Email validation on signup
- ✅ Rate limiting can be added (recommended)

## Frontend Integration

The system works with both API calls and direct browser access:

- **API calls**: Return JSON responses
- **Browser access**: Serve HTML verification page

## Troubleshooting

### Common Issues

1. **Email not sending**
   - Check EMAIL_USER and EMAIL_PASSWORD in .env
   - Verify Gmail App Password is correct
   - Check if 2FA is enabled on Gmail account

2. **Verification link not working**
   - Ensure BACKEND_URL is set correctly
   - Check if token has expired (24 hours)
   - Verify token format in database

3. **User can't sign in after verification**
   - Check if isEmailVerified field is true
   - Verify token was cleared from database

### Debug Commands

```bash
# Check email configuration
node test-email-verification.js

# Check database for verification tokens
db.users.find({emailVerificationToken: {$exists: true}})

# Check verification status
db.users.find({email: "user@example.com"}, {isEmailVerified: 1, emailVerificationToken: 1})
```

## Future Enhancements

- [ ] Rate limiting for email sending
- [ ] Email templates for different languages
- [ ] SMS verification as backup
- [ ] Admin panel to manage verification status
- [ ] Bulk email verification for existing users 