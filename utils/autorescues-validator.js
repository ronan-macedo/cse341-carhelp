const { body, param, validationResult } = require("express-validator");
const validate = {};

validate.autorescueIdValidationRules = () => {
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

validate.createAutorescueValidationRules = () => {
    return [
        body("vehicleWeight")
            .trim()
            .notEmpty()
            .withMessage("vehicleWeight is required")
            .custom(async (vehicleWeight) => {
                const vehicleWeightNumb = parseInt(vehicleWeight);
                if (vehicleWeightNumb < 1000 || vehicleWeightNumb > 100000) {
                    throw new Error("vehicleWeight should be between 1,000 and 100,000 pounds.");
                }
            }),

        body("vehicleDepth")
            .trim()
            .notEmpty()
            .withMessage("vehicleDepth is required")
            .custom(async (vehicleDepth) => {
                const vehicleDepthNumb = parseInt(vehicleDepth);
                if (vehicleDepthNumb < 1 || vehicleDepthNumb > 40) {
                    throw new Error("vehicleWeight should be between 1 and 40 yards.");
                }
            }),

        body("vehicleWidth")
            .trim()
            .notEmpty()
            .withMessage("vehicleWidth is required")
            .custom(async (vehicleWidth) => {
                const vehicleWidthNumb = parseInt(vehicleWidth);
                if (vehicleWidthNumb < 1 || vehicleWidthNumb > 6) {
                    throw new Error("vehicleWidth should be between 1 and 6 yards.");
                }
            }),

        body("vehicleHeight")
            .trim()
            .notEmpty()
            .withMessage("vehicleHeight is required")
            .custom(async (vehicleHeight) => {
                const vehicleHeightNumb = parseInt(vehicleHeight);
                if (vehicleHeightNumb < 1 || vehicleHeightNumb > 8) {
                    throw new Error("vehicleWidth should be between 1 and 8 yards.");
                }
            }),

        body("vehicleModel")
            .trim()
            .notEmpty()
            .withMessage("vehicleModel is required")
            .isLength({ min: 2, max: 50 })
            .withMessage("vehicleModel should between 2 and 50 characters."),

        body("vehicleYear")
            .trim()
            .notEmpty()
            .withMessage("vehicleYear is required")
            .custom(async (vehicleYear) => {
                const vehicleYearNumb = parseInt(vehicleYear);
                if (vehicleYearNumb < 1900) {
                    throw new Error("vehicleYear should be between 1900 or more.");
                }
            }),

        body("distance")
            .trim()
            .notEmpty()
            .withMessage("distance is required")
            .custom(async (distance) => {
                const distanceNumb = parseInt(distance);
                if (distanceNumb < 1 || distanceNumb > 1000) {
                    throw new Error("vehicleWidth should be between 1 and 1000 miles.");
                }
            }),
    ]
}

validate.updateAutorescueValidationRules = () => {
    return [
        param("id")
            .trim()
            .notEmpty()
            .withMessage("Id is required.")
            .isAlphanumeric()
            .withMessage("Id does not have any special character.")
            .isLength({ min: 24, max: 24 })
            .withMessage("Id should have 24 characters."),

        body("vehicleWeight")
            .trim()
            .notEmpty()
            .withMessage("vehicleWeight is required")
            .custom(async (vehicleWeight) => {
                const vehicleWeightNumb = parseInt(vehicleWeight);
                if (vehicleWeightNumb < 1000 || vehicleWeightNumb > 100000) {
                    throw new Error("vehicleWeight should be between 1,000 and 100,000 pounds.");
                }
            }),

        body("vehicleDepth")
            .trim()
            .notEmpty()
            .withMessage("vehicleDepth is required")
            .custom(async (vehicleDepth) => {
                const vehicleDepthNumb = parseInt(vehicleDepth);
                if (vehicleDepthNumb < 1 || vehicleDepthNumb > 40) {
                    throw new Error("vehicleWeight should be between 1 and 40 yards.");
                }
            }),

        body("vehicleWidth")
            .trim()
            .notEmpty()
            .withMessage("vehicleWidth is required")
            .custom(async (vehicleWidth) => {
                const vehicleWidthNumb = parseInt(vehicleWidth);
                if (vehicleWidthNumb < 1 || vehicleWidthNumb > 6) {
                    throw new Error("vehicleWidth should be between 1 and 6 yards.");
                }
            }),

        body("vehicleHeight")
            .trim()
            .notEmpty()
            .withMessage("vehicleHeight is required")
            .custom(async (vehicleHeight) => {
                const vehicleHeightNumb = parseInt(vehicleHeight);
                if (vehicleHeightNumb < 1 || vehicleHeightNumb > 8) {
                    throw new Error("vehicleWidth should be between 1 and 8 yards.");
                }
            }),

        body("vehicleModel")
            .trim()
            .notEmpty()
            .withMessage("vehicleModel is required")
            .isLength({ min: 2, max: 50 })
            .withMessage("vehicleModel should between 2 and 50 characters."),

        body("vehicleYear")
            .trim()
            .notEmpty()
            .withMessage("vehicleYear is required")
            .custom(async (vehicleYear) => {
                const vehicleYearNumb = parseInt(vehicleYear);
                if (vehicleYearNumb < 1900) {
                    throw new Error("vehicleYear should be between 1900 or more.");
                }
            }),

        body("distance")
            .trim()
            .notEmpty()
            .withMessage("distance is required")
            .custom(async (distance) => {
                const distanceNumb = parseInt(distance);
                if (distanceNumb < 1 || distanceNumb > 1000) {
                    throw new Error("vehicleWidth should be between 1 and 1000 miles.");
                }
            }),
    ]
}

validate.checkAutorescue = async (req, res, next) => {
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