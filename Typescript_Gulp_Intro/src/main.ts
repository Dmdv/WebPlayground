import { Observable } from '@reactivex/rxjs';
import * as $ from "jquery";
import { sayHello } from "./greet";

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = sayHello(name);

    $("textarea#text").val("This is typed from jquery");

	var obs = Observable.interval(500)
	   //.take(5)
	   .do(i => console.log(i) )
	   //.do(function (x) { console.log(x); })
	   .subscribe();

    Observable.of(1,2,3).map(x => x + '!!!');

/*
    $("#text").toObservable('keyup')
    .Select(x => $("#text").val())
    .Subscribe(x => console.log("From observable"));
 */
}

showHello("greeting", "TypeScript Dmitry ''");