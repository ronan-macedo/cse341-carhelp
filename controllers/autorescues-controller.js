const autorescuesModel = require('../models/autorescues-model');
const objectId = require('mongodb').ObjectId;
const autorescuesController = {};

autorescuesController.getAllAutorescues = async (req, res) => {
    try {
        const autorescues = await autorescuesModel.getAllAutorescues();
        res.status(200).json(autorescues);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

autorescuesController.getAutorescue = async (req, res) => {
    try {
        const id = new objectId(req.params.id);
        const autorescue = await autorescuesModel.getAutorescue(id);

        if (!autorescue) {
            res.status(404).json({ error: "Auto rescue not found!" });
            return;
        }

        res.status(200).json(autorescue);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

autorescuesController.createAutorescue = async (req, res) => {
    try {
        const autorescue = {
            vehicleWeight: req.body.vehicleWeight,
            vehicleDepth: req.body.vehicleDepth,
            vehicleWidth: req.body.vehicleWidth,
            vehicleHeight: req.body.vehicleHeight,
            vehicleModel: req.body.vehicleModel,
            vehicleYear: req.body.vehicleYear,
            distance: req.body.distance,
        };
        const response = await autorescuesModel.createAutorescue(autorescue);

        if (response.acknowledged) {
            res.status(201).send();
            return;
        }

        res.status(400).json({ error: "Error while creating new auto rescue!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

autorescuesController.updateAutorescue = async (req, res) => {
    try {
        const autorescueId = new objectId(req.params.id);
        const autorescue = {
            vehicleWeight: req.body.vehicleWeight,
            vehicleDepth: req.body.vehicleDepth,
            vehicleWidth: req.body.vehicleWidth,
            vehicleHeight: req.body.vehicleHeight,
            vehicleModel: req.body.vehicleModel,
            vehicleYear: req.body.vehicleYear,
            distance: req.body.distance,
        };
        const response = await autorescuesModel.updateAutorescue(autorescueId, autorescue);

        if (response.matchedCount > 0) {
            res.status(200).send();
            return;
        }

        res.status(400).json({ error: "Error while updating a auto rescue!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

autorescuesController.deleteAutorescue = async (req, res) => {
    try {
        const autorescueId = new objectId(req.params.id);
        const response = await autorescuesModel.deleteAutorescue(autorescueId);

        if (response.deletedCount > 0) {
            res.status(204).send();
            return;
        }

        res.status(400).json({ message: "Error while deleting a auto rescue!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = autorescuesController;