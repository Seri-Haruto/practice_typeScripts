"use strict";
// type addFunc = (num1: number, num2: number ) => number; 
let addFunc;
addFunc = (n1, n2) => {
    return n1 + n2;
};
class Developer {
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
