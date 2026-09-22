function copy<T extends { name: string }, U extends keyof T>(value: T, key: U): T {
    value[key];
    return value;
}
console.log(copy({ name: 'haruto' , age : 12}, 'name'));

class LightDatabase <T extends string | number | boolean> {
    private data: T[] = [];

    add(item: T) {
        this.data.push(item);
    }
    remove(item: T) {
        this.data.splice(this.data.indexOf(item), 1);
    }
    get() {
        return this.data;
    }
}

// ユニオン型はジェネリクスの型パラメータとして使えないので、上記のようにジェネリクスを使う必要がある
// データベースにどんな型も代入できてしまい、柔軟すぎて安全に使えない
// class LightDatabase  {
//     private data: string[] | number[] | boolean[] = [];
    
//     add(item: string | number | boolean) {
//         this.data.push(item);
//     }
//     remove(item: string | number | boolean) {
//         this.data.splice(this.data.indexOf(item), 1);
//     }
//     get() {
//         return this.data;
//     }
// }

const stringLightDatabase = new LightDatabase<string>();
stringLightDatabase.add('Apple');
stringLightDatabase.add('Banana');
stringLightDatabase.add('Grape');
stringLightDatabase.remove('Banana');
console.log(stringLightDatabase.get());

interface Todo {
    title: string;
    text : string;
}

// Utility Types
type Todoable = Partial<Todo>; // PartialはTodoのプロパティをすべてオプショナルにする
type ReadTodo = Readonly<Todo>; // ReadonlyはTodoのプロパティをすべて読み取り専用にする

const fetchData: Promise<string> = new Promise<string>((resolve) => {
    setTimeout(() => {
        resolve('hello');
    }, 3000);
});

fetchData.then(data => {
    data.toUpperCase();
});

const vegetables: Array<string> = ['Tomato', 'Broccoli', 'Asparagus'];

interface ResponseData<T extends string = any> { // デフォルトの型をanyにすることで、型引数を省略した場合はanyになる
    data: T;
    status: number;
}
let tmp2: ResponseData; // anyとnumberの組み合わせになる
tmp2 = { data: 'hello', status: 200 }; // OK
tmp2 = { data: 123, status: 200 };     // OK

interface Vegetables {
    readonly tomato: string;
    broccoli: string;
    asparagus?: string;
}

type MappedTypes<T> = {
   readonly [P in keyof Vegetables]-?: string; // Vegetablesのプロパティをすべてstring型にする
}

// 条件付き型
type ConditionalTypes<T> = T extends 'tomato' ? string : number; // Tが'tomato'ならstring型、そうでなければnumber型


