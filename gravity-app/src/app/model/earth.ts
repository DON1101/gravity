import { Constant } from '../constant';
import { Entity, Vector } from './entity';

export class Earth extends Entity {
	constructor(color:string="red",
                mass:number=0,
                position:Vector = new Vector(), velocity:Vector = new Vector(),
                acceleration:Vector = new Vector(), force:Vector = new Vector()) {
		super(color, mass, position, velocity, acceleration, force);
	}

	run() {
		super.run();
		// this.mass += Constant.MASS_EARTH;
	}
}