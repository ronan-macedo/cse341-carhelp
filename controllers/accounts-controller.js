require("dotenv").config();
const bcrypt = require('bcryptjs');
const authCookie = require('jsonwebtoken');
const accountsModel = require('../models/accounts-model');
const accountsController = {};

accountsController.register = async (req, res) => {
    try {
        const account = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        };

        await accountsModel.registerAccount(account);

        res.status(201).json();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

accountsController.login = async (req, res) => {
    try {
        const loginRequest = {
            email: req.body.email,
            password: req.body.password
        };

        const account = await accountsModel.getAccountByEmail(loginRequest.email);

        if (!account) {
            res.status(400).json({ error: "Check your credentials and try again." });
        }

        if (await bcrypt.compare(loginRequest.password, account.password)) {
            delete account.password;
            const accessToken = authCookie.sign(account, process.env.SECRET, { expiresIn: 3600 * 1000 });
            res.cookie("authCookie", accessToken, { httpOnly: true, maxAge: 3600 * 1000 });
            return res.status(200).json({ message: "Logged in!" });
        }

        res.status(400).json({ error: "Check your credentials and try again." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

accountsController.logout = async (req, res) => {
    res.clearCookie("authCookie");
    res.status(200).json({ message: "Logout!" });
}

module.exports = accountsController;