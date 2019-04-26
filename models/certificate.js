const mongoose = require('mongoose');

certificateSchema = new mongoose.Schema({
    achievement_title : String,
    blockstack_id: String,
    event_name : String,
    issue_date: String,
    issuer_name: String,
    receiver_name: String,
    team_name : String
});

module.exports = mongoose.model("Certificate", certificateSchema);
