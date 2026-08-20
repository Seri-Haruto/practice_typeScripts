type HasName = {
    name: string;
};

class Person {
    name: string;

    constructor(initName: string) {
        this.name = initName;
    }

    // `this` は実行時の引数ではなく、呼び出し元に必要な形を示すTypeScript専用の指定。
    greeting(this: HasName): void {
        console.log(`Hello! My name is ${this.name}`);
    }
}

const haruto = new Person('Haruto');
haruto.greeting(); // this === haruto

const anotherHaruto = {
    name: 'Another Haruto',
    anotherGreeting: haruto.greeting,
};

// ドットの左側にあるanotherHarutoが、greeting内のthisになる。
anotherHaruto.anotherGreeting(); // Hello! My name is Another Haruto

// const detachedGreeting = haruto.greeting;
// detachedGreeting(); // エラー: thisとして使える呼び出し元がない
