"use strict";
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.id = 16;
        this.id = Math.floor(Math.random() * 100);
        this.name = 'serizawa';
    }
    incrementAge() {
        this.age += 1;
    }
    greeting() {
        console.log(`Hello! My name is ${this.name} and I am ${this.age} years old.`);
    }
}
class Teacher extends Person {
    constructor(name, age, subject) {
        super(name, age);
        this.subject = subject;
    }
    greeting() {
        console.log(`Hello! My name is ${this.name}, I am ${this.age} years old and I teach ${this.subject}.`);
    }
}
const haruto = new Person('Haruto', 20);
haruto.greeting(); // this === haruto
const anotherHaruto = new Person('Another Haruto', 25);
anotherHaruto.greeting(); // Hello! My name is Another Haruto
const teacher = new Teacher('Jack', 21, 'Math');
teacher.greeting();
