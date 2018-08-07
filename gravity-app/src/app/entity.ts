import { Constant } from './constant';

export class Vector {
    constructor(public x:number = 0, public y:number = 0) {}
};

export class Entity {
    public position: Vector = null;
    public velocity: Vector = null;
    public acceleration: Vector = null;

    constructor(position:Vector, velocity:Vector, acceleration:Vector) {
        this.position = position;
        this.velocity = velocity;
        this.acceleration = acceleration;
    }

    run() {
        this.position.x = this.position.x + Constant.UNIT_TIME * this.velocity.x;
        this.position.y = this.position.y + Constant.UNIT_TIME * this.velocity.y;

        this.velocity.x = this.velocity.x + Constant.UNIT_TIME * this.acceleration.x;
        this.velocity.y = this.velocity.y + Constant.UNIT_TIME * this.acceleration.y;

        if (this.position.x <= 0) {
            this.position.x = 0;
            this.velocity.x = -this.velocity.x;
        }
        if (this.position.x >= Constant.MAP_WIDTH_UNIT) {
            this.position.x = Constant.MAP_WIDTH_UNIT;
            this.velocity.x = -this.velocity.x;
        }
        if (this.position.y <= 0) {
            this.position.y = 0;
            this.velocity.y = -this.velocity.y;
        }
        if (this.position.y >= Constant.MAP_HEIGHT_UNIT) {
            this.position.y = Constant.MAP_HEIGHT_UNIT;
            this.velocity.y = -this.velocity.y;
        }
    }
};