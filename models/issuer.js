const mongoose = require('mongoose');

issuerSchema = new mongoose.Schema({
    uid : String,
    name : String,
    email : String,
    location : String
});

module.exports = mongoose.model("Issuer", issuerSchema);
