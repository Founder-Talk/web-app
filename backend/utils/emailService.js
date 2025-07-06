const nodemailer = require('nodemailer');

// Create transporter (you'll need to configure this with your email service)
const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail', // or your preferred email service
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });
};

// Send email verification (OTP)
const sendVerificationEmail = async (email, otp, name) => {
    try {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
            console.error('Email configuration missing. Please set EMAIL_USER and EMAIL_PASSWORD environment variables.');
            return false;
        }
        const transporter = createTransporter();
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your FoundersTalk Email Verification OTP',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 10px; text-align: center;">
                        <h2 style="color: #333; margin-bottom: 20px;">Welcome to FoundersTalk!</h2>
                        <p style="font-size: 16px; color: #666; margin-bottom: 20px;">Hi ${name},</p>
                        <p style="font-size: 16px; color: #666; margin-bottom: 30px;">Your email verification OTP is:</p>
                        <div style="font-size: 2.5rem; font-weight: bold; color: #007bff; margin: 20px 0; letter-spacing: 8px;">${otp}</div>
                        <p style="font-size: 14px; color: #999; margin-top: 30px;">This OTP will expire in 15 minutes.</p>
                        <p style="font-size: 14px; color: #999;">Best regards,<br>The FoundersTalk Team</p>
                    </div>
                </div>
            `
        };
        const result = await transporter.sendMail(mailOptions);
        console.log('Verification OTP sent successfully to:', email);
        return true;
    } catch (error) {
        console.error('Email sending failed:', error);
        return false;
    }
};

// Send session notification
const sendSessionNotification = async (email, name, sessionDetails, type) => {
    try {
        const transporter = createTransporter();
        
        let subject, message;
        
        switch (type) {
            case 'request':
                subject = 'New Session Request - Mentorship Platform';
                message = `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #333;">New Session Request</h2>
                        <p>Hi ${name},</p>
                        <p>You have received a new session request:</p>
                        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
                            <p><strong>Title:</strong> ${sessionDetails.title}</p>
                            <p><strong>Date:</strong> ${new Date(sessionDetails.scheduledDate).toLocaleDateString()}</p>
                            <p><strong>Time:</strong> ${new Date(sessionDetails.scheduledDate).toLocaleTimeString()}</p>
                            <p><strong>Duration:</strong> ${sessionDetails.duration} minutes</p>
                            ${sessionDetails.description ? `<p><strong>Description:</strong> ${sessionDetails.description}</p>` : ''}
                        </div>
                        <p>Please log in to your dashboard to accept or reject this request.</p>
                        <p>Best regards,<br>The Mentorship Platform Team</p>
                    </div>
                `;
                break;
                
            case 'accepted':
                subject = 'Session Request Accepted - Mentorship Platform';
                message = `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #333;">Session Request Accepted!</h2>
                        <p>Hi ${name},</p>
                        <p>Great news! Your session request has been accepted:</p>
                        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
                            <p><strong>Title:</strong> ${sessionDetails.title}</p>
                            <p><strong>Date:</strong> ${new Date(sessionDetails.scheduledDate).toLocaleDateString()}</p>
                            <p><strong>Time:</strong> ${new Date(sessionDetails.scheduledDate).toLocaleTimeString()}</p>
                            <p><strong>Duration:</strong> ${sessionDetails.duration} minutes</p>
                        </div>
                        <p>Please log in to your dashboard to join the session when it's time.</p>
                        <p>Best regards,<br>The Mentorship Platform Team</p>
                    </div>
                `;
                break;
                
            case 'rejected':
                subject = 'Session Request Update - Mentorship Platform';
                message = `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #333;">Session Request Update</h2>
                        <p>Hi ${name},</p>
                        <p>Your session request has been declined:</p>
                        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
                            <p><strong>Title:</strong> ${sessionDetails.title}</p>
                            <p><strong>Date:</strong> ${new Date(sessionDetails.scheduledDate).toLocaleDateString()}</p>
                            ${sessionDetails.cancellationReason ? `<p><strong>Reason:</strong> ${sessionDetails.cancellationReason}</p>` : ''}
                        </div>
                        <p>Don't worry! You can request sessions with other mentors on our platform.</p>
                        <p>Best regards,<br>The Mentorship Platform Team</p>
                    </div>
                `;
                break;
                
            default:
                return false;
        }
        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            html: message
        };

        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Email sending failed:', error);
        return false;
    }
};

module.exports = {
    sendVerificationEmail,
    sendSessionNotification
}; 