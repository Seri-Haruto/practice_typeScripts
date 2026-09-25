/**
 * 学習: interface / 関数の型 / extends / implements
 * 実行: 加算関数を変数へ代入 → Developerを作成。各メソッドは未呼び出し。
 * interface: 必要な項目・型を定義。JavaScriptへの変換時に消える。
 */
// type: 型に名前を付ける別の書き方。下のinterfaceと同じ関数の形。
// type addFunc = (num1: number, num2: number ) => number;

interface addFunc {
    // (num1, num2): 引数2個 / 各number: 入力の型 / 最後のnumber: 戻り値の型。
    // 引数名: 実装と同じでなくてよい。ここではnum1・num2、実装ではn1・n2。
    (num1: number, num2: number): number;
}

// let: 再代入可能 / 左のaddFunc: 変数名 / 右のaddFunc: 上で定義した型名。
let addFunc: addFunc;
// =>: アロー関数 / n1・n2: 受け取った数値 / return: 結果を呼び出し元へ返す。
addFunc = (n1: number, n2: number) => {
    return n1 + n2; // 例: addFunc(2, 3) → 5。
}

interface Namable {
    name: string; // name: 必須の項目 / string: 文字列型。
}

// extends: 親の型の条件を引き継ぐ。Humanの条件 = name + age + greeting。
interface Human extends Namable {
    age: number;
    // message: 文字列の引数 / void: 呼び出し側が戻り値を利用する指定はない。
    greeting(message: string): void;
}

// implements: 型の条件を満たすか検査。ここではname・age・greetingが必要。
// extendsとの違い: 処理を受け継がない。各メンバーをDeveloper側で用意する。
class Developer implements Human {
    // public: 外部からアクセス可能。引数に付けるとthis.引数名へ自動保存。
    // name: 名前 / age: 年齢 / language: 独自に追加した使用言語。
    constructor(
        public name: string,
        public age: number,
        public language: string) {}

    // message → コンソールへ表示。保存処理なし / 戻り値はvoidと推論。
    greeting(message: string) {
        console.log(message);
    }
}

// new: Developerを作成 / tmpDeveloper: 保存先の変数（Developer型）。
// 保存内容: name='Aoi', age=21, language='TypeScript'。
const tmpDeveloper = new Developer('Aoi', 21, 'TypeScript');
