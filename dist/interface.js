"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
