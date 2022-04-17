import { Entity } from "./entity";
import { Laser } from "./laser";

export class Ship extends Entity {
    constructor(){
        super();
        this.xCoordinate = (window.innerWidth / 2) - 50;
        this.yCoordinate = window.innerHeight - 100;
        this.element = this.initialize();
        this.reloading = false;
    }

    initialize(){
        const div = document.createElement('div');
        const top = document.createElement('div');
        const bottom = document.createElement('div');
        const cell_1 = document.createElement('div');
        const cell_2 = document.createElement('div');
        const cell_3 = document.createElement('div');
        const cell_4 = document.createElement('div');

        div.append(top, bottom);
        top.append(cell_1);
        bottom.append(cell_2, cell_3, cell_4);

        div.style.width = 'min-content';
        div.style.position = 'absolute';
        div.style.bottom = 0 + 'px';
        div.style.left = `${this.xCoordinate}px`;
        top.style.display = 'flex';
        top.style.justifyContent = 'center';
        bottom.style.display = 'flex';
        bottom.style.justifyContent = 'space-between';
        cell_1.classList.add('defender_cell');
        cell_1.style.marginBottom = 5 + 'px';
        cell_2.classList.add('defender_cell');
        cell_2.style.marginRight = 5 + 'px';
        cell_3.classList.add('defender_cell');
        cell_3.style.marginRight = 5 + 'px';
        cell_4.classList.add('defender_cell');

        document.body.appendChild(div);
        return div;
    }

    moveRight(){
        this.setXCoordinate(this.xCoordinate + this.speed);
    }

    moveLeft(){
        this.setXCoordinate(this.xCoordinate - this.speed);
    }

    fire(all_shots_array) {
        if(this.reloading === true) {
            return;
        }
        all_shots_array.push(new Laser(this.xCoordinate + 45, this.yCoordinate));
        this.reloading = true;
        setTimeout(()=>{
            this.reloading = false;
        }, 1000)
    }
}