const { body, validationResult } = require("express-validator");
const accountsModel = require("../models/accounts-model");
const validate = {};

validate.registationRules = () => {
    return [
        body("firstName")
            .trim()
            .isLength({ min: 1 })
            .withMessage("firstName is required."),

        body("lastName")
            .trim()
            .isLength({ min: 2 })
            .withMessage("lastName is required."),

        body("email")
            .trim()
            .isEmail()
            .normalizeEmail()
            .withMessage("A valid email is required.")
            .custom(async (email) => {
                const emailExists = await accountsModel.getAccountByEmail(email);
                if (emailExists) {
                    throw new Error("Email exists. Please, use a different email.");
                }
            }),

        body("password")
            .trim()
            .isStrongPassword({
                minLength: 12,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            })
            .withMessage("Password does not meet requirements."),
    ];
}

validate.loginRules = () => {
    return [
        body("email")
            .trim()
            .isEmail()
            .normalizeEmail()
            .withMessage("A valid email is required."),

        body("password")
            .trim()
            .isStrongPassword({
                minLength: 12,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            })
            .withMessage("Password does not meet requirements."),
    ];
}

validate.checkAccount = async (req, res, next) => {
    let validationErrors = [];
    validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        let errors = [];

        for (let validationError of validationErrors.array()) {
            errors.push({ error: validationError.msg })
        }

        res.status(400).json({ errors: errors });
        return;
    }
    next();
}

module.exports = validate;