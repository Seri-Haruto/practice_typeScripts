// type addFunc = (num1: number, num2: number ) => number; 

interface addFunc {
    (num1: number, num2: number): number;
}

let addFunc: addFunc;
addFunc = (n1: number, n2: number) => {
    return n1 + n2;
}

interface Namable { // インターフェースの定義
    name: string;
} 

interface Human extends Namable { // インターフェースの定義
    age: number;
    greeting(message: string): void;
}

class Developer implements Human {
    constructor(
        public name: string, 
        public age: number, 
        public language: string) {}

    greeting(message: string) {
        console.log(message);
    }
}

const tmpDeveloper = new Developer('Aoi', 21, 'TypeScript');
