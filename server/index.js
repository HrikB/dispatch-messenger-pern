"use strict";
exports.__esModule = true;
var express_1 = require("express");
var next_1 = require("next");
var dotenv_1 = require("dotenv");
dotenv_1["default"].config;
var port = process.env.PORT || 3000;
var dev = process.env.NODE_ENV !== "production";
var app = (0, next_1["default"])({ dir: ".", dev: dev });
var handle = app.getRequestHandler();
app.prepare().then(function () {
    var server = (0, express_1["default"])();
    server.all("*", function (req, res) {
        return handle(req, res);
    });
    server.listen(port, function () {
        console.log("> Ready on http://localhost:".concat(port));
    });
});
