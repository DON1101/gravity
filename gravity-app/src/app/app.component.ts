import { Component, ViewChild, ElementRef, Inject } from '@angular/core';
import { interval } from 'rxjs';
import { Constant } from './constant';
import { Vector, Entity } from './model/entity';
import { Earth } from './model/earth';
import { Jupiter } from './model/jupiter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
      { provide: Window, useValue: window }  
  ]
})
export class AppComponent {
    constructor(@Inject(Window) private _window: Window) {}
    @ViewChild("main_canvas") canvasRef: ElementRef;

    private sun: Entity;
    private earth: Entity;
    private mars: Entity;
    private jupiter: Entity;
    private saturn: Entity;
    private entityList = [];
    private requestAnimFrame;
    private canvas = null;
    private context = null;
    private timeElapsed = 0;
    private subscription = null;

    ngOnInit() {
        this.canvas = this.canvasRef.nativeElement;
        this.context = this.canvas.getContext('2d');
        this.canvas.height = Constant.UNIT_SIZE * Constant.MAP_HEIGHT_UNIT;
        this.canvas.width = Constant.UNIT_SIZE * Constant.MAP_WIDTH_UNIT;
        this.initRender();

        this.entityList.push(this.init_sun());
        this.entityList.push(this.init_earth());
        // this.entityList.push(this.init_jupiter());
        // this.entityList.push(this.init_saturn());
        // this.entityList.push(this.init_mars());

        this.run();
        this.render();
        this.startTimer();
    }

    private run = () => {
        this.gravity_refresh();
        setTimeout(this.run, Constant.UNIT_FRAME_RUN);
    }

    private render = () => {
        this.requestAnimFrame(this.drawMap);
        setTimeout(this.render, Constant.UNIT_FRAME_RENDER);
    }

    private gravity_refresh() {
        // Run with last state
        for (var i = 0; i < this.entityList.length; i++) {
            let entity = this.entityList[i];
            entity.run();
        }
        // Refresh current state
        for (var i = 0; i < this.entityList.length; i++) {
            let entity = this.entityList[i];
            entity.refresh();
        }
        for (var i = 0; i < this.entityList.length; i++) {
            let entityA = this.entityList[i];
            for (var j = i + 1; j < this.entityList.length; j++) {
                let entityB = this.entityList[j];
                let distance2 = Math.pow(entityA.position.x - entityB.position.x, 2) + Math.pow(entityA.position.y - entityB.position.y, 2);
                let cos = (entityB.position.x - entityA.position.x) / Math.sqrt(distance2);
                let sin = (entityB.position.y - entityA.position.y) / Math.sqrt(distance2);
                let gravity = Constant.GRAVITY_CONST * entityA.mass * entityB.mass / distance2;
                entityA.force.x += gravity * cos;
                entityA.force.y += gravity * sin;
                entityB.force.x += -entityA.force.x;
                entityB.force.y += -entityA.force.y;
            }
        }
    }

    private init_earth() {
        let position = new Vector(Constant.MAP_WIDTH_UNIT/2/Constant.UNIT_DISTANCE,
                                  Constant.MAP_HEIGHT_UNIT/2/Constant.UNIT_DISTANCE - Constant.DISTANCE_EARTH);
        let velocity = new Vector(Constant.VELOCITY_EARTH, 0);
        this.earth = new Earth('blue', Constant.MASS_EARTH, position, velocity);
        return this.earth;
    }

    private init_mars() {
        let position = new Vector(Constant.MAP_WIDTH_UNIT/2/Constant.UNIT_DISTANCE,
                                  Constant.MAP_HEIGHT_UNIT/2/Constant.UNIT_DISTANCE - Constant.DISTANCE_MARS);
        let velocity = new Vector(Constant.VELOCITY_MARS, 0);
        this.mars = new Entity('orange', Constant.MASS_EARTH, position, velocity);
        return this.mars;
    }

    private init_jupiter() {
        let position = new Vector(Constant.MAP_WIDTH_UNIT/2/Constant.UNIT_DISTANCE,
                                  Constant.MAP_HEIGHT_UNIT/2/Constant.UNIT_DISTANCE - Constant.DISTANCE_JUPITER);
        let velocity = new Vector(Constant.VELOCITY_JUPITER, 0);
        this.jupiter = new Jupiter('yellow', Constant.MASS_JUPITER, position, velocity);
        return this.jupiter;
    }

    private init_saturn() {
        let position = new Vector(Constant.MAP_WIDTH_UNIT/2/Constant.UNIT_DISTANCE,
                                  Constant.MAP_HEIGHT_UNIT/2/Constant.UNIT_DISTANCE - Constant.DISTANCE_SATURN);
        let velocity = new Vector(Constant.VELOCITY_SATURN, 0);
        this.saturn = new Entity('#FFCC66', Constant.MASS_SATURN, position, velocity);
        return this.saturn;
    }

    private init_sun() {
        let position = new Vector(Constant.MAP_WIDTH_UNIT/2/Constant.UNIT_DISTANCE,
                                  Constant.MAP_HEIGHT_UNIT/2/Constant.UNIT_DISTANCE);
        this.sun = new Entity('red', Constant.MASS_SUN, position);
        return this.sun;
    }

    private drawMap = () => {
        // this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (var i = 0; i < this.entityList.length; i++) {
            let entity = this.entityList[i];
            let mapPosX = entity.position.x * Constant.UNIT_DISTANCE * Constant.UNIT_SIZE;
            let mapPosY = entity.position.y * Constant.UNIT_DISTANCE * Constant.UNIT_SIZE;
            this.context.fillStyle = entity.color;
            this.context.fillRect(
                mapPosX, 
                mapPosY, 
                Constant.UNIT_SIZE * Constant.ENTITY_RADIUS_UNIT, 
                Constant.UNIT_SIZE * Constant.ENTITY_RADIUS_UNIT
            );
            // Draw force sum
            // this.context.beginPath();
            // this.context.strokeStyle = entity.color;
            // this.context.moveTo(
            //     mapPosX + Constant.UNIT_SIZE * Constant.ENTITY_RADIUS_UNIT/2, 
            //     mapPosY + Constant.UNIT_SIZE * Constant.ENTITY_RADIUS_UNIT/2);
            // this.context.lineTo(
            //     mapPosX + Constant.UNIT_SIZE * Constant.ENTITY_RADIUS_UNIT/2 + entity.force.x * Constant.UNIT_FORCE,
            //     mapPosY + Constant.UNIT_SIZE * Constant.ENTITY_RADIUS_UNIT/2 + entity.force.y * Constant.UNIT_FORCE);
            // this.context.stroke();
        }
    }

    private initRender = () => {
        this.requestAnimFrame = 
            this._window.requestAnimationFrame       ||
            this._window.webkitRequestAnimationFrame ||
            function( callback ){
                this._window.setTimeout(callback, 1000 / 60);
            };
    }

    private startTimer = () => {
        this.stopTimer();
        this.subscription = interval(1000).subscribe(res => {
            this.timeElapsed++;
        });
    }

    private stopTimer = () => {
        if (this.subscription != null) {
            this.subscription.unsubscribe();
        }
    }

    private resetTimer = () => {
        this.stopTimer();
        this.timeElapsed = 0;
    }
}
