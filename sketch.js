let hitSprite, jumpSprite;
let hitFrames = [], jumpFrames = [];
let currentAnimation = null;
let frameIndex = 0;
let frameDelay = 10, frameCounter = 0;
let hitFrameWidth = 51, hitFrameHeight = 52;
let jumpFrameWidth = 50, jumpFrameHeight = 42;

function preload() {
  hitSprite = loadImage('hit.png');
  jumpSprite = loadImage('jump.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  let btn1 = createButton('自我介紹');
  btn1.position(150, 50);
  btn1.size(100, 50);
  btn1.style('font-size', '20px');
  btn1.mouseOver(() => startAnimation('hit'));
  btn1.mouseOut(() => stopAnimation());

  let btn2 = createButton('作品簡介');
  btn2.position(280, 50);
  btn2.size(100, 50);
  btn2.style('font-size', '20px');
  btn2.mouseOver(() => startAnimation('jump'));
  btn2.mouseOut(() => stopAnimation());
  
  extractFrames();
}

function extractFrames() {
  if (hitSprite) {
    for (let i = 0; i < 5; i++) {
      let img = createImage(hitFrameWidth, hitFrameHeight);
      img.copy(hitSprite, i * hitFrameWidth, 0, hitFrameWidth, hitFrameHeight, 0, 0, hitFrameWidth, hitFrameHeight);
      hitFrames.push(img);
    }
  }
  
  if (jumpSprite) {
    for (let i = 0; i < 6; i++) {
      let img = createImage(jumpFrameWidth, jumpFrameHeight);
      img.copy(jumpSprite, i * jumpFrameWidth, 0, jumpFrameWidth, jumpFrameHeight, 0, 0, jumpFrameWidth, jumpFrameHeight);
      jumpFrames.push(img);
    }
  }
}

function draw() {
  background(220);
  if (currentAnimation) {
    frameCounter++;
    if (frameCounter >= frameDelay) {
      frameCounter = 0;
      frameIndex = (frameIndex + 1) % currentAnimation.length;
    }
    image(currentAnimation[frameIndex], 50, 150, 200, 200); // 修改圖片位置
  }
}

function startAnimation(type) {
  if (type === 'hit' && hitFrames.length > 0) {
    currentAnimation = hitFrames;
  } else if (type === 'jump' && jumpFrames.length > 0) {
    currentAnimation = jumpFrames;
  }
  frameIndex = 0;
  frameCounter = 0;
}

function stopAnimation() {
  currentAnimation = null;
}