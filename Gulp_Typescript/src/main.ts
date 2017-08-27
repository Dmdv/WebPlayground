import * as $ from "jquery";
import { sayHello } from "./greet";

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = sayHello(name);
    console.log($(divName));
}

showHello("greeting", "TypeScript Dmitry ''");