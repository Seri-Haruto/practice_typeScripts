/**
 * 学習: 型の組み合わせ / 型ガード / オーバーロード / DOMの型
 * 型だけの処理: type・interface → JavaScriptでは消える。
 * 実行時の処理: typeof・in・instanceof等 → 値を調べて分岐。
 * 実行条件: DOM例にはid="input"が必要。現在のindex.htmlにはなく、このJSも未読込。
 */
interface Engineer {
    name: string; // 必須の名前。
    role: string; // 必須の役割。
}

interface Blogger {
    name: string;
    follower: number; // フォロワー数。
}

// &: 両方の条件を満たす型（交差型） / extends A, B: 2つの型の条件を継承。
// 結果: name・role・followerがすべて必要。下の2つの書き方はこの例では同じ形。
// type EngineerBlogger = Engineer & Blogger;
interface EngineerBlogger extends Engineer, Blogger {}

// serizawa: 変数名 / : EngineerBlogger: 型指定 / {...}: 実際のデータ。
const serizawa: EngineerBlogger = {
    name: 'serizawa',
    role: 'front-end',
    follower: 1000,
}

// type: 型に名前を付ける / |: いずれかの型を許可（ユニオン型）。
type NumberBoolean = number | boolean;
type StringNumber = string | number;
// &: 両方を満たす範囲 → 共通するnumberだけ。
type Mix = NumberBoolean & StringNumber;

// オーバーロード: 入力と戻り値の型の組を定義。処理本体は下の1つだけ。
function toUpperCase(x: string): string; // string入力 → string出力。
function toUpperCase(x: number): number; // number入力 → number出力。
function toUpperCase(x: string | number): string | number {
    // typeof: 実際の値の種類を調べる / ===: 一致判定。
    if (typeof x === "string") {
        return x.toUpperCase(); // この分岐のx: string型 → 大文字化。
    }
    return x; // 文字列は上でreturn済み → ここではnumber型。
}
// 'hello' → string用の宣言を選択 → upperHelloの型はstring、値は'HELLO'。
const upperHello = toUpperCase('hello')

// |: 片方の条件を満たせばよい（両方を持つ値も可）。
type NomadWorker = Engineer | Blogger;
function describeProfile(nomadWorker: NomadWorker) {
    console.log(nomadWorker.name); // name: 両方の型にあるので直接参照可能。
    // in: 項目の存在を調べる / 'role'あり → この分岐ではEngineer型。
    if ("role" in nomadWorker) {
        console.log(nomadWorker.role);
    }
    if ("follower" in nomadWorker) {
        console.log(nomadWorker.follower); // この分岐ではBlogger型。
    }
}
// describeProfileは未呼び出し。serizawaを渡した場合は2つのifが両方成立。

class Dog {
    // kind: 種類を区別する目印 / : 'dog': この文字列だけを許す型 / = 'dog': 初期値。
    kind: 'dog' = 'dog';
    speak(){
        console.log('bow-wow');
    }
}

class Bird {
    kind: 'bird' = 'bird'; // 'bird'だけを許す型（文字列リテラル型）。
    speak(){
        console.log('tweet-tweet');
    }
    fly() { // Birdだけが持つ処理。
        console.log('flutter');
    }
}

type Pet = Dog | Bird;
function havePet(pet: Pet) {
    pet.speak(); // 共通メソッド → DogでもBirdでも実行可能。
    // switch: 値による分岐 / kind: 型の判別用の目印（タグ付きユニオン）。
    switch (pet.kind) {
        case 'bird': // kindが'bird' → petはBird型と分かる。
            pet.fly();
            break; // switchを抜ける。関数全体は終了しない。
    }
    // instanceof: 指定クラスのprototypeにつながるか判定 → ここではBird型に絞る。
    // interfaceは実行時に消えるため、instanceofの判定対象には使えない。
    if (pet instanceof Bird) {
        pet.fly();
    }
}
havePet(new Bird()); // 出力: tweet-tweet → flutter → flutter（2つの分岐が成立）。

// getElementById: idで検索。通常の戻り値はHTMLElement | null。
// as HTMLInputElement: 入力要素の型として扱う指定（型アサーション）。実物の検証なし。
const input = document.getElementById('input') as HTMLInputElement;
input.value = 'initial input value'; // value: 入力欄の値。要素がなければここでエラー。

interface Designer {
    name: string; // 名前は必須。
    // [index: string]: 任意の文字列キー / 最後のstring: 各値の型。
    // index: 記法内の名前。indexという項目が必要なわけではない（インデックスシグネチャ）。
    [index: string]: string;
}
const designer: Designer = {
    name: 'serizawa',
    role: 'front-end', // 任意キーを追加可能。値はstringが必要。
    fafa: 'fafa'
}

interface DownloadedData {
    id: number; // 必須。
    user?: { // ?: この項目は省略可能。
        name?: { // userがあってもnameは省略可能。
            first: string; // nameがあればfirst・lastは必須。
            last: string;
        }
    }
}

const downloadedData: DownloadedData = {
    id: 1, // 手元で作成したデータ。通信処理はない。
}

// ?.: 左側がnull/undefinedなら参照を止め、undefinedを返す（オプショナルチェーン）。
// userなし → undefined。式の型はstring | undefined。上のDOM処理成功時のみ到達。
console.log(downloadedData.user?.name?.first);
