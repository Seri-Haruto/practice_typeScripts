class Person {

    readonly id: number = 16;
    constructor(
        public readonly name: string, 
        protected age: number
    ) {
        this.id = Math.floor(Math.random() * 100);
        this.name = 'serizawa';
    }

    incrementAge() {
        this.age += 1;
    }
    greeting(this: Person){
        console.log(`Hello! My name is ${this.name} and I am ${this.age} years old.`);
    }
}

class Teacher extends Person {
    constructor(name: string, age: number, private subject: string) {
        super(name, age);
    }

    greeting(this: Teacher) {
        console.log(`Hello! My name is ${this.name}, I am ${this.age} years old and I teach ${this.subject}.`);
    }
} 

const haruto = new Person('Haruto', 20);
haruto.greeting(); // this === haruto

const anotherHaruto = new Person('Another Haruto', 25);
anotherHaruto.greeting(); // Hello! My name is Another Haruto

const teacher = new Teacher('Jack', 21, 'Math');
teacher.greeting();
