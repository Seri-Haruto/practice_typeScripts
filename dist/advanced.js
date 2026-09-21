"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serizawa = {
    name: 'serizawa',
    role: 'front-end',
    follower: 1000,
};
function toUpperCase(x) {
    if (typeof x === "string") { // typeof演算子を使って、xがstring型かどうかを判定
        return x.toUpperCase();
    }
    return x;
}
const upperHello = toUpperCase('hello'); // as string; // 型アサーションを使って、upperHelloの型をstringにする
function describeProfile(nomadWorker) {
    console.log(nomadWorker.name);
    if ("role" in nomadWorker) { // in演算子を使って、nomadWorkerにroleがあるか
        console.log(nomadWorker.role);
    }
    if ("follower" in nomadWorker) {
        console.log(nomadWorker.follower);
    }
}
class Dog {
    kind = 'dog';
    speak() {
        console.log('bow-wow');
    }
}
class Bird {
    kind = 'bird';
    speak() {
        console.log('tweet-tweet');
    }
    fly() {
        console.log('flutter');
    }
}
function havePet(pet) {
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
const input = document.getElementById('input'); // 型アサーションを使って、inputの型をHTMLInputElementにする
input.value = 'initial input value'; // 型アサーションを使って、inputの型をHTMLInputElementにする
const designer = {
    name: 'serizawa',
    role: 'front-end',
    fafa: 'fafa'
};
const downloadedData = {
    id: 1,
};
console.log(downloadedData.user?.name?.first); // optional chainingを使って、downloadedData.userがundefinedの場合はundefinedを返す
