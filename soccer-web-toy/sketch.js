let ballX, ballY, ballSize = 50;
let goalX, goalY, goalW = 200, goalH = 100;
let dragging = false;
let score = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ballX = width / 2;
  ballY = height / 2;
  goalX = 100;
  goalY = height / 2 - 50;
}

function draw() {
  background(0, 200, 0);

  noFill();
  stroke(255);
  strokeWeight(4);
  rect(goalX, goalY, goalW, goalH);

  stroke(0);
  strokeWeight(2);
  for (let i = 1; i <= 4; i++) {
    line(goalX + i * (goalW / 5), goalY, goalX + i * (goalW / 5), goalY + goalH);
    line(goalX, goalY + i * (goalH / 5), goalX + goalW, goalY + i * (goalH / 5));
  }

  if (dragging) {
    ballX = mouseX;
    ballY = mouseY;
  }

  fill(255);
  stroke(0);
  strokeWeight(4);
  ellipse(ballX, ballY, ballSize, ballSize);
  
  fill(0);
  let patchRadius = ballSize / 4;
  for (let angle = 0; angle < TWO_PI; angle += PI / 3) {
    let offsetX = cos(angle) * patchRadius;
    let offsetY = sin(angle) * patchRadius;
    ellipse(ballX + offsetX, ballY + offsetY, patchRadius * 2, patchRadius * 2);
  }

  textSize(24);
  textAlign(CENTER, CENTER);
  
  fill(200, 200, 200);

  textFont("Comic Sans MS");

  text("Drag the ball into the goal!", width / 2, 40);
  text("Score: " + score, width / 2, 80);
}


function mousePressed() {
  if (dist(ballX, ballY, mouseX, mouseY) < ballSize / 2) {
    dragging = true;
  }
}

function mouseReleased() {
  dragging = false;
  if (ballX > goalX && ballX < goalX + goalW && ballY > goalY && ballY < goalY + goalH) {
    score++;
    do {
      ballX = random(ballSize / 2, width - ballSize / 2);
      ballY = random(ballSize / 2, height - ballSize / 2);
    } while (
      ballX > goalX - ballSize / 2 &&
      ballX < goalX + goalW + ballSize / 2 &&
      ballY > goalY - ballSize / 2 &&
      ballY < goalY + goalH + ballSize / 2
    );
  }
}
