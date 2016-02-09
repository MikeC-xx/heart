export const POINT_TYPE = {
  CONTROL: Symbol(),
  PATH: Symbol(),
};

const POINT_RADIUS = 3;

const POINT_TYPES = [
  POINT_TYPE.CONTROL,
  POINT_TYPE.PATH,
];

export class Point {
  constructor(x, y, type) {
    if (POINT_TYPES.find(x => x === type) === undefined) {
      throw 'Invalid point type';
    }

    this.x = x;
    this.y = y;
    this.type = type;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, POINT_RADIUS, 0, 2 * Math.PI);
    context.stroke();
    context.fill();
    context.closePath();
  }
}
