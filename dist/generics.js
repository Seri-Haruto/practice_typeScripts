"use strict";
function copy(value, key) {
    value[key];
    return value;
}
console.log(copy({ name: 'haruto', age: 12 }, 'name'));
class LightDatabase {
    constructor() {
        this.data = [];
    }
    add(item) {
        this.data.push(item);
    }
    remove(item) {
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
const stringLightDatabase = new LightDatabase();
stringLightDatabase.add('Apple');
stringLightDatabase.add('Banana');
stringLightDatabase.add('Grape');
stringLightDatabase.remove('Banana');
console.log(stringLightDatabase.get());
const fetchData = new Promise((resolve) => {
    setTimeout(() => {
        resolve('hello');
    }, 3000);
});
fetchData.then(data => {
    data.toUpperCase();
});
const vegetables = ['Tomato', 'Broccoli', 'Asparagus'];
let tmp2; // anyとnumberの組み合わせになる
tmp2 = { data: 'hello', status: 200 }; // OK
tmp2 = { data: 123, status: 200 }; // OK
