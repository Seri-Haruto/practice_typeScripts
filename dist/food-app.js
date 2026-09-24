"use strict";
class Score {
    get totalScore() {
        const foods = Foods.getInstance();
        return foods.activeElementsScore.reduce((total, score) => total + score, 0);
    }
    render() {
        document.querySelector('.score__number').textContent = String(this.totalScore);
        console.log("スコアを更新しました");
    }
}
class Food {
    constructor(element) {
        this.element = element;
        element.addEventListener('click', this.clickEventHandler.bind(this)); // bindを使うことでthisがFoodクラスのインスタンスを指すようになる
    }
    clickEventHandler() {
        console.log(this);
        this.element.classList.toggle('food--active');
        const score = new Score();
        score.render();
    }
}
class Foods {
    get activeElements() {
        this._activeElements = [];
        this.elements.forEach((element) => {
            if (element.classList.contains('food--active')) {
                this._activeElements.push(element);
            }
        });
        return this._activeElements;
    }
    get activeElementsScore() {
        this._activeElementsScore = [];
        this.activeElements.forEach((element) => {
            const foodScore = element.querySelector('.food__score');
            if (foodScore) {
                this._activeElementsScore.push(Number(foodScore.textContent));
            }
        });
        return this._activeElementsScore;
    }
    constructor() {
        this.elements = document.querySelectorAll('.food');
        this._activeElements = [];
        this._activeElementsScore = [];
        console.log("Foodsが作られました");
        this.elements.forEach((element) => {
            new Food(element);
        });
    }
    static getInstance() {
        if (!Foods.instance) {
            Foods.instance = new Foods();
        }
        return Foods.instance;
    }
}
const foods = Foods.getInstance();
foods.activeElements;
foods.activeElementsScore;
