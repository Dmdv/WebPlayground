import * as $ from "jquery";
import { sayHello } from "./greet";

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = sayHello(name);

    $("textarea#text").val("This is typed from jquery");
}

showHello("greeting", "TypeScript Dmitry ''");