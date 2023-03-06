const mongoose  = require("mongoose");
const { Schema } = require('mongoose');

const paymentsSchema = new Schema({
    number: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    nip: {
        type: Number,
        required: true
    },
    vality: {
        type: Date,
        required: true,
    },
    expiration: {
        type: Date,
        required: true,
    },
    idUser: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'active'
    }

})

const Payments = mongoose.model('payments', paymentsSchema)

module.exports = Payments;