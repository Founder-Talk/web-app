const jwt = require("jsonwebtoken");

const generateToken = (_id, email) =>{
    return jwt.sign({ id: _id, email: email }, process.env.SECRET_JWT , { expiresIn: '30d' });
}

module.exports = generateToken;