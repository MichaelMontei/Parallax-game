const canvas = document.getElementById('canvas1');

// Create an instance of build-in 2d
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;

// Scroll speed to slow down or speed up dynamically
let gameSpeed = 5;

const ground1 = new Image();
ground1.src = 'background.png';
const ground2 = new Image();
ground2.src = 'ground1.png';
const bushes = new Image();
bushes.src = 'bushes.png';
const distant = new Image();
distant.src = 'distant.png';
const trees = new Image();
trees.src = 'trees.png';

class Layer {
    constructor(image, speedModifier){
        this.x = 0;
        this.y = 0;
        this.width = 2048;
        this.height = 1546;
        this.x2 = this.width;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }
    update(){

    }
    draw(){
        
    }
}


// let x = 0;
// let x2 = 2048;

function animate() {
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // ctx.drawImage(ground1, x, 0);
    // ctx.drawImage(ground1, x2, 0);
    // ctx.drawImage(ground2, x, -650);
    // if(x < -2048) x = 2048 + x2 - gameSpeed;
    // else x -= gameSpeed;
    // if(x2 < -2048) x2 = 2048 + x - gameSpeed;
    // else x2 -= gameSpeed;
    requestAnimationFrame(animate);
}
animate();
