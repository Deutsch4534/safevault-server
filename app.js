let express = require("express"),
    methodOverride = require("method-override"),
    app = express(),
    cors = require('cors'),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

let userRoutes = require('./routes/user');
// App Config

mongoose.connect("mongodb://safevault-user:user123@ds062178.mlab.com:62178/safevault");

app.use(bodyParser.json({extended: true , limit : '50mb'} ));
app.use(cors());
app.use(methodOverride("_method"));


app.use('/user', userRoutes);


const port = process.env.PORT || 7001;
app.listen(port);

console.log(`SafeVault Server listening on ${port}`);

module.exports.app = app;
