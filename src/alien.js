import { Entity } from "./entity.js";

export class Alien extends Entity {
    constructor(xCoordinate, yCoordinate, hitLazers, removeAliens, addScore) {
        super();
        this.element = this.initialize();
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
        this.speed = 5;
        this.hitLazers = hitLazers;
        this.removeAliens = removeAliens;
        this.addScore = addScore;
        this.setXCoordinate(this.xCoordinate);
        this.setYCoordinate(this.yCoordinate);
        this.direction = 'right';
    }

    initialize() {
        const div = document.createElement('div');
        const top = document.createElement('div');
        const middle = document.createElement('div');
        const bottom = document.createElement('div');
        const cell_1 = document.createElement('div');
        const cell_2 = document.createElement('div');
        const cell_3 = document.createElement('div');
        const cell_4 = document.createElement('div');
        const cell_5 = document.createElement('div');
        const cell_6 = document.createElement('div');

        div.append(top, middle, bottom);
        top.append(cell_1, cell_2, cell_3);
        middle.append(cell_4);
        bottom.append(cell_5, cell_6);

        cell_1.classList.add('alien_cell');
        cell_1.style.marginRight = `${5}px`;
        cell_2.classList.add('alien_cell');
        cell_2.style.marginRight = `${5}px`;
        cell_3.classList.add('alien_cell');
        cell_4.classList.add('alien_cell');
        cell_5.classList.add('alien_cell');
        cell_6.classList.add('alien_cell');
        div.style.position = 'absolute';
        div.style.left = `${this.x}px`;
        div.style.top = `${this.y}px`;
        top.style.display = 'flex';
        top.style.justifyContent = 'space-between';
        middle.style.display = 'flex';
        middle.style.justifyContent = 'center';
        bottom.style.display = 'flex';
        bottom.style.justifyContent = 'space-between';


        document.body.appendChild(div);
        return div;
    }

    setDirectionRight() {
        this.direction = 'right';
    }

    setDirectionLeft() {
        this.direction = 'left';
    }

    moveDown() {
        this.setYCoordinate(this.yCoordinate + this.element.offsetWidth / 3);
    }

    update() {
        if (this.direction === 'right') {
            this.setXCoordinate(this.xCoordinate + this.speed)
        } else if (this.direction === 'left') {
            this.setXCoordinate(this.xCoordinate - this.speed)
        }

        const lazer = this.hitLazers(this);
        if (lazer) {
            this.removeAliens(this);
            lazer.remove();
            this.addScore(10);
        }
    }
}