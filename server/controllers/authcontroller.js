const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");
const userModel = require("../models/user");
console.log(userModel)

module.exports.registeruser = async function (req, res) {
    try {
        
        let { email, password, name } = req.body;
       
        let user = await userModel.findOne({ email: email });
        
        if (user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (error, hash) {
                if (error) {
                    return res.send(error.message);
                } else {
                    let user = await userModel.create({
                        email,
                        password: hash,
                        name,
                    });

                    let token = generateToken(user);
                    res.cookie("token", token);
                    return res.status(201).json({
                        success: true,
                        message: "User registered successfully",
                        user,
                        token
                    });

                }
            });
        });
    }
    catch (err) {
       
        res.status(500).json({
            message: err.message
        });
    }
}
module.exports.loginUser = async function (req, res) {
    let { email, password } = req.body;

    let user = await userModel.findOne({ email: email });
    if (!user) return res.status(401).json({
        success: false,
        message: "Email or Password is incorrect",
    });

    bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
            let token = generateToken(user);
            res.cookie('token', token);
            return res.status(200).json({
                success: true,
                message: "Login successful",
                token,
                user,
            });
        }
        else {
            return res.status(401).json({
        success: false,
        message: "Email or Password is incorrect",
    });
        }
    })
};