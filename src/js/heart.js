import { Point, POINT_TYPE } from './point';

const CANVAS_SIZE = 400;

export default class {
  constructor(canvas, controls, documentElement, windowElement) {
    if (!canvas) {
      return;
    }

    this.canvas = canvas;
    this.controls = controls;
    this.documentElement = documentElement;
    this.windowElement = windowElement;
    this.init();
  }

  init() {
    this.canvas.width = CANVAS_SIZE;
    this.canvas.height = CANVAS_SIZE;
    this.context = this.canvas.getContext('2d');
    this.points = [];
    this.points.push(new Point(0, CANVAS_SIZE / -8, POINT_TYPE.PATH));
    this.points.push(new Point(CANVAS_SIZE / 16, CANVAS_SIZE / -4, POINT_TYPE.CONTROL));
    this.points.push(new Point(CANVAS_SIZE / 5, CANVAS_SIZE / -4, POINT_TYPE.PATH));
    this.points.push(new Point(13 * CANVAS_SIZE / 36, CANVAS_SIZE / -4, POINT_TYPE.CONTROL));
    this.points.push(new Point(3 * CANVAS_SIZE / 8, CANVAS_SIZE / -12, POINT_TYPE.PATH));
    this.points.push(new Point(7 * CANVAS_SIZE / 18, CANVAS_SIZE / 6, POINT_TYPE.CONTROL));
    this.points.push(new Point(0, 3 * CANVAS_SIZE / 8, POINT_TYPE.PATH));
    this.points.push(new Point(7 * CANVAS_SIZE / -18, CANVAS_SIZE / 6, POINT_TYPE.CONTROL));
    this.points.push(new Point(3 * CANVAS_SIZE / -8, CANVAS_SIZE / -12, POINT_TYPE.PATH));
    this.points.push(new Point(13 * CANVAS_SIZE / -36, CANVAS_SIZE / -4, POINT_TYPE.CONTROL));
    this.points.push(new Point(CANVAS_SIZE / -5, CANVAS_SIZE / -4, POINT_TYPE.PATH));
    this.points.push(new Point(CANVAS_SIZE / -16, CANVAS_SIZE / -4, POINT_TYPE.CONTROL));

    this.beatScale = 1;
    this.shouldGrow = true;

    this.shouldDrawHeart = this.controls.querySelector('#should-draw-heart');
    this.shouldDrawCubicPoints = this.controls.querySelector('#should-draw-cubic-points');
    this.shouldHeartBeat = this.controls.querySelector('#should-heart-beat');
    this.scaleElement = this.controls.querySelector('#scale');
    this.rotateElement = this.controls.querySelector('#rotate');
    this.textElement = this.controls.querySelector('#text');
    this.titleElement = this.documentElement.querySelector('#title');
    this.titleInputElement = this.controls.querySelector('#title-text');
    this.sendButton = this.controls.querySelector('#send');

    let controlsChanged = () => {
      if (!this.shouldHeartBeat.checked) {
        this.draw();
      }

    };

    let hash = this.windowElement.location.hash;
    if (hash !== '') {
      let options = {};
      hash = hash.substr(1);
      [].forEach.call(hash.split('&'), (param) => {
        let value = param.split('=');
        if (value.length === 2) {
          options[value[0]] = decodeURI(value[1]);
        }

      });

      if (options.text !== undefined) {
        this.textElement.value = options.text;
      }

      if (options.controls === '0') {
        this.controls.classList.add('hidden');
      }

      if (options.title !== undefined) {
        this.titleElement.textContent = options.title;
        this.documentElement.title = options.title;
        this.titleInputElement.value = options.title;
      }

      if (options.heart) {
        if (options.heart === '1') {
          this.shouldDrawHeart.checked = true;
        } else {
          this.shouldDrawHeart.checked = false;
        }
      }

      if (options.points) {
        if (options.points === '1') {
          this.shouldDrawCubicPoints.checked = true;
        } else {
          this.shouldDrawCubicPoints.checked = false;
        }
      }

      if (options.beat) {
        if (options.beat === '1') {
          this.shouldHeartBeat.checked = true;
        } else {
          this.shouldHeartBeat.checked = false;
        }
      }

      if (options.rotate) {
        this.rotateElement.value = options.rotate;
      }

      if (options.scale) {
        this.scaleElement.value = options.scale;
      }

    }

    this.shouldDrawHeart.addEventListener('change', controlsChanged);
    this.shouldDrawCubicPoints.addEventListener('change', controlsChanged);
    this.shouldHeartBeat.addEventListener('change', () => { this.draw(); });
    this.scaleElement.addEventListener('change', controlsChanged);
    this.scaleElement.addEventListener('input', controlsChanged);
    this.rotateElement.addEventListener('change', controlsChanged);
    this.rotateElement.addEventListener('input', controlsChanged);
    this.textElement.addEventListener('change', controlsChanged);
    this.textElement.addEventListener('input', controlsChanged);
    this.titleInputElement.addEventListener('input', () => {
      this.titleElement.textContent = this.titleInputElement.value;
      this.documentElement.title = this.titleInputElement.value;
    });

    this.sendButton.addEventListener('click', () => {
      let url = `${this.windowElement.location.protocol}//${this.windowElement.location.host}${this.windowElement.location.pathname}`;
      url += `#title=${this.titleInputElement.value}&text=${this.textElement.value}&heart=${this.shouldDrawHeart.checked ? '1' : '0'}`;
      url += `&beat=${this.shouldHeartBeat.checked ? '1' : '0'}&points=${this.shouldDrawCubicPoints.checked ? '1' : '0'}`;
      url += `&scale=${this.scaleElement.value}&rotate=${this.rotateElement.value}&controls=0`;
      alert(`Copy and send this address:\n${encodeURI(url)}`);
    });

    this.draw();
  }

  draw() {
    let scale = this.scaleElement.value / 100;

    this.context.setTransform(1, 0, 0, 1, 0, 0);
    this.context.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    this.context.setTransform(scale * this.beatScale, 0, 0, scale * this.beatScale, CANVAS_SIZE / 2, 3 * CANVAS_SIZE / 7);
    this.context.rotate(this.rotateElement.value * Math.PI / 180);

    if (this.shouldDrawHeart.checked) {
      this.drawHeart();
    }

    if (this.shouldDrawCubicPoints.checked) {
      this.drawCubicPoints();
    }

    if (this.textElement.value !== '') {
      this.drawText();
    }

    if (this.shouldHeartBeat.checked) {
      if (this.beatScale > 1.1) {
        this.shouldGrow = false;
      } else if (this.beatScale < 1) {
        this.shouldGrow = true;
      }

      if (this.shouldGrow) {
        this.beatScale += 0.005;
      } else {
        this.beatScale -= 0.007;
      }

      this.windowElement.requestAnimationFrame(() => { this.draw(); });
    } else {
      this.beatScale = 1;
      this.shouldGrow = true;
    }

  }

  drawText() {
    this.context.shadowColor = 'rgba(0,0,0,0.5)';
    this.context.shadowOffsetX = 0;
    this.context.shadowOffsetY = 5;
    this.context.shadowBlur = 10;
    this.context.font = '30px Comic Sans MS';
    this.context.fillStyle = '#FFC107';
    this.context.textAlign = 'center';
    this.context.fillText(this.textElement.value.trim(), 0, 0);
  }

  drawHeart() {
    let first = true;

    this.context.lineWidth = 0;
    this.context.strokeWeight = 1;
    this.context.strokeStyle = 'rgba(0,0,0,0.5)';
    this.context.shadowColor = 'rgba(0,0,0,0.5)';
    this.context.shadowBlur = CANVAS_SIZE / 20;
    this.context.shadowOffsetY = this.context.shadowBlur / 3;
    this.context.beginPath();

    for (let i = 0; i < this.points.length; i++) {
      let point = this.points[i];

      if (first) {
        first = false;
        this.context.moveTo(point.x, point.y);
      } else {
        let next = i + 1 === this.points.length ? 0 : i + 1;
        this.context.quadraticCurveTo(point.x, point.y, this.points[next].x, this.points[next].y);
        i++;
      }
    }

    this.context.closePath();
    this.context.stroke();

    let gradient = this.context.createRadialGradient(0, CANVAS_SIZE / 25, CANVAS_SIZE / 40, 0, CANVAS_SIZE / 25, CANVAS_SIZE / 3);
    gradient.addColorStop(0, 'rgb(255, 0, 0)');
    gradient.addColorStop(1, 'rgb(120, 0, 0)');
    this.context.fillStyle = gradient;
    this.context.fill();
  }

  drawCubicPoints() {
    let pathPoints = this.points.filter(point => point.type === POINT_TYPE.PATH);

    this.context.lineWidth = 1;
    this.context.strokeStyle = 'rgba(0,0,0,0.5)';
    this.drawLines(pathPoints);

    this.context.strokeStyle = 'rgba(0,0,0,0.3)';
    this.drawLines(this.points);

    this.context.strokeStyle = 'rgb(0,255,255)';
    this.context.fillStyle = 'rgba(0,255,0,0.5)';
    [].forEach.call(pathPoints, (point) => {
      point.draw(this.context);
    });

    this.context.strokeStyle = 'rgba(0,0,255)';
    this.context.fillStyle = 'rgba(0,0,255,0.5)';
    [].forEach.call(this.points.filter(point => point.type === POINT_TYPE.CONTROL), (point) => {
      point.draw(this.context);
    });
  }

  drawLines(points) {
    let first = false;

    this.context.beginPath();
    [].forEach.call(points, (point) => {
      if (first) {
        first = false;
        this.context.moveTo(point.x, point.y);
      } else {
        this.context.lineTo(point.x, point.y);
      }

    });

    this.context.closePath();
    this.context.stroke();
  }
}
