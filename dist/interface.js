"use strict";
// type addFunc = (num1: number, num2: number ) => number; 
Object.defineProperty(exports, "__esModule", { value: true });
let addFunc;
addFunc = (n1, n2) => {
    return n1 + n2;
};
class Developer {
    name;
    age;
    language;
    constructor(name, age, language) {
        this.name = name;
        this.age = age;
        this.language = language;
    }
    greeting(message) {
        console.log(message);
    }
}
const tmpDeveloper = new Developer('Aoi', 21, 'TypeScript');
