export class Entity {
    constructor() {
        this.speed = 5;
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