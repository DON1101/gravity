import { Constant } from '../constant';

export class Vector {
    constructor(public x:number = 0, public y:number = 0) {}
};

export class Entity {
    public color: string = null;
    public mass: number = null;
    public position: Vector = null;
    public velocity: Vector = null;
    public acceleration: Vector = null;
    public force: Vector = null;

    public positionNew: Vector = new Vector();
    public velocityNew: Vector = new Vector();
    public accelerationNew: Vector = new Vector();
    public forceNew: Vector = new Vector();

    constructor(color:string="red",
                mass:number=0,
                position:Vector = new Vector(), velocity:Vector = new Vector(),
                acceleration:Vector = new Vector(), force:Vector = new Vector()) {
        this.color = color;
        this.mass = mass;
        this.position = position;
        this.velocity = velocity;
        this.acceleration = acceleration;
        this.force = force;
    }

    run() {
        this.positionNew.x = this.position.x + Constant.UNIT_TIME * this.velocity.x;
        this.positionNew.y = this.position.y + Constant.UNIT_TIME * this.velocity.y;

        this.velocityNew.x = this.velocity.x + Constant.UNIT_TIME * this.acceleration.x;
        this.velocityNew.y = this.velocity.y + Constant.UNIT_TIME * this.acceleration.y;

        this.accelerationNew.x = this.force.x / this.mass;
        this.accelerationNew.y = this.force.y / this.mass;

        if (this.positionNew.x <= 0) {
            this.positionNew.x = 0;
            this.velocityNew.x = -this.velocity.x;
        }
        if (this.positionNew.x >= Constant.MAP_WIDTH_UNIT/Constant.UNIT_DISTANCE) {
            this.positionNew.x = Constant.MAP_WIDTH_UNIT/Constant.UNIT_DISTANCE;
            this.velocityNew.x = -this.velocity.x;
        }
        if (this.positionNew.y <= 0) {
            this.positionNew.y = 0;
            this.velocityNew.y = -this.velocity.y;
        }
        if (this.positionNew.y >= Constant.MAP_HEIGHT_UNIT/Constant.UNIT_DISTANCE) {
            this.positionNew.y = Constant.MAP_HEIGHT_UNIT/Constant.UNIT_DISTANCE;
            this.velocityNew.y = -this.velocity.y;
        }
    }

    refresh() {
        this.position = this.positionNew;
        this.velocity = this.velocityNew;
        this.acceleration = this.accelerationNew;
        this.force.x = this.force.y = 0;
    }
};