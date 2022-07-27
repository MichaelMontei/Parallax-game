const canvas = document.getElementById('canvas1');

//Create an instance of build-in 2d
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 1920;
const CANVAS_HEIGHT = canvas.height = 1080;

//Scroll speed to slow down or speed up dynamically
let gameSpeed = 4;
let planeInterval = 1000;
const keys = [];
const planesArray = [];

//Assets to add all images
const background = new Image();
background.src = "assets/layer1.png";
const cloud1 = new Image();
cloud1.src = "assets/layer2.png";
const cloud2 = new Image();
cloud2.src = "assets/layer3.png";
const cloud3 = new Image();
cloud3.src = "assets/layer4.png";
const cloud4 = new Image();
cloud4.src = "assets/layer5.png";
const cloud5 = new Image();
cloud5.src = "assets/layer6.png";
const cloud6 = new Image();
cloud6.src = "assets/layer7.png";
const bushes = new Image();
bushes.src = "assets/layer8.png";
const distant = new Image();
distant.src = "assets/layer9.png";
const trees = new Image();
trees.src = "assets/layer10.png";
const ground = new Image();
ground.src = "assets/layer11.png";

//PLanes for collisions with the player
const ship2 = new Image();
ship2.src = "assets/layer13.png";
const ship3 = new Image();
ship3.src = "assets/layer14.png";

//Images for the player
const playerImage = new Image();
playerImage.src = "assets/jawa.png";

//Layer class to add all layers
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

//Player class
class Player {

    constructor(image, speed, width, height) {
        this.image = image;
        this.x = 100;
        this.y = 650;
        this.width = width;
        this.height = height;
        this.speed = speed;
    }
    draw() {
        ctx.drawImage(playerImage, this.x, this.y, player.width, player.height);

    }
}

class Plane {
    constructor(image, width, height, speed){
        this.image = image;
        this.x = 1900;
        this.y = Math.random() * canvas.height;
        this.width = 1500;
        this.height = 1500;
        this.speed = speed;
    }
    update() {
        this.x -= this.speed;
    }
    draw () {
        ctx.drawImage(ship3 ,this.x, this.y, this.width, this.height)
    }
}

function drawPlane (img, ship3X, ship3Y, ship3Width, ship3Height) {
    ctx.drawImage(img, ship3X, ship3Y, ship3Width, ship3Height)
}

//Create all the layers
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
const layer11 = new Layer(ground, 1);


//Make array for all the layers
const layerArray = [layer1, layer2, layer3, layer4, layer5, layer6, layer7, layer8, layer9, layer10, layer11];


//Create the player
const player = new Player(playerImage, 5, 350, 350);
const spaceShip = new Player(ship3, 5);
let test = spaceShip;
const plane = new Plane(test, 500, 500, 6);


window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    console.log(keys)
})
window.addEventListener('keyup', (e) => {
    delete keys[e.key];
})

function animate(timestamp) {
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // drawSprite(playerSprite, 0, 0, player.width, player.height, 0, 0, player.height, player.width);

    //Instead of updating and drawing each layer separately, we will use the layerArray here
    layerArray.forEach(layer =>{
        layer.update();
        layer.draw();
    })
    drawPlane(test.image, spaceShip.x, spaceShip.y, spaceShip.width, spaceShip.height);

    if(keys['ArrowUp'] && player.y > -215){
        player.y -= player.speed;
    }
    // if(keys['ArrowRight']){
    //     player.x += player.speed;
    // }
    // if(keys['ArrowLeft']){
    //     player.x -= player.speed;
    // }
    if(keys['ArrowDown'] && player.y < 780){
        player.y += player.speed;
    }
    player.draw();
    plane.draw();
    animateObstacles();
    requestAnimationFrame(animate);
}
animate();
setTimeout(() => {
    generatePlanes();
    console.log(planesArray)
}, 0);


function generatePlanes () {
    if (Math.round(Math.random())) {
        planesArray.push(new Plane(ship2,80, 80,6))
        planesArray.push(new Plane(ship2,80, 80,6))
    }
    else{
        planesArray.push(new Plane("assets/layer14.png" ,80, 80, 8));
        planesArray.push(new Plane("assets/layer13.png" ,80, 80, 12));
    }
    setTimeout(generatePlanes, planeInterval);
}

function animateObstacles () {
    planesArray.forEach((planes, index) => {
        planes.draw();
        planes.update();
        //removes items from array when they leave screen
        if ((planesArray.x + planesArray.width) <=0) {
            setTimeout(() => {
                planesArray.splice(index, 1);
            }, 0)
        }

        //detects collision between player and obstacles
        if (test.x < planes.x + planes.width &&
            test.x + test.width > planes.x &&
            test.y < planes.y + planes.height &&
            test.y + test.height > planes.y
        ) {
            alert('ya dead buddy');
            // location.reload();
        }
    });
}
