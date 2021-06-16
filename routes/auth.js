var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//middleware
const verifyToken = require("../middleware/verify-token");

//models
const user = require("../models/user");


//user login
router.post("/user/login", async function (req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            res.status(400).json({
                message: "failed",
                additional_info: "invalid email or password"
            });
        } else if (await bcrypt.compare(req.body.password, user.password)) {
            jwt.sign(
                { user_id: user._id },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "1d" },
                (err, token) => {
                    if (err) {
                        res.status(403).json(err);
                    } else {
                        res.status(200).json({ token: token, userType: user.user_type ,username: user.name ,userInfo:user });
                    }
                }
            );
        } else {
            res.status(403).json({
                message: "failed",
                additional_info: "invalid email or password"
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
});


//student login
router.post("/student/login", async function (req, res) {
    try {
        const user = await User.findOne({ admission_no: req.body.admission_no });

        if (!user) {
            res.status(400).json({
                message: "failed",
                additional_info: "invalid admission number or password"
            });
        } else if (await bcrypt.compare(req.body.password, user.password)) {
            jwt.sign(
                { user_id: user._id },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "1d" },
                (err, token) => {
                    if (err) {
                        res.status(403).json(err);
                    } else {
                        res.status(200).json({ token: token, userInfo:user });
                    }
                }
            );
        } else {
            res.status(403).json({
                message: "failed",
                additional_info: "invalid email or password"
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
});

//user check auth
router.post("/team/check", verifyToken, function (req, res) {
    if (!req.auth) {
        res.status(403).json({ error: err });
    } else {
        res
            .status(200)
            .json({ message: "success", additional_info: "the authToken is valid" });
    }
});


module.exports = router;