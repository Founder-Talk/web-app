const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Session = require('../models/session.model');

let io;

const initializeSocket = (server) => {
    io = socketIo(server, {
        cors: {
            origin: process.env.FRONTEND_URL || "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    // Authentication middleware
    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.auth.token;
            if (!token) {
                return next(new Error('Authentication error'));
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id).select('-password');
            
            if (!user) {
                return next(new Error('User not found'));
            }

            socket.user = user;
            next();
        } catch (error) {
            next(new Error('Authentication error'));
        }
    });

    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.user.name} (${socket.user._id})`);

        // Join user's personal room
        socket.join(`user_${socket.user._id}`);

        // Join session room if provided
        socket.on('join_session', async (sessionId) => {
            try {
                const session = await Session.findOne({
                    _id: sessionId,
                    $or: [{ mentor: socket.user._id }, { mentee: socket.user._id }],
                    status: { $in: ['accepted', 'completed'] }
                });

                if (session) {
                    socket.join(`session_${sessionId}`);
                    socket.sessionId = sessionId;
                    console.log(`User ${socket.user.name} joined session ${sessionId}`);
                }
            } catch (error) {
                console.error('Error joining session:', error);
            }
        });

        // Handle new message
        socket.on('send_message', async (data) => {
            try {
                const { sessionId, content, messageType = 'text', fileUrl } = data;

                // Verify user is part of the session
                const session = await Session.findOne({
                    _id: sessionId,
                    $or: [{ mentor: socket.user._id }, { mentee: socket.user._id }],
                    status: { $in: ['accepted', 'completed'] }
                });

                if (!session) {
                    socket.emit('error', { message: 'Session not found or not accessible' });
                    return;
                }

                // Determine receiver
                const receiver = session.mentor.toString() === socket.user._id ? session.mentee : session.mentor;

                // Save message to database
                const Message = require('../models/message.model');
                const message = await Message.create({
                    session: sessionId,
                    sender: socket.user._id,
                    receiver,
                    content,
                    messageType,
                    fileUrl
                });

                const populatedMessage = await Message.findById(message._id)
                    .populate('sender', 'name profilePic')
                    .populate('receiver', 'name profilePic');

                // Emit message to session room
                io.to(`session_${sessionId}`).emit('new_message', populatedMessage);

                // Emit notification to receiver's personal room
                socket.to(`user_${receiver}`).emit('message_notification', {
                    sessionId,
                    sender: socket.user.name,
                    preview: content.substring(0, 50) + (content.length > 50 ? '...' : '')
                });

            } catch (error) {
                console.error('Error sending message:', error);
                socket.emit('error', { message: 'Failed to send message' });
            }
        });

        // Handle typing indicator
        socket.on('typing_start', (sessionId) => {
            socket.to(`session_${sessionId}`).emit('user_typing', {
                userId: socket.user._id,
                userName: socket.user.name
            });
        });

        socket.on('typing_stop', (sessionId) => {
            socket.to(`session_${sessionId}`).emit('user_stop_typing', {
                userId: socket.user._id
            });
        });

        // Handle session status updates
        socket.on('session_status_update', async (data) => {
            try {
                const { sessionId, status } = data;
                
                const session = await Session.findOne({
                    _id: sessionId,
                    $or: [{ mentor: socket.user._id }, { mentee: socket.user._id }]
                });

                if (session) {
                    // Notify all users in the session
                    io.to(`session_${sessionId}`).emit('session_status_changed', {
                        sessionId,
                        status,
                        updatedBy: socket.user._id
                    });
                }
            } catch (error) {
                console.error('Error updating session status:', error);
            }
        });

        // Handle disconnect
        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.user.name} (${socket.user._id})`);
        });
    });

    return io;
};

const getIO = () => {
    if (!io) {
        throw new Error('Socket.io not initialized');
    }
    return io;
};

module.exports = {
    initializeSocket,
    getIO
}; 