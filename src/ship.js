export class Ship {
    constructor(){
        this.xCoordinate = (window.innerWidth / 2) - 50;
        this.yCoordinate = window.innerHeight - 100;
        this.element = this.initialize();
        this.speed = 2;
    }

    initialize(){
        const div = document.createElement('div');
        div.classList.add('ship');
        
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

    moveRight(){
        this.setXCoordinate(this.xCoordinate + this.speed);
    }

    moveLeft(){
        this.setXCoordinate(this.xCoordinate - this.speed);
    }
}