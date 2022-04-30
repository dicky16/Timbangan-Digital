const { Schema, model } = require("mongoose");
const scheme = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    kandang: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    actualTemperature: {
        type: Number,
        default: 0
    },
    idealTemperature: {
        type: Number,
        default: 0
    },
    humidity: {
        type: Number,
        default: 0
    },
    calibrationTemperature: {
        type: Number,
        default: 0
    },
    mode: {
        type: String,
        default: "manual"
    },
    autoMCC: {
        type: String,
        default: "off"
    },
    day: {
        type: Number,
        default: 0
    },
    connected: {
        type: Boolean,
        default: false
    },
    wifiStatus: {
        type: Boolean,
        default: false
    },
    warning: {
        type: String,
        default: ""
    }
}, {timestamps: true, versionKey: false})
module.exports = model('Flock', scheme, 'flock')