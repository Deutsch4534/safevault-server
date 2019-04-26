const mongoose = require('mongoose');

participantSchema = new mongoose.Schema({
    name : String,
    team_name : String,
    email:  String,
    blockstack_id : String
});

module.exports = mongoose.model("Participant", participantSchema);
