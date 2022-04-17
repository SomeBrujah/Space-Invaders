import './style/reset.scss'
import './style/style.scss';
import { Ship } from "./ship.js";
import { Laser } from './laser';
import { Alien } from './alien';

const overlay = document.createElement('div');
overlay.classList.add('overlay');

const buttonPlayAgain = document.createElement('button');
buttonPlayAgain.classList.add('reGame');
buttonPlayAgain.onclick = (e) => {
    location.reload();
};
buttonPlayAgain.textContent = 'Play'

const win_popup = document.createElement('div');
win_popup.classList.add('win_popup');
const win_title = document.createElement('p');
win_title.textContent = 'You Win!'
win_title.classList.add('win_title');
win_popup.append(win_title, buttonPlayAgain);

const lose_popup = document.createElement('div');
lose_popup.classList.add('lose_popup');
const lose_title = document.createElement('p');
lose_title.textContent = 'You lose!';
lose_title.classList.add('lose_title');
lose_popup.append(lose_title, buttonPlayAgain);
document.body.append(overlay, win_popup, lose_popup);

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

for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 8; col++) {
        aliens.push(new Alien(col * 150 + 60, row * 150 + 60, hitLasers, removeAliens, addScore));
    }
}
let countAlien = aliens.length;

function removeAliens(alien) {
    countAlien--;
    aliens.splice(aliens.indexOf(alien), 1);
    alien.remove();
}

function getMostLeftAlien() {
    if (aliens.length === 0) return;
    return aliens.reduce((leftestAlien, currentAlient) => {
        return (currentAlient.xCoordinate < leftestAlien.xCoordinate
            ? currentAlient
            : leftestAlien
        );
    });
}

function getMostRightAlien() {
    if (aliens.length === 0) return;
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

    if (leftestAlien == undefined || rightestAlien == undefined) {
        table.textContent = `Your score is ${scores}`;
        clearInterval(gameLoop);
        overlay.style.visibility = 'visible';
        win_popup.style.visibility = 'visible';
        console.log("Game almost end!");
    }

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

    aliens.forEach(alien => {
        if (alien.yCoordinate > window.innerHeight - 200) {
            table.textContent = `Your score is ${scores}`;
            clearInterval(gameLoop);
            overlay.style.visibility = 'visible';
            lose_popup.style.visibility = 'visible';
            console.log("Game almost end!");
            clearInterval(gameLoop);
        }
    })

    table.textContent = `Your score is ${scores}`;
}

const gameLoop = setInterval(update, 1000 / 60)