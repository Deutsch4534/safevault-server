let express = require("express"),
    methodOverride = require("method-override"),
    app = express(),
    cors = require('cors'),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

let issuerRoutes = require('./routes/issuer');
// App Config

mongoose.connect("mongodb://endorx123:123456A@ds151049.mlab.com:51049/endorx");

app.use(bodyParser.json({extended: true}));
app.use(cors());
app.use(methodOverride("_method"));


app.use('/issuer', issuerRoutes);


const port = process.env.PORT || 7001;
app.listen(port);

console.log(`Endorx Server listening on ${port}`);

module.exports.app = app;