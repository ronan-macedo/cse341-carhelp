const connection = require('../database/connection').getConnection;
const autorescuesModel = {};
const autorescuesCollection = connection().collection('autorescues');

autorescuesModel.getAllAutorescues = async () => {
    return await autorescuesCollection.find().toArray();
}

autorescuesModel.getAutorescue = async (id) => {
    return await autorescuesCollection.findOne({ _id: id });
}

autorescuesModel.createAutorescue = async (autorescue) => {
    return await autorescuesCollection.insertOne(autorescue);
}

autorescuesModel.updateAutorescue = async (id, autorescue) => {
    return await autorescuesCollection.replaceOne({ _id: id }, autorescue);
}

autorescuesModel.deleteAutorescue = async (id) => {
    return await autorescuesCollection.deleteOne({ _id: id }, true);
}

module.exports = autorescuesModel;