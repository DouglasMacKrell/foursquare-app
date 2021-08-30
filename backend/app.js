var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("dotenv").config();

var venuesRouter = require('./routes/venues')

var app = express();

var cors = require("cors");
app.use(cors());

const port = Number(process.env.PORT) || 4004;

const http = require("http");
const server = http.createServer(app);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../frontend/build')));


app.use('/api/venues', venuesRouter)

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

server.listen(port, () => console.log(`Server is running on port ${port}`));

module.exports = app;
