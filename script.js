// window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');

// Create an instance of build-in 2d
    const ctx = canvas.getContext('2d');
    const CANVAS_WIDTH = canvas.width = 1920;
    const CANVAS_HEIGHT = canvas.height = 1080;
// });
// Scroll speed to slow down or speed up dynamically
let gameSpeed = 5;
const keys = [];

const background = new Image();
background.src = 'layer1.png';
const cloud1 = new Image();
cloud1.src = 'layer2.png';
const cloud2 = new Image();
cloud2.src = 'layer3.png';
const cloud3 = new Image();
cloud3.src = 'layer4.png';
const cloud4 = new Image();
cloud4.src = 'layer5.png';
const cloud5 = new Image();
cloud5.src = 'layer6.png';
const cloud6 = new Image();
cloud6.src = 'layer7.png';
const bushes = new Image();
bushes.src = 'layer8.png';
const distant = new Image();
distant.src = 'layer9.png';
const trees = new Image();
trees.src = 'layer10.png';
const ground = new Image();
ground.src = 'layer11.png';
const ship = new Image();
ship.src = 'layer12.png';
const ship2 = new Image();
ship2.src = 'layer13.png';
const ship3 = new Image();
ship3.src = 'layer14.png';

const playerImage = new Image();
playerImage.src = 'jawa.png';
console.log(playerImage);

// const player = {
//     x: 0,
//     y: 0,
//     width: 32,
//     height: 48,
//     frameX: 0,
//     frameY: 0,
//     speed: 9,
//     moving: false
// };

// const playerSprite = new Image();
// playerSprite.src = "jawa.png";

class Layer {
    constructor(image, speedModifier){
        this.x = 0;
        this.y = 0;
        this.width = 1920;
        this.height = 1080;
        this.x2 = this.width;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }
    update(){
        this.speed = gameSpeed * this.speedModifier;
        if(this.x <= -this.width){
            this.x = this.width + this.x2 - this.speed;
        }
        if(this.x2 <= -this.width) {
            this.x2 = this.width + this.x - this.speed;
        }
        this.x = Math.floor(this.x - this.speed);
        this.x2 = Math.floor(this.x2 - this.speed);
    }
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
    }
}

class Player {

    constructor(image, speed) {
        this.image = image;
        this.x = 300;
        this.y = 800;
        this.width = 300;
        this.height = 300;
        this.speed = speed;
    }
    draw() {
        ctx.drawImage(playerImage, this.x, this.y, player.width, player.height);
    }
}

const layer1 = new Layer(background, 0);
const layer13 = new Layer(ship2, 1.7);
const layer14 = new Layer(ship3, 2);
const layer12 = new Layer(ship, 1.4);
const layer2 = new Layer(cloud1, 0.9);
const layer3 = new Layer(cloud2, 0.8);
const layer4 = new Layer(cloud3, 0.7);
const layer5 = new Layer(cloud4, 0.3);
const layer6 = new Layer(cloud5, 0.3);
const layer7 = new Layer(cloud6, 0.3);
const layer8 = new Layer(bushes, 0.5);
const layer9 = new Layer(distant, 0.6);
const layer10 = new Layer(trees, 1);
const layer11 = new Layer(ground, 1);
const player = new Player(playerImage, 5);

window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    console.log(keys)
})
window.addEventListener('keyup', (e) => {
    delete keys[e.key];
})

function animate() {
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // drawSprite(playerSprite, 0, 0, player.width, player.height, 0, 0, player.height, player.width);
    layer1.update();
    layer1.draw();
    layer2.update();
    layer2.draw();
    layer3.update();
    layer3.draw();
    layer4.update();
    layer4.draw();
    layer5.update();
    layer5.draw();
    layer6.update();
    layer6.draw();
    layer7.update();
    layer7.draw();
    layer8.update();
    layer8.draw();
    layer9.update();
    layer9.draw();
    layer10.update();
    layer10.draw();
    layer11.update();
    layer11.draw();
    layer12.update();
    layer12.draw();
    layer13.update();
    layer13.draw();
    layer14.update();
    layer14.draw();

    if(keys['ArrowUp']){
        player.y -= player.speed;
    }
    if(keys['ArrowRight']){
        player.x += player.speed;
    }
    if(keys['ArrowLeft']){
        player.x -= player.speed;
    }
    if(keys['ArrowDown']){
        player.y += player.speed;
    }
    player.draw();
    requestAnimationFrame(animate)
}
animate();
