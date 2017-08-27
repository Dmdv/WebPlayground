"use strict";

function showHello(e, r) {
    document.getElementById(e).innerText = greet_1.sayHello(r), console.log($(e));
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var $ = require("jquery"), greet_1 = require("./greet");

showHello("greeting", "TypeScript Dmitry ''");