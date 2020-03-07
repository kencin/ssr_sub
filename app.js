const express = require('express'),
    app = express(),
    port = process.env.PORT || 8081,
    routes = require('./api/routes/subRoute'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    fs = require("fs"),
    path = require("path");

let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
morgan.token('localDate',function getDate(req) {
    let date = new Date();
    return date.toLocaleString()
});
morgan.format('combined', ':remote-addr - :remote-user [:localDate] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"');

app.use(morgan('combined', {stream: accessLogStream}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
routes(app);
const server = app.listen(port,'0.0.0.0',function () {

    let host = server.address().address;
    let port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

});







