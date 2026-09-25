/**
 * 学習: interface / private・static / シングルトン / getter / DOM・イベント
 * 起動: Foods.getInstance() → 各カードのFoodを作成 → クリック処理を登録。
 * 操作: クリック → 選択切り替え → 選択中の点数取得 → 合計 → 画面更新。
 * データ: 食品・点数=index.html / 選択状態=food--activeの有無 / 永続保存なし。
 * 実行: srcのTS → distのJS → index.htmlがdeferでHTML解析後に読み込む。
 */
// interface: クラスが公開する項目・操作の型。実行時には残らない。
interface Scoreable {
    // readonly: 再代入禁止 / totalScore: 合計 / number: 数値型。
    readonly totalScore: number;
    // render: 表示処理 / (): 引数なし / void: 利用する戻り値なし。
    render(): void;
}

interface Foodable {
    element: HTMLDivElement; // element: 担当カード / HTMLDivElement: div要素の型。
    clickEventHandler(): void; // クリックされたときの処理。
}

interface Foodsable {
    // NodeListOf<T>: DOM要素の集まり / <HTMLDivElement>: 各要素がdiv型。
    elements: NodeListOf<HTMLDivElement>;
    activeElements: HTMLDivElement[]; // []: 配列。選択中のカードを並べる。
    activeElementsScore: number[]; // 選択中の点数。例: [5, 2, -3]。
}

// Score: 合計と表示を担当 / implements: Scoreableの項目・型を満たすか検査。
class Score implements Scoreable {
    // private: Score内だけでアクセス可能（外からScore.instanceは不可）。
    // static: クラスに属する共有の保存場所（各オブジェクトには作られない）。
    // instance: 作成したScoreを保持する名前 / : Score: 保存する値の型。
    private static instance: Score;

    // get: totalScoreを読むと実行。呼び方はscore.totalScore（括弧不要）。
    // 読むたびに再計算。合計値を保存して使い回す処理はない。
    get totalScore(){
        const foods = Foods.getInstance(); // 共有Foodsを取得。foodsの型はFoods。
        // activeElementsScore: 点数の配列 / reduce: 順に値をまとめる配列メソッド。
        // total: 途中の合計 / score: 今回の点数 / =>: 足し算する関数 / 0: 合計の初期値。
        // [5, 2, -3] → 0+5 → 5+2 → 7-3 → 4。未選択の[] → 0。
        return foods.activeElementsScore.reduce((total, score) => total + score, 0);
    }
    render() {
        // querySelector: 最初に一致する要素を取得 / '.score__number': 表示先のCSSクラス。
        // !: nullでないと型検査へ伝える（存在確認ではない。要素がなければエラー）。
        // this.totalScore: getterで合計取得 / String: 文字列化 / textContent: 表示文字。
        document.querySelector('.score__number')!.textContent = String(this.totalScore);
        console.log("スコアを更新しました") // 開発者向けのログ。
    }

    // private: 外からnew Score()することを禁止。作成はgetInstance内だけ。
    private constructor() {}
    // static: Score.getInstance()で呼べる / 戻り値: 共有のScore。
    static getInstance() {
        // !: 否定。未作成ならtrue（上の要素取得後の!とは別の使い方）。
        if (!Score.instance) {
            Score.instance = new Score(); // 初回だけ作成して共有の保存場所へ。
        }
        return Score.instance; // 2回目以降も同じScoreを返す。
    }
}

// Food: カード1枚を担当。カードの数だけ作成 / Foodable: 必要な項目・操作の型。
class Food implements Foodable {
    // constructor: 作成時の処理 / public: 外部からアクセス可能 + 引数を自動保存。
    // element: 担当カード / HTMLDivElement: div要素の型 / 保存先: this.element。
    constructor(public element: HTMLDivElement) {
        // addEventListener: イベント処理の登録 / 'click': クリック / 第2引数: 呼ぶ関数。
        // this.clickEventHandler: このFoodの処理 / bind(this): thisをこのFoodに固定。
        // bindなし → 通常のイベント関数のthisはDOM要素になり、this.elementと合わない。
        element.addEventListener('click', this.clickEventHandler.bind(this));
    }
    clickEventHandler() {
        console.log(this); // this: bindで固定した、担当カードのFood。
        // classList: 要素のCSSクラス一覧 / toggle: なければ追加、あれば削除。
        // food--active: 選択中の印。CSSで見た目も変わる。
        this.element.classList.toggle('food--active');
        const score = Score.getInstance(); // 共有Scoreを取得。
        score.render(); // 選択中の全食品を集計 → 表示更新。
    }
}

// Foods: 全食品の取得・選択状態の読み取りを担当。
class Foods implements Foodsable {
    // private: Foods内だけでアクセス可能（外からFoods.instanceは不可）。
    // static: クラスに属する共有の保存場所（foods.instanceではなくFoods.instance）。
    // instance: 作成したFoodsを保持する名前。特別な予約語ではない。
    // : Foods: 保存する値の型。この宣言だけではnew Foods()は実行されない。
    private static instance: Foods;

    // elements: 全カードの保存先 / querySelectorAll: 一致する要素をすべて取得。
    // <HTMLDivElement>: 要素の型を指定（実物の検証はしない） / '.food': 検索条件。
    // 結果: NodeListOf<HTMLDivElement>。後から追加したカードは自動で増えない。
    elements = document.querySelectorAll<HTMLDivElement>('.food');
    // private: 外部から直接操作不可 / _activeElements: 選択カードの作業用配列。
    // HTMLDivElement[]: div要素の配列 / = []: 空配列で開始 / _: 内部用を示す命名。
    private _activeElements: HTMLDivElement[] = [];
    // _activeElementsScore: 選択した点数の作業用配列 / number[]: 数値の配列。
    private _activeElementsScore: number[] = [];

    // get: foods.activeElementsを読むと実行 / 戻り値: 選択カードの配列。
    get activeElements() {
        this._activeElements = []; // 前回分を消す → 重複・解除済みカードの残存を防ぐ。
        // forEach: 各カードに処理 / element: 今のカード / =>: 外側のthisを引き継ぐ。
        this.elements.forEach((element) => {
            // contains: クラスの有無をtrue/falseで返す → 選択中だけ対象にする。
            if (element.classList.contains('food--active')) {
                this._activeElements.push(element); // push: 配列末尾へ追加。
            }
        })
        return this._activeElements;
    }

    // get: foods.activeElementsScoreを読むと実行 / 戻り値: 点数の配列。
    get activeElementsScore() {
        this._activeElementsScore = []; // 前回の点数を消す。
        // this.activeElements: 上のgetterを実行 → 現在選択中のカードを取得。
        this.activeElements.forEach((element) => {
            // element.querySelector: このカード内を検索 / foodScore: 点数要素またはnull。
            const foodScore = element.querySelector('.food__score');
            if (foodScore) { // nullを除外 → 以下ではElement型として扱える。
                // textContent: 点数の文字列 / Number: '+5' → 5 / push: 配列へ追加。
                // 前提: HTMLが正しい数値。数値でない文字列 → NaN、空文字・null → 0。
                this._activeElementsScore.push(Number(foodScore.textContent));
            }
        })
        return this._activeElementsScore; // 例: [5, 2, -3] → Score側のreduceへ。
    }

    // private constructor: 外からnew Foods()は不可。初回getInstance時だけ実行。
    private constructor() {
        console.log("Foodsが作られました")
        this.elements.forEach((element) => {
            new Food(element); // 各カード用のFood作成 → クリック処理の登録。
        })
    }
    // static: Foods.getInstance()で呼ぶ / getInstance: 共有Foodsを返すメソッド名。
    // 初回だけnew、以後は再利用 → イベントの重複登録を防ぐ（シングルトン）。
    static getInstance() {
        if (!Foods.instance) { // 未作成か確認。
            Foods.instance = new Foods(); // 作成 → staticのinstanceへ保存。
        }
        return Foods.instance;
    }
}

// 起動の入口。クラス名Foods → getInstance() → 取得したオブジェクトを変数foodsへ。
const foods = Foods.getInstance();
foods.activeElements; // getter実行。初期値は[]。戻り値はここでは使わない。
foods.activeElementsScore; // 内部でactiveElementsも実行。初期値は[]。
// 初期表示の0はindex.html由来。Score.render()はクリック時に実行。
