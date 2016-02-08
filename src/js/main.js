'use strict';

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var size = 400;
canvas.width = size;
canvas.height = size;
var center = size / 2;
var half = center / 2;

var point1Stroke = 'rgb(0,255,255)';
var point1Fill = 'rgba(0,255,0,0.5)';
var point2Stroke = 'rgba(0,0,255)';
var point2Fill = 'rgba(0,0,255,0.5)';
var line1Stroke = 'rgba(0,0,0,0.5)';
var line2Stroke = 'rgba(0,0,0,0.3)';

var shouldDrawHeart = document.getElementById('should-draw-heart');
var shouldDrawPoints = document.getElementById('should-draw-points');
var scale = document.getElementById('scale');
var rotate = document.getElementById('rotate');
var beat = document.getElementById('beat');

// top left and right
var topLeft = {
  x: 4 * half / -5,
  y: half / -1,
};

var topRight = {
  x: 4 * half / 5,
  y: half / -1,
};

var topCenter = {
  x: 0,
  y: half / -2,
};

var midLeft = {
  x: 3 * half / -2,
  y: half / -3,
};

var midRight = {
  x: 3 * half / 2,
  y: half / -3,
};

var bottomCenter = {
  x: 0,
  y: 3 * half / 2,
};

var topLeftQ = {
  x: 13 * half / -9,
  y: half / -1,
};

var topRightQ = {
  x: 13 * half / 9,
  y: half / -1,
};

var topCenterLeftQ = {
  x: half / -1 / 4,
  y: half / -1,
};

var topCenterRightQ = {
  x: half / 4,
  y: half / -1,
};

var bottomLeftQ = {
  x: 3 * half / -2,
  y: 2 * half / 3,
};

var bottomRightQ = {
  x: 3 * half / 2,
  y: 2 * half / 3,
};

var drawHeart = () => {
  ctx.beginPath();
  ctx.lineWidth = 0;
  ctx.strokeWeight = 1;
  ctx.strokeStyle = 'rgba(0,0,0,0.5)';
  ctx.shadowColor = 'rgba(0,0,0,0.5)';
  ctx.shadowBlur = size / 20;
  ctx.shadowOffsetY = ctx.shadowBlur / 3;
  ctx.moveTo(midLeft.x, midLeft.y);
  ctx.quadraticCurveTo(topLeftQ.x, topLeftQ.y, topLeft.x, topLeft.y);
  ctx.quadraticCurveTo(topCenterLeftQ.x, topCenterLeftQ.y, topCenter.x, topCenter.y);
  ctx.quadraticCurveTo(topCenterRightQ.x, topCenterRightQ.y, topRight.x, topRight.y);
  ctx.quadraticCurveTo(topRightQ.x, topRightQ.y, midRight.x, midRight.y);
  ctx.quadraticCurveTo(bottomRightQ.x, bottomRightQ.y, bottomCenter.x, bottomCenter.y);
  ctx.quadraticCurveTo(bottomLeftQ.x, bottomLeftQ.y, midLeft.x, midLeft.y);
  ctx.stroke();

  var gradient = ctx.createRadialGradient(1, size / 20, 1, 1, 1, size);
  gradient.addColorStop(1, 'rgb(0, 0, 0)');
  gradient.addColorStop(0, 'rgb(255, 0, 0)');
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.closePath();
};

var drawPoint = (p) => {
  ctx.beginPath();
  ctx.arc(p.x, p.y, 4, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
};

var requestId;
var scaleDiff = 1;
var grow = false;

var init = () => {
  if (beat.checked) {
    if (scaleDiff > 1.1) {
      grow = false;
    } else if (scaleDiff <= 1) {
      grow = true;
    }

    if (grow) {
      scaleDiff += 0.005;
    } else {
      scaleDiff -= 0.007;
    }
  }

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, size, size);
  ctx.setTransform(scale.value / 100 * scaleDiff, 0, 0, scale.value / 100 * scaleDiff, size / 2, 3 * size / 7);
  ctx.rotate(rotate.value * Math.PI / 180);

  if (shouldDrawHeart.checked) {
    drawHeart();
  }

  if (shouldDrawPoints.checked) {
    ctx.lineWidth = 1;
    ctx.strokeStyle = point1Stroke;
    ctx.fillStyle = point1Fill;

    drawPoint(topLeft);
    drawPoint(topRight);
    drawPoint(topCenter);
    drawPoint(midLeft);
    drawPoint(midRight);
    drawPoint(bottomCenter);

    ctx.strokeStyle = point2Stroke;
    ctx.fillStyle = point2Fill;

    drawPoint(topLeftQ);
    drawPoint(topRightQ);
    drawPoint(topCenterLeftQ);
    drawPoint(topCenterRightQ);
    drawPoint(bottomLeftQ);
    drawPoint(bottomRightQ);

    ctx.beginPath();
    ctx.moveTo(topCenter.x, topCenter.y);
    ctx.strokeStyle = line1Stroke;
    ctx.lineTo(topLeft.x, topLeft.y);
    ctx.lineTo(midLeft.x, midLeft.y);
    ctx.lineTo(bottomCenter.x, bottomCenter.y);
    ctx.lineTo(midRight.x, midRight.y);
    ctx.lineTo(topRight.x, topRight.y);
    ctx.lineTo(topCenter.x, topCenter.y);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(topLeftQ.x, topLeftQ.y);
    ctx.strokeStyle = line2Stroke;
    ctx.lineTo(midLeft.x, midLeft.y);
    ctx.lineTo(bottomLeftQ.x, bottomLeftQ.y);
    ctx.lineTo(bottomCenter.x, bottomCenter.y);
    ctx.lineTo(bottomRightQ.x, bottomRightQ.y);
    ctx.lineTo(midRight.x, midRight.y);
    ctx.lineTo(topRightQ.x, topRightQ.y);
    ctx.lineTo(topRight.x, topRight.y);
    ctx.lineTo(topCenterRightQ.x, topCenterRightQ.y);
    ctx.lineTo(topCenter.x, topCenter.y);
    ctx.lineTo(topCenterLeftQ.x, topCenterLeftQ.y);
    ctx.lineTo(topLeft.x, topLeft.y);
    ctx.lineTo(topLeftQ.x, topLeftQ.y);
    ctx.stroke();
    ctx.closePath();
  }

  if (beat.checked) {
    requestId = window.requestAnimationFrame(init, canvas);
  }
};

var initEvent = () => {
  if (!beat.checked) {
    init();
  }

};

shouldDrawHeart.addEventListener('change', initEvent);

shouldDrawPoints.addEventListener('change', initEvent);

scale.addEventListener('mousedown', () => {
  scale.addEventListener('mousemove', initEvent);
});

scale.addEventListener('change', () => {
  scale.removeEventListener('mousemove', initEvent);
});

rotate.addEventListener('mousedown', () => {
  rotate.addEventListener('mousemove', initEvent);
});

rotate.addEventListener('change', () => {
  rotate.removeEventListener('mousemove', initEvent);
});

beat.addEventListener('change', () => {
  if (requestId) {
    window.cancelAnimationFrame(requestId);
    requestId = undefined;
  }

  if (!beat.checked) {
    scaleDiff = 1;
  }

  init();
});

init();
