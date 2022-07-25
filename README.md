# Parallax-game
A page with a moving background that looks natural

## Where to start?
In the beginning of this assigment I wasn't sure how to start, until I found something called a Canvas. 
After some more research about the setup of a canvas and after some playful time in the weekend with Phaser, I realized I could setup this fairly easy. 
So I started to upload all the images I needed, setup the HTML + the canvas and voila! Mission was born...

### Html Part
```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Parallax Game</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<canvas id="canvas1"></canvas>

<script type="module" src="script.js"></script>
</body>
</html>
```

### CSS Part
```css
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body{
    background: black;
}

#canvas1{
    position: absolute;
    width: 1750px;
    height: 850px;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    max-height: 100%;
    max-width: 100%;
}

```

### JS Part
```js
const canvas = document.getElementById('canvas1');
// Create an instance of build-in 2d
    const ctx = canvas.getContext('2d');
    const CANVAS_WIDTH = canvas.width = 1920;
    const CANVAS_HEIGHT = canvas.height = 1080;
```


## More into Detail
After the Mission was born I realized I will need to (preload) all the images and make a function for the animation part. 
So first I uploaded all the images.
```js
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
```
After the uploading I need to get the pictures visually in my canvas. I first had some problems getting the ground picture right since it took the top and it was not visible. 
After changing the value at the Y-axis to -350, I noticed that the ground was visible: 
```js
function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(ground, x, 0);
    requestAnimationFrame(animate);
}
animate();
```
Nice! I could switch up the uploaded images and they would all be animated.

### Too much Spaghetti Code!
Since I had to repeat myself twenty times on the animate function, I started looking for a better way without repeating the code.
So I made a class Layer: 
```js
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
```
From This Layer class I needed two parameters to setup a new Layer (image, speedModifier).
```js
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
```
Afterwards in my animate function I could reduce the lines to: 
```js
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
```
I'm still checking to all put this in an array so we dont have to repeat ourself for the layers in the animate function!
I also noticed that all my pictures weren't in the assets folder, so I changed this to make my git alot more easier to read.
### The result for now: 
https://michaelmontei.github.io/Parallax-game/

## The Mission
In this repository you will find some images. If you position them over eachother in the right order you will get a pretty background. Our goal now will be to animate each piece based on how far it is in the background. The first layer (the ground) will move fastest, the last (the sky) will be static.

## Must-have features

- A page with a moving background that looks natural

- Something of your personal choosing to enhance the page, go take a look at the suggestions or come up with something yourself!

## Suggestions
- Make a platform game / endless runner

- Make an infomercial for the environment (or anything else)

- Make your own images to use for the parallax

- Enhance the scenery with some characters

- Make a short movie, you can stop the scroller or make it go in any direction and add some characters

- ANYTHING REALLY!! (Go chat it up with your coach if you want some approval!)
