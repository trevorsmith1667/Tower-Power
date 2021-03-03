
const canvas = document.getElementById("canvas1")
const ctx = canvas.getContext('2d');
canvas.width = 900;
canvas.height = 600;

const cellSize = 100;
const cellGap = 3;
const gameGrid = [];
const towers = [];
const enemies = [];
const enemyPosition = [];
const weapons = [];
const powerups = [];
const winScore = 50;
let points = 0;
let numberOfResources = 300;
let enemiesInterval = 600;
let frame = 0;
let gameOver = false;


const mouse = {
    x: 10,
    y: 10,
    width: 0.1,
    height: 0.1
}
let canvasPosition = canvas.getBoundingClientRect();
canvas.addEventListener('mousemove', function(e){
    mouse.x = e.x - canvasPosition.left;
    mouse.y = e.y - canvasPosition.top;
})
canvas.addEventListener('mouseleave', function(){
    mouse.x = undefined;
    mouse.y = undefined;
})



const controlsBar = {
    width: canvas.width,
    height: cellSize,
}

class Cell {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = cellSize;
        this.height = cellSize;
    }
    draw() {
        if (mouse.x && mouse.y && collision(this, mouse)){
        ctx.strokeStyle = 'black';
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    }
}

function createGrid(){
    for (let y = cellSize; y < canvas.height; y += cellSize){
        for (let x = 0; x < canvas.width; x += cellSize){
            gameGrid.push(new Cell(x, y));

        }
    }
}

createGrid();
function handleGameGrid(){
    for (let i = 0; i < gameGrid.length; i++){
        gameGrid[i].draw();
    }
}
