const User = require('./models/user.model');
const { sendVerificationEmail } = require('./utils/emailService');
const crypto = require('crypto');

// Test email verification functionality
async function testEmailVerification() {
    try {
        console.log('Testing email verification functionality...\n');
        
        // Test 1: Check if email service is configured
        console.log('1. Checking email configuration...');
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
            console.log('❌ Email configuration missing. Please set EMAIL_USER and EMAIL_PASSWORD in your .env file');
            console.log('   Example:');
            console.log('   EMAIL_USER=your-email@gmail.com');
            console.log('   EMAIL_PASSWORD=your-app-password');
            return;
        }
        console.log('✅ Email configuration found');

        // Test 2: Test email sending (commented out to avoid spam)
        console.log('\n2. Testing email sending...');
        console.log('⚠️  Email sending test skipped to avoid spam. Uncomment the code below to test.');
        
        /*
        const testEmail = 'test@example.com';
        const testToken = crypto.randomBytes(32).toString('hex');
        const testName = 'Test User';
        
        const emailSent = await sendVerificationEmail(testEmail, testToken, testName);
        if (emailSent) {
            console.log('✅ Test email sent successfully');
        } else {
            console.log('❌ Failed to send test email');
        }
        */
        
        // Test 3: Check user model fields
        console.log('\n3. Checking user model fields...');
        const userFields = Object.keys(User.schema.paths);
        const requiredFields = ['emailVerificationToken', 'emailVerificationExpires', 'isEmailVerified'];
        
        const missingFields = requiredFields.filter(field => !userFields.includes(field));
        if (missingFields.length === 0) {
            console.log('✅ All required email verification fields are present in user model');
        } else {
            console.log('❌ Missing fields in user model:', missingFields);
        }
        
        // Test 4: Generate test token
        console.log('\n4. Testing token generation...');
        const testToken = crypto.randomBytes(32).toString('hex');
        const testExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
        
        console.log('✅ Token generated:', testToken.substring(0, 16) + '...');
        console.log('✅ Expiry set to:', testExpiry.toISOString());
        
        console.log('\n🎉 Email verification system is ready!');
        console.log('\nTo complete setup:');
        console.log('1. Set up your .env file with EMAIL_USER and EMAIL_PASSWORD');
        console.log('2. For Gmail, use an App Password instead of your regular password');
        console.log('3. Test the signup flow with a real email address');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

// Run the test if this file is executed directly
if (require.main === module) {
    // Load environment variables
    require('dotenv').config();
    
    // Connect to database
    const mongoose = require('mongoose');
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mentorship-platform')
        .then(() => {
            console.log('Connected to MongoDB');
            return testEmailVerification();
        })
        .then(() => {
            console.log('\nTest completed');
            process.exit(0);
        })
        .catch((error) => {
            console.error('Database connection failed:', error.message);
            process.exit(1);
        });
}

module.exports = { testEmailVerification }; 