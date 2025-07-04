const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_JWT;
const User = require("../models/user.model");

const authMiddleware = async ( req, res, next ) => {

    if(req.headers.authorization && (req.headers.authorization).startsWith("Bearer")){
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, secret);

            // console.log(decoded, "decoded");
            const user = await User.findById(decoded.id).select("-password");
            req.user = user;
            next();
    
        } catch (e) {
            return res.status(400).json({
                message: e.message
            })
        }

    } else {
        return res.status(401).json({
            message: "Unauthorized Access"
        })
    }
}

module.exports = authMiddleware;