interface Engineer {
    name: string;
    role: string;
}

interface Blogger {
    name: string;
    follower: number;
}

// type EngineerBlogger = Engineer & Blogger;
interface EngineerBlogger extends Engineer, Blogger {}

const serizawa: EngineerBlogger = {
    name: 'serizawa',
    role: 'front-end',
    follower: 1000,
}

type NumberBoolean = number | boolean;
type StringNumber = string | number;

type Mix = NumberBoolean & StringNumber; // number

// type Guard
function toUpperCase(x: string): string; // 関数のオーバーロードを使って、xがstring型の場合はstring型を返す
function toUpperCase(x: number): number;
function toUpperCase(x: string | number): string | number {
    if (typeof x === "string") { // typeof演算子を使って、xがstring型かどうかを判定
        return x.toUpperCase();
    }
    return x;
}
const upperHello = toUpperCase('hello')  // as string; // 型アサーションを使って、upperHelloの型をstringにする


type NomadWorker = Engineer | Blogger;
function describeProfile(nomadWorker: NomadWorker) {
    console.log(nomadWorker.name);
    if ("role" in nomadWorker) {  // in演算子を使って、nomadWorkerにroleがあるか
        console.log(nomadWorker.role);
    }
    if ("follower" in nomadWorker) {  
        console.log(nomadWorker.follower);
    }
}

class Dog {
    kind: 'dog' = 'dog';
    speak(){
        console.log('bow-wow');
    }
}

class Bird {
    kind: 'bird' = 'bird';
    speak(){
        console.log('tweet-tweet');
    }
    fly() {
        console.log('flutter');
    }
}

type Pet = Dog | Bird;
function havePet(pet: Pet) {
    pet.speak();
    switch (pet.kind) { // タグ付きユニオンdiscriminated unionを使って、petの種類を判定
        case 'bird':
            pet.fly();
            break;
    }
    if (pet instanceof Bird) { // instanceof演算子を使って、petがBirdのインスタンスかどうかを判定
        pet.fly();
    }
}
havePet(new Bird());


const input = document.getElementById('input') as HTMLInputElement; // 型アサーションを使って、inputの型をHTMLInputElementにする
input.value = 'initial input value'; // 型アサーションを使って、inputの型をHTMLInputElementにする

interface Designer {
    name: string; // numberにはできない
    [index: string]: string; // index signatureを使って、Designerのプロパティの型をstringにする
}
const designer: Designer = {
    name: 'serizawa',
    role: 'front-end',
    fafa: 'fafa'
}

interface DownloadedData {
    id: number;
    user?: {
        name?: {
            first: string;
            last: string;
        }
    }
}

const downloadedData: DownloadedData = {
    id: 1,
}

console.log(downloadedData.user?.name?.first); // optional chainingを使って、downloadedData.userがundefinedの場合はundefinedを返す
