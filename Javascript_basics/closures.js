// Localization

console.log(" ---- Localization ----");

function localize(greeting) {
    return function (name) {
        console.log(greeting + ' ' + name);
    };
}

var english = localize('Hello');
var russian = localize('Привет');

english('closure');
russian('closure');

function counter(n) {
    var count = n;
    return function () {
        console.log(count++);
    };
}

// Counter

console.log(" ---- Counter ----");

var ct = counter(5);
ct();
ct();
ct();
ct();


var i = 5;

function plusOne() {
    i++;
    return i;
}

console.log(plusOne()); //6 
console.log(plusOne()); //7 
console.log(i); //7

// Инициализация handle после вызова

console.log("---- Инициализация handle после вызова ---- ");

var outerVar = 4;
var handle;

function outer() {

    var innetVar = 5;

    function inner() {
        console.log(outerVar);
        console.log(innetVar);
    }

    handle = inner;
}

outer();
handle(); //4
//5

console.log("---- Abstract factory ---- ");

function createFunction(n) {
    return function (x) {
        return x * n;
    };
}

var twice = createFunction(2);
var triple = createFunction(3);
var quadruple = createFunction(4);

console.log("Twice: " + twice(2));
console.log("Triple: " + triple(2));


console.log("---- Сохранение состояния между вызовами ---- ");

var ct = (function counter() {
    var count = 5;
    return function () {
        console.log(count++);
    };
})();

ct(); // 5
ct(); // 6
ct(); // 7


console.log("---- Модификаторы доступа: приватная переменная ---- ");

function counter2() {
    var count = 0;

    this.getCount = function () {
        return count;
    };

    this.setCount = function (n) {
        count = n;
    };

    this.incrCount = function () {
        count++;
    };
}

var counter = new counter2();

counter.setCount(5);
counter.incrCount();
console.log(counter.getCount()); // 6
console.log(counter.count); // undefined


console.log("---- Модификаторы доступа: приватный метод ---- ");

function counter3() {
    var count = 0;

    function setCount(n) {
        count = n;
    }

    return {
        safeSetCount: function (n) {
            if (n != 13) {
                setCount(n);
            } else {
                console.log("Bad number!");
            }
        },
        getCount: function () {
            return count;
        },
        incrCount: function () {
            count++;
        }
    };
}

var ct = new counter3();
ct.safeSetCount(3);
ct.safeSetCount(13);
ct.incrCount(13); //  Параметр просто проигнорировался

console.log(ct.getCount());