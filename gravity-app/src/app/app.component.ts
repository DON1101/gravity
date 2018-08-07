import { Component, ViewChild, ElementRef, Inject } from '@angular/core';
import { interval } from 'rxjs';
import { Constant } from './constant';
import { Vector, Entity } from './entity';

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

    private planet: Entity;
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

        let x = Math.floor(Math.random() * Constant.MAP_WIDTH_UNIT);
        let y = Math.floor(Math.random() * Constant.MAP_HEIGHT_UNIT);
        this.planet = this.init_entity(x, y, x, y, x, y);

        this.run();
        this.startTimer();
    }

    private run = () => {
        this.requestAnimFrame(this.drawMap);
        // Planet run
        this.planet.run();
        setTimeout(this.run, Constant.UNIT_FRAME);
    }

    private init_entity(p_x:number, p_y:number,
                        v_x:number, v_y:number,
                        a_x:number, a_y:number) {
        let position = new Vector(p_x, p_y);
        let velocity = new Vector(v_x, v_y);
        let acceleration = new Vector(a_x, a_y);
        return new Entity(position, velocity, acceleration);
    }

    private drawMap = () => {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = 'red';
        this.context.fillRect(
            this.planet.position.x*Constant.UNIT_SIZE, 
            this.planet.position.y*Constant.UNIT_SIZE, 
            Constant.UNIT_SIZE, 
            Constant.UNIT_SIZE
        );
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
