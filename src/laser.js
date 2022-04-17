import { Entity } from "./entity";

export class Laser extends Entity {
    constructor(xCoordinate, yCoordinate){
        super();
        this.element = this.initialize();
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
        this.setXCoordinate(xCoordinate);
        this.setYCoordinate(yCoordinate);
    }

    initialize(){
        const div = document.createElement('div');
        div.classList.add('laser');
        div.style.position = 'fixed';
        document.body.appendChild(div);
        div.style.left = `${this.xCoordinate}px`;
        div.style.top =`${this.yCoordinate}px`;
        return div;
    }

    move(){
        this.setYCoordinate(this.yCoordinate - this.speed);
    }
}