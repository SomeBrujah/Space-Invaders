import { Entity } from "./entity";

export class Laser extends Entity {
    constructor(xCoordinate, yCoordinate){
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
        this.element = this.initialize();
        this.speed = 2;
    }

    initialize(){
        const div = document.createElement('div');
        div.classList.add('laser');
        
        document.body.appendChild(div);
        div.style.left = `${this.xCoordinate}px`;
        div.style.top =`${this.yCoordinate}px`;
        return div;
    }

    setXCoordinate(xCoordinate) {
        this.xCoordinate = xCoordinate;
        this.element.style.left = `${this.xCoordinate}px`;
    }

    setYCoordinate(yCoordinate) {
        this.yCoordinate = yCoordinate;
        this.element.style.top = `${this.yCoordinate}px`
    }
}