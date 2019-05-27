const mongoose = require('mongoose');

fileSchema = new mongoose.Schema({
    file_hash : String,
    file_name : String,
    date_of_creation : String
});

module.exports = mongoose.model("File", fileSchema);
