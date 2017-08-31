import {square} from './sqare';

class snake {

    private ctx:CanvasRenderingContext2D;
    private width:number;
    private height:number;
    private settingsHolder:HTMLElement;
    private scoreHolder:HTMLElement;
    private scoreDiv:HTMLElement;
    private interval:any;
    private keyPushed = false;
    private squareWidth = 20;
    private xBoxes:number;
    private yBoxes:number;
    private player:square = {x: 10, y: 10};
    private apple:square = {x:15, y:15};
    private velocity:square = {x:1, y:0};
    private trail:any = [];
    private tail = 5;

    constructor(canvasId:string, ticksPerSecond:number){
        const canv = <HTMLCanvasElement>document.getElementById(canvasId);
        this.scoreDiv = document.getElementById('score');
        this.settingsHolder = document.getElementById('settingsHolder');
        this.scoreHolder = document.getElementById('scoreHolder');
        this.ctx = canv.getContext("2d");
        this.width = canv.width;
        this.height = canv.height;
        this.xBoxes = Math.floor(this.width / this.squareWidth);
        this.yBoxes = Math.floor(this.height / this.squareWidth);
        this.settingsHolder.style.display = 'none';

        this.setBackground();
        this.drawApple();
        this.interval = setInterval(()=>{
            this.gameTick()},1000/ticksPerSecond
        );
        document.addEventListener('keydown',(e:KeyboardEvent) => {
            this.keyPush(e);
        });
    }

    drawSquare(point:square, color:string){
        this.ctx.fillStyle = color;
        this.ctx.fillRect(point.x * this.squareWidth,point.y * this.squareWidth,this.squareWidth-2,this.squareWidth-2);
    }

    setBackground() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0,0, this.xBoxes * this.squareWidth, this.yBoxes * this.squareWidth);
    }

    drawApple() {
        this.drawSquare(this.apple, 'green');
    }

    setNewPoint() {
        this.player.x += this.velocity.x;
        this.player.y += this.velocity.y;
        if(this.player.x < 0) {
            this.player.x = this.xBoxes-1;
        }
        if(this.player.x > this.xBoxes-1) {
            this.player.x = 0;
        }
        if(this.player.y < 0) {
            this.player.y = this.yBoxes-1;
        }
        if(this.player.y > this.yBoxes-1) {
            this.player.y = 0;
        }
        this.keyPushed = false;
    }

    renewSnake() {
        for (let point of this.trail) {
            this.drawSquare(point, 'yellow');
            if(this.checkIfSamePosition(point, this.player)) {
                this.finishGame(point);
            }
        }
        this.trail.push({x:this.player.x, y:this.player.y});
        while(this.trail.length > this.tail) {
            let point = this.trail.shift();
            this.drawSquare(point, 'black');
        }
    }

    checkIfSamePosition(firstPoint:square, secondPoint: square) {
        return firstPoint.x === secondPoint.x && firstPoint.y === secondPoint.y;
    }

    checkForApple() {
        if(this.checkIfSamePosition(this.apple, this.player)) {
            this.tail++;
            while(true){
                this.apple = {
                    x: Math.floor(Math.random() * this.xBoxes),
                    y: Math.floor(Math.random() * this.yBoxes)
                };
                if(!this.appleIsInsideSnake()) {
                    break;
                }
            }
            this.drawApple();
            this.setScore();
        }
    }

    appleIsInsideSnake() {
        for (let point of this.trail) {
            if(this.checkIfSamePosition(this.apple, point)){
                return true;
            }
        }
        return false;
    }

    finishGame(point:square) {
        setTimeout(()=>{
            this.drawSquare(point, 'red');
            clearInterval(this.interval);
            this.settingsHolder.style.display = 'block';
        }, 10)
    }

    setScore() {
        let score = this.tail - 5;
        this.scoreHolder.style.display = 'block';
        this.scoreDiv.innerText = '' + score;
    }

    gameTick() {
        this.setNewPoint();
        this.renewSnake();
        this.checkForApple();
    }

    keyPush(evt:KeyboardEvent) {
        if(!this.keyPushed){
            this.keyPushed = true;
            switch(evt.keyCode) {
                case 37:
                    if(this.velocity.x !== 1 && this.velocity.y !== 0){
                        this.velocity = {x:-1, y:0};
                    }
                    break;
                case 38:
                    if(this.velocity.x !== 0 && this.velocity.y !== 1){
                        this.velocity = {x:0, y:-1};
                    }
                    break;
                case 39:
                    if(this.velocity.x !== -1 && this.velocity.y !== 0){
                        this.velocity = {x:1, y:0};
                    }
                    break;
                case 40:
                    if(this.velocity.x !== 0 && this.velocity.y !== -1){
                        this.velocity = {x:0, y:1};
                    }
                    break;
            }
        }
    }
}

let button = document.getElementById('start');
button.onclick = () => {
    let input = <HTMLInputElement>document.getElementById('ticks');
    new snake('snake', +input.value);
};
