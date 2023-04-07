// Set up the soccer ball and goal
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
  // Change the background color to green (R, G, B)
  background(0, 200, 0);

  // Draw the goal with a white border and transparent fill
  noFill();
  stroke(255);
  strokeWeight(4);
  rect(goalX, goalY, goalW, goalH);

  // Draw black lines as a net inside the goal (both vertical and horizontal)
  stroke(0);
  strokeWeight(2);
  for (let i = 1; i <= 4; i++) {
    line(goalX + i * (goalW / 5), goalY, goalX + i * (goalW / 5), goalY + goalH);
    line(goalX, goalY + i * (goalH / 5), goalX + goalW, goalY + i * (goalH / 5));
  }

  // If dragging, move the ball
  if (dragging) {
    ballX = mouseX;
    ballY = mouseY;
  }

  // Draw the soccer ball with a white base and black patches
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
  
  // Change the text color to a lighter gray (R, G, B)
  fill(200, 200, 200);

  // Set the text font type to a more readable cursive font
  textFont("Comic Sans MS");

  text("Drag the ball into the goal!", width / 2, 40);
  text("Score: " + score, width / 2, 80);
}


// Check if the ball is being dragged
function mousePressed() {
  if (dist(ballX, ballY, mouseX, mouseY) < ballSize / 2) {
    dragging = true;
  }
}

// When the mouse is released, check if the ball is in the goal
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
