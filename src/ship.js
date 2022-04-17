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
        div.classList.add('ship');
        
        document.body.appendChild(div);
        div.style.left = `${this.xCoordinate}px`;
        div.style.top =`${this.yCoordinate}px`;
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