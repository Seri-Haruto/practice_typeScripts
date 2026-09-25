/**
 * 学習: ジェネリクス / keyof / 型の変換 / Promise
 * T・U: 型を受け取る名前。実行時の変数ではない。
 * 実行: copy → 配列の追加・削除 → タイマー登録 → 残りの同期処理 → 後でthen。
 */
// <T ...>: 型を受け取る欄 / extends { name: string }: Tには文字列のnameが必要。
// keyof T: Tのキー一覧 / U extends keyof T: Uをそのキーに制限。
// value: T型のデータ / key: U型のキー / 最後の: T: 元の型を保って返す。
function copy<T extends { name: string }, U extends keyof T>(value: T, key: U): T {
    value[key]; // キーを使って値を取得。取得結果は未使用。
    return value; // 同じオブジェクトを返す。名前はcopyだが複製はしない。
}
// T={ name: string; age: number }, U='name'と推論。'height'など存在しないキーは不可。
console.log(copy({ name: 'haruto' , age : 12}, 'name')); // オブジェクト全体を表示。

// <T>: 保存する値の型 / extends: 許可する型を制限 / |: いずれかの型。
// 例: <string>なら文字列専用。<string | number>なら混在も許可。
class LightDatabase <T extends string | number | boolean> {
    // private: このクラス内だけでアクセス可能 / data: 保存先 / T[]: T型の配列。
    // = []: 空配列から開始。メモリ上のデータであり、外部への永続保存はない。
    private data: T[] = [];

    add(item: T) { // item: 追加する値。dataと同じT型。
        this.data.push(item); // push: 配列末尾に追加。
    }
    remove(item: T) {
        // indexOf(item): 最初に一致した位置 / splice(位置, 1): そこから1件削除。
        // 注意: 未発見 → -1 → 末尾を削除してしまう。実用時は-1の確認が必要。
        this.data.splice(this.data.indexOf(item), 1);
    }
    get() {
        return this.data; // 戻り値: T[]。同じ配列を返すため、外からの変更も内部に反映。
    }
}

// 比較用の別案（無効化中）:
// string[] | number[] | boolean[]: 3種類の配列のどれか。
// (string | number | boolean)[]: 3種類の値を混ぜられる配列。
// 下の問題: dataの種類とitemの型が対応しない → push等で型エラー。
// 上の解決: data: T[]とitem: T → 同じTで対応を保証。
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

// <string>: Tを文字列型に指定。add/removeの引数もstringになる。
const stringLightDatabase = new LightDatabase<string>();
stringLightDatabase.add('Apple'); // ['Apple']
stringLightDatabase.add('Banana'); // ['Apple', 'Banana']
stringLightDatabase.add('Grape'); // ['Apple', 'Banana', 'Grape']
stringLightDatabase.remove('Banana'); // 位置1を削除 → ['Apple', 'Grape']
console.log(stringLightDatabase.get());

interface Todo {
    title: string; // 必須のタイトル。
    text : string; // 必須の本文。
}

// Partial<Todo>: 各項目を省略可能にする型 → { title?: string; text?: string }。
type Todoable = Partial<Todo>;
// Readonly<Todo>: 各項目への再代入を禁止する型。実行時のObject.freezeとは別。
// 両者とも元のTodoを変更せず、新しい型を作る。入れ子の奥までは変換しない。
type ReadTodo = Readonly<Todo>;

// fetchData: Promiseの保存先 / Promise<string>: 成功時にstringを渡す非同期処理。
// new Promise内の関数: すぐ実行 / resolve: 成功を通知して値を渡す関数。
const fetchData: Promise<string> = new Promise<string>((resolve) => {
    // setTimeout: 後で実行する処理を予約 / 3000: ミリ秒。同期処理は止まらない。
    setTimeout(() => {
        resolve('hello'); // 約3秒以降に成功 → thenへ'hello'を渡す。通信処理はない。
    }, 3000);
});

// then: 成功後の処理を登録 / data: resolveが渡した値（string型）。
fetchData.then(data => {
    data.toUpperCase(); // 'HELLO'を生成。保存・表示・returnなし。data自体は変わらない。
});

// Array<string>: string[]と同じ型。標準の配列型もジェネリクスを使う。
const vegetables: Array<string> = ['Tomato', 'Broccoli', 'Asparagus'];

// T: dataの型 / extends string: 文字列型に制限 / = any: 型指定を省略した場合の型。
// any: 型検査が緩くなる特別な型。省略時はdataに数値も入ってしまう。
interface ResponseData<T extends string = any> {
    data: T;
    status: number; // Tに関係なく数値。
}
let tmp2: ResponseData; // ResponseData<any>と同じ。明示的なResponseData<number>は不可。
tmp2 = { data: 'hello', status: 200 }; // anyなので文字列OK。
tmp2 = { data: 123, status: 200 }; // anyなので数値もOK。letなので再代入可能。

interface Vegetables { // 大文字: 型名。上の小文字vegetablesは変数名。
    readonly tomato: string; // readonly: 再代入不可。
    broccoli: string;
    asparagus?: string; // ?: 省略可能。
}

// MappedTypes: 型のキーを使って新しい型を作る。
// <T>: 型を受け取るが、この実装では未使用。材料は常にVegetables。
type MappedTypes<T> = {
   // keyof Vegetables: 'tomato' | 'broccoli' | 'asparagus'。
   // P in ...: 各キーPについて項目を作成 / readonly: 再代入不可 / -?: 省略不可へ変更。
   // 最後のstring: 各値の型。結果: 全3項目が必須・readonly・string。
   readonly [P in keyof Vegetables]-?: string;
}

// T extends 'tomato': Tが'tomato'型に収まるか / ? string: 成立時 / : number: 不成立時。
// 例: <'tomato'> → string、<'broccoli'> → number、<string> → number。
// Tがユニオンなら各型で判定 → <'tomato' | 'broccoli'>はstring | number。
type ConditionalTypes<T> = T extends 'tomato' ? string : number;
