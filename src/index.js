import './style/reset.scss'
import './style/style.scss';
import { Ship } from "./ship.js";
import { Laser } from './laser';
import { Alien } from './alien';

const keys = {
    a: false,
    d: false,
    [' ']: false
}
const shots = [];
const aliens = [];
let scores = 0;

document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
})
const table = document.querySelector('.score');

const ship = new Ship();

function addScore(score) {
    scores += score;
}

function removeAliens(alien) {
    aliens.splice(aliens.indexOf(alien), 1);
    alien.remove();
}

function isLasersHit(entity_1, entity_2) {
    const rect1 = entity_1.element.getBoundingClientRect();
    const rect2 = entity_2.element.getBoundingClientRect();
    return !(rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom)
}

function hitLasers(entity) {
    for (let laser of shots) {
        if (isLasersHit(entity, laser)) {
            return laser;
        }
    }
    return null;
}

for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 8; col++) {
        aliens.push(new Alien(col * 120 + 60, row * 120 + 60, hitLasers, removeAliens, addScore))
    }
}

function getMostLeftAlien() {
    return aliens.reduce((leftestAlien, currentAlient) => {
        return (currentAlient.xCoordinate < leftestAlien.xCoordinate
            ? currentAlient
            : leftestAlien
        );
    });
}

function getMostRightAlien() {
    return aliens.reduce((rightestAlien, currentAlient) => {
        return (currentAlient.xCoordinate > rightestAlien.xCoordinate
            ? currentAlient
            : rightestAlien
        );
    });
}

function update() {
    if (keys['d'] && ship.xCoordinate < window.innerWidth - 100) {
        ship.moveRight();
    } else if (keys['a'] && ship.xCoordinate > 0) {
        ship.moveLeft();
    }
    if (keys[' ']) {
        ship.fire(shots);
    }

    shots.forEach(laser => {
        laser.move();
        if (laser.yCoordinate < 0) {
            laser.remove();
            shots.slice(shots.indexOf(laser), 1)
        }
    });

    aliens.forEach(alien => {
        alien.update();
    });

    const leftestAlien = getMostLeftAlien();
    const rightestAlien = getMostRightAlien();

    if (leftestAlien.xCoordinate < 30) {
        aliens.forEach(alien => {
            alien.setDirectionRight();
            alien.moveDown();
        });
    }
    if (rightestAlien.xCoordinate > window.innerWidth - 150) {
        aliens.forEach(alien => {
            alien.setDirectionLeft();
            alien.moveDown();
        });
    }
    
    if(aliens.length < 10) {
        console.log("Game almost end!")
    }

    table.textContent = `Your score is ${scores}`;
}

const gameLoop = setInterval(update, 1000 / 60)