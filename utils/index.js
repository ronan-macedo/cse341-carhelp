const authCookie = require("jsonwebtoken");
require("dotenv").config();
const utils = {};

utils.checkAuthorizationCookie = (req, res, next) => {
    if (req.cookies.authCookie) {
        authCookie.verify(
            req.cookies.authCookie,
            process.env.SECRET,
            (error) => {
                if (error) {
                    res.clearCookie("authCookie");
                    return res.status(401).json({ error: "Expired token, please login again." });
                }
                next();
            });
    } else {
        next();
    }
}

utils.checkLogged = (req, res, next) => {
    if (!req.cookies.authCookie) {
        return res.status(401).json({ error: "Unauthorized." });
    } else {
        authCookie.verify(
            req.cookies.authCookie,
            process.env.SECRET,
            (error) => {
                if (error) {
                    res.clearCookie("authCookie");
                    return res.status(401).json({ error: "Expired token, please login again." });
                }
                next();
            });
    }
}

utils.errorHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

module.exports = utils;