"use strict";

function showHello(e, t) {
    document.getElementById(e).innerText = greet_1.sayHello(t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var greet_1 = require("./greet");

showHello("greeting", "TypeScript Dmitry ''");