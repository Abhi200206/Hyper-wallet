const jwtpass =require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
        console.log("helo"); 
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, jwtpass);

        req.userId = decoded.userId;

        next();
    } catch (err) {
        return res.status(403).json({msg:"no authorization !!!"});
    }
};

module.exports = {
    authMiddleware
}