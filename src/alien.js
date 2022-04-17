import { Entity } from "./entity.js";

export class Alien extends Entity {
    constructor(xCoordinate, yCoordinate){
        super();
        this.element = this.initialize();
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
        this.setXCoordinate(this.xCoordinate);
        this.setYCoordinate(this.yCoordinate);
        this.direction = 'right';
    }

    initialize(){
        const div = document.createElement('div');
        div.classList.add('ship');
        
        document.body.appendChild(div);
        div.style.left = `${this.xCoordinate}px`;
        div.style.top =`${this.yCoordinate}px`;
        return div;
    }

    setDirectionRight(){
        this.direction = 'right';
    }

    setDirectionLeft(){
        this.direction = 'left';
    }

    move(){
        
    }
}