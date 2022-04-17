import './style/reset.scss'
import './style/style.scss';
import { Ship } from "./ship.js";
import { Laser } from './laser';

const keys = {
    a: false,
    d: false,
    [' ']: false
}
const shots = [];

document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
})

const ship = new Ship();

function update() {
    if (keys['d'] && ship.xCoordinate < window.innerWidth - 100) {
        ship.moveRight();
    } else if (keys['a'] && ship.xCoordinate > 0) {
        ship.moveLeft();
    } 
    if(keys[' ']) {
        ship.fire(shots);
    }
}

const gameLoop = setInterval(update, 20)