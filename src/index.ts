let hasValue = true;
let count:number = 10;
let float:number = 3.14;
let negative = -0.12;
let single = 'hello';
let double = "hello";
let back: string = 'hello';
let hello: string;
hello = 'hello';

// Object
const person = {
    name: 'Jack',
    age: 21
}

// Array
const fruits: string[] = ["Apple", "Banana", "Grape"]

// Tuple
const book: [string, number, boolean] = ["bussiness", 1500, false];
book[1] = 700;
book.push(21); // Tuple type '[string, number, boolean]' of length '3' has no element at index '3'.


// Enum - make object
enum CoffeeSize {
    SHORT,
    TALL = 100,
    GRANDE,
    VENTI
}

const coffee = {
    hot: true,
    size: CoffeeSize.TALL
}

// console.log(book[2]);

coffee.size = CoffeeSize.SHORT;
// console.log(CoffeeSize.SHORT);

let anything: any = true;
anything = 'hello';
anything = ['hello', 33, true];

let banana = 'banana';
banana = anything;
// banana = anything; // Type 'any' is not assignable to type 'string'.

let unionType: number | string = "aaa";
let unionTypes: (number | string)[] = [21, 'hello', 20, 5, "Apple"];

// Literal types
type ClothSize = 'small' | 'medium' | 'large';
const apple = "apple";
let clothSize: ClothSize = 'medium';
const cloth: {
    color: string;
    size: 'small' | 'medium' | 'large'; // ClothSizeで置き換え可能
} = {
    color: 'white',
    size: 'medium'
}

function add(num1: number, num2: number){ //パラメータは型を指定する
    return num1 + num2; //返り値の型を指定しない場合は、TypeScriptが自動的に推論する 
}

function sayHello(): void { //返り値がない場合はvoidを指定する, undefinedを返す場合はundefinedを指定する
    console.log('Hello!');
    return; //return undefined;と同じ意味
}
// console.log(sayHello());

let tmpUndef: undefined = undefined; 
let tmpNULL: null = null; 

const anotherAdd: (n1: number, n2: number) => number = function(n1: number, n2: number): number { 
    return n1 + n2;
}
const doubleNumber: (num: number) => number = num => num * 2; //アロー関数の型を指定する場合は、引数の型と返り値の型を指定する

// callback function
function doubleAndHandle(num:number, cb: (num: number) => number) : void{ //返り値をvoidにすると、返り値を無視する
    const doubleNumber = cb(num * 2) ;
    console.log(doubleNumber);
}
doubleAndHandle(21, doubleNum => {
    return doubleNum * 3;
});

// unknown / any
let unknownInput: unknown; //unknown型は、どんな値でも代入できるが、型を指定しないと使えない
let anyInput: any; //any型は、どんな値でも代入できるし、型を指定しなくても使える
let text: string;
unknownInput = 'hello';
// text = unknownInput; // unknown型は、型を指定しないと使えない(エラー)
text = anyInput;
if (typeof unknownInput === 'string') { // 型を指定することで、unknown型を使えるようになる
    text = unknownInput; 
}

function error(message: string): never { 
    throw new Error(message); // error関数
}
console.log(error('This is an error!')); 

// コマンドレクチャー
// tsc index.ts -w
// tsc --init
