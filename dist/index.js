"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let hasValue = true;
let count = 10;
let float = 3.14;
let negative = -0.12;
let single = 'hello';
let double = "hello";
let back = 'hello';
let hello;
hello = 'hello';
// Object
const person = {
    name: 'Jack',
    age: 21
};
// Array
const fruits = ["Apple", "Banana", "Grape"];
// Tuple
const book = ["bussiness", 1500, false];
book[1] = 700;
book.push(21); // Tuple type '[string, number, boolean]' of length '3' has no element at index '3'.
// Enum - make object
var CoffeeSize;
(function (CoffeeSize) {
    CoffeeSize[CoffeeSize["SHORT"] = 0] = "SHORT";
    CoffeeSize[CoffeeSize["TALL"] = 100] = "TALL";
    CoffeeSize[CoffeeSize["GRANDE"] = 101] = "GRANDE";
    CoffeeSize[CoffeeSize["VENTI"] = 102] = "VENTI";
})(CoffeeSize || (CoffeeSize = {}));
const coffee = {
    hot: true,
    size: CoffeeSize.TALL
};
// console.log(book[2]);
coffee.size = CoffeeSize.SHORT;
// console.log(CoffeeSize.SHORT);
let anything = true;
anything = 'hello';
anything = ['hello', 33, true];
let banana = 'banana';
banana = anything;
// banana = anything; // Type 'any' is not assignable to type 'string'.
let unionType = "aaa";
let unionTypes = [21, 'hello', 20, 5, "Apple"];
const apple = "apple";
let clothSize = 'medium';
const cloth = {
    color: 'white',
    size: 'medium'
};
function add(num1, num2) {
    return num1 + num2; //返り値の型を指定しない場合は、TypeScriptが自動的に推論する 
}
function sayHello() {
    console.log('Hello!');
    return; //return undefined;と同じ意味
}
// console.log(sayHello());
let tmpUndef = undefined;
let tmpNULL = null;
const anotherAdd = function (n1, n2) {
    return n1 + n2;
};
const doubleNumber = num => num * 2; //アロー関数の型を指定する場合は、引数の型と返り値の型を指定する
// callback function
function doubleAndHandle(num, cb) {
    const doubleNumber = cb(num * 2);
    console.log(doubleNumber);
}
doubleAndHandle(21, doubleNum => {
    return doubleNum * 3;
});
// unknown / any
let unknownInput; //unknown型は、どんな値でも代入できるが、型を指定しないと使えない
let anyInput; //any型は、どんな値でも代入できるし、型を指定しなくても使える
let text;
unknownInput = 'hello';
// text = unknownInput; // unknown型は、型を指定しないと使えない(エラー)
text = anyInput;
if (typeof unknownInput === 'string') { // 型を指定することで、unknown型を使えるようになる
    text = unknownInput;
}
function error(message) {
    throw new Error(message); // error関数
}
console.log(error('This is an error!'));
// コマンドレクチャー
// tsc index.ts -w
// tsc --init
