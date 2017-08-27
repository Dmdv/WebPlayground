"use strict";

function showHello(e, t) {
    document.getElementById(e).innerText = greet_1.sayHello(t), $("textarea#text").val("This is typed from jquery");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var $ = require("jquery"), greet_1 = require("./greet");

showHello("greeting", "TypeScript Dmitry ''");