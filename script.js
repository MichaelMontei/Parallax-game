// window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');

// Create an instance of build-in 2d
    const ctx = canvas.getContext('2d');
    const CANVAS_WIDTH = canvas.width = 1920;
    const CANVAS_HEIGHT = canvas.height = 1080;
// });
// Scroll speed to slow down or speed up dynamically
let gameSpeed = 5;

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
console.log(ground);




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

const layer1 = new Layer(background, 0);
const layer2 = new Layer(cloud1, 0.9);
const layer3 = new Layer(cloud2, 0.8);
const layer4 = new Layer(cloud3, 0.7);
const layer5 = new Layer(cloud4, 0.3);
const layer6 = new Layer(cloud5, 0.3);
const layer7 = new Layer(cloud6, 0.3);
const layer8 = new Layer(bushes, 0.5);
const layer9 = new Layer(distant, 0.6);
const layer10 = new Layer(trees, 1);
const layer11 = new Layer(ground, 1.2);

// let
// let x = 0;
// let x2 = 2048;

function animate() {
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
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
