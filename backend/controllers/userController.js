const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const { z } = require("zod");
const generateToken = require("../utils/generateToken");
const saltRounds = 10;

/* Signup and Signin Controllers */
const userSignup = async (req, res) => {
    try {
        /* Zod Validation */
        const schema = (z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string().min(6)
        })).strict(); // Disallow unknown keys

        const { success, error, data } = schema.safeParse(req.body);
        if (error || !success) {
            return res.status(400).json({
                message: "Invalid Credentials",
                data
            });
        }
        const { name, email, password } = data;
        const user = await User.find({ email });

        if (user.length > 0) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        const createdUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            _id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            token: generateToken(createdUser._id, createdUser.email)
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

const userSignin = async (req, res) => {
    try {
        /* Zod Validation */
        const schema = (z.object({
            email: z.string().email(),
            password: z.string().min(6)
        })).strict(); // Disallow unknown keys

        const { success, data, error } = schema.safeParse(req.body);
        if (error || !success) {
            return res.status(400).json({
                message: "Invalid Credentials"
            });
        }

        const { email, password } = data;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User doesn't exist"
            });
        }


        const result = await bcrypt.compare(password, user.password);
        if (!result) {
            return res.status(401).json({
                message: "Wrong password"
            });
        } else {
            const token = generateToken(user._id, user.email);
            /*             
            Note: 
            If you’re building a traditional web app with server - rendered pages(e.g., EJS, Express), use cookies(res.cookie("token", token)) with HttpOnly, Secure, and SameSite = Strict for better security.
            If you’re building a REST API or SPA(e.g., React, Angular, Vue), use the Authorization header(req.headers.authorization = Bearer ${ token }) for flexibility and CORS compatibility. 
            */

            // res.cookie("token", token); 
            // req.headers.authorization = `Bearer ${token}`;  /* To be done in React.js; not here. */
            // console.log(req.headers.authorization);         /* NEVER PASS IT HERE */

            return res.status(200).json({
                _id: user._id,
                email: user.email,
                token: token
            });
        }

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

const logout = (req, res) => {
    try {
        // Clear the token from the client side
        // res.clearCookie("token"); // If using cookies
        
        return res.status(200).json({
            message: "Logged out successfully. Please remove the token from client storage."
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

module.exports = {
    userSignin,
    userSignup,
    logout
}