const { body, param, validationResult } = require("express-validator");
const validate = {};

validate.customerIdValidationRules = () => {
    return [
        param("id")
            .trim()
            .notEmpty()
            .withMessage("Id is required.")
            .isAlphanumeric()
            .withMessage("Id does not have any special character.")
            .isLength({ min: 24, max: 24 })
            .withMessage("Id should have 24 characters."),
    ];
}

validate.createCustomerValidationRules = () => {
    return [
        body("firstName")
            .trim()
            .notEmpty()
            .withMessage("firstName is required")
            .isLength({ min: 2, max: 30 })
            .withMessage("firstName should have between 2 and 30 characters."),

        body("lastName")
            .trim()
            .notEmpty()
            .withMessage("lastName is required")
            .isLength({ min: 2, max: 50 })
            .withMessage("lastName should between 2 and 50 characters."),

        body("email")
            .trim()
            .notEmpty()
            .withMessage("email is required")
            .isEmail()
            .withMessage("A valid email is required."),

        body("age")
            .trim()
            .notEmpty()
            .withMessage("age is required")
            .custom(async (age) => {
                const ageNumb = parseInt(age);
                if (ageNumb < 18) {
                    throw new Error("age should be between 18 or more.");
                }
            }),

        body("address.addressFirstLine")
            .trim()
            .notEmpty()
            .withMessage("addressFirstLine is required")
            .isLength({ min: 2, max: 80 })
            .withMessage("addressFirstLine should have between 2 and 80 characters."),

        body("address.addressSecondLine")
            .trim()
            .notEmpty()
            .withMessage("addressSecondLine is required")
            .isLength({ min: 2, max: 60 })
            .withMessage("addressSecondLine should have between 2 and 60 characters."),

        body("address.city")
            .trim()
            .notEmpty()
            .withMessage("city is required")
            .isLength({ min: 2, max: 20 })
            .withMessage("city should have between 2 and 20 characters."),

        body("address.region")
            .trim()
            .notEmpty()
            .withMessage("region is required")
            .isLength({ min: 2, max: 20 })
            .withMessage("region should have between 2 an 20 characters."),
    ]
}

validate.updateCustomerValidationRules = () => {
    return [
        param("id")
            .trim()
            .notEmpty()
            .withMessage("Id is required.")
            .isAlphanumeric()
            .withMessage("Id does not have any special character.")
            .isLength({ min: 24, max: 24 })
            .withMessage("Id should have 24 characters."),

        body("firstName")
            .trim()
            .notEmpty()
            .withMessage("firstName is required")
            .isLength({ min: 2, max: 30 })
            .withMessage("firstName should have between 2 and 30 characters."),

        body("lastName")
            .trim()
            .notEmpty()
            .withMessage("lastName is required")
            .isLength({ min: 2, max: 50 })
            .withMessage("lastName should between 2 and 50 characters."),

        body("email")
            .trim()
            .notEmpty()
            .withMessage("email is required")
            .isEmail()
            .withMessage("A valid email is required."),

        body("age")
            .trim()
            .notEmpty()
            .withMessage("age is required")
            .custom(async (age) => {
                const ageNumb = parseInt(age);
                if (ageNumb < 18) {
                    throw new Error("age should be between 18 or more.");
                }
            }),

        body("address.addressFirstLine")
            .trim()
            .notEmpty()
            .withMessage("addressFirstLine is required")
            .isLength({ min: 2, max: 80 })
            .withMessage("addressFirstLine should have between 2 and 80 characters."),

        body("address.addressSecondLine")
            .trim()
            .notEmpty()
            .withMessage("addressSecondLine is required")
            .isLength({ min: 2, max: 60 })
            .withMessage("addressSecondLine should have between 2 and 60 characters."),

        body("address.city")
            .trim()
            .notEmpty()
            .withMessage("city is required")
            .isLength({ min: 2, max: 20 })
            .withMessage("city should have between 2 and 20 characters."),

        body("address.region")
            .trim()
            .notEmpty()
            .withMessage("region is required")
            .isLength({ min: 2, max: 20 })
            .withMessage("region should have between 2 an 20 characters."),
    ]
}

validate.checkCustomer = async (req, res, next) => {
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