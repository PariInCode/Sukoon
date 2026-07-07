const jwt = require("jsonwebtoken")

module.exports = async function (req, res, next) {
    try {
        let token = req.cookies.token;
        if (!token && req.headers.authorization) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Accesss denied pls log in",

            });
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded;

        next()
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token.",
        });
    }
};