const tower1 = new Image();
    tower1.src = './assets/defender1.png';
const tower2 = new Image();
    tower2.src = './assets/defender2.png'


class Tower {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = cellSize - cellGap * 2;
        this.height = cellSize - cellGap * 2;
        this.shoot = false;
        this.shooting = false;
        this.health = 100;
        this.weapons = [];
        this.timer = 0;
        this.frameX = 0; 
        this.frameY = 0;
        this.spriteWidth = 194; 
        this.spriteHeight = 194;
        this.minFrame = 0; 
        this.maxFrame = 16;
        this.chosenTower = chosenTower

    }

    draw() {
        
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 10)
        if (this.chosenTower === 1){
            ctx.drawImage(tower1, this.frameX * this.spriteWidth, 0, this.spriteWidth, 
                this.spriteHeight, this.x, this.y, this.width, this.height);
        } else if (this.chosenTower === 2){
            ctx.drawImage(tower2, this.frameX * this.spriteWidth, 0, this.spriteWidth,
                this.spriteHeight, this.x, this.y, this.width, this.height);
        }
    }
    update(){
        //this line will set shoot speed 
    if (frame % 8 === 0){
        if (this.frameX < this.maxFrame) this.frameX++;
        else {this.frameX = this.minFrame}
        if (this.frameX === 15) this.shooting = true;
    }

    if (this.shoot){
        this.minFrame = 0;
        this.maxFrame = 15;
    }else {
        this.minFrame = 17;
        this.maxFrame = 23
    }
        if (this.shoot && this.shooting){ 
            //this will affect vertical weapon position
            weapons.push(new Weapon(this.x + 70, this.y + 40));  
            this.shooting = false;   
        }
    };
}
canvas.addEventListener('click', function () {
    const gridPositionX = mouse.x - (mouse.x % cellSize) + cellGap;
    const gridPositionY = mouse.y - (mouse.y % cellSize) + cellGap;
    if (gridPositionY < cellSize) return;
    for (let i = 0; i < towers.length; i++) {
        if (towers[i].x === gridPositionX && towers[i].y === gridPositionY)
            return;
    }
    let towerCost = 100;
    if (numberOfResources >= towerCost) {
        towers.push(new Tower(gridPositionX, gridPositionY));
        numberOfResources -= towerCost;
    } else {
        meters.push(new Meter("Not Enough Resources", mouse.x, mouse.y, 20, 'green'))
    }
});
function handleTowers() {
    for (let i = 0; i < towers.length; i++) {
        towers[i].draw();
        towers[i].update();
        if(enemyPosition.indexOf(towers[i].y) !== -1){
            towers[i].shoot = true;
        } else{
             towers[i].shoot = false
        };
        for(let j = 0; j < enemies.length; j++){
            if (towers[i] && collision(towers[i], enemies[j])){
                enemies[j].movement = 0
                towers[i].health -= 1;
            }
            if (towers[i] && towers[i].health <= 0){
                towers.splice(i, 1)
                i--;
                enemies[j].movement = enemies[j].speed
            }
        }
    }
}
const card1 = {
    x: 10, 
    y: 10, 
    width: 70, 
    height: 85
}

const card2 = {
    x: 90, 
    y: 10, 
    width: 70, 
    height: 85
}
function chooseTower(){
    let card1stroke = 'black'
    let card2stroke = 'black'
    if (collision(mouse, card1) && mouse.clicked){
        chosenTower = 1
    } else if (collision(mouse, card2) && mouse.clicked){
        chosenTower = 2;
    }
    if (chosenTower === 1){
        card1stroke = "silver"
        card2stroke = 'black'
    } else if (chosenTower === 2){
        card1stroke = 'black'
        card2stroke = 'silver'

    } else {
        card1stroke = 'black'
        card2stroke = 'silver'
    }
    

    ctx.lineWidth = 1;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(card1.x, card1.y, card1.width, card1.height);
    ctx.strokeStyle = card1stroke;
    ctx.strokeRect(card1.x, card1.y, card1.width, card1.height);
    ctx.drawImage(tower1, 0, 0, 194, 194, 0, 5, 194/2, 194/2);
    ctx.fillRect(card2.x, card2.y, card2.width, card2.height);
    ctx.drawImage(tower2, 0, 0, 194, 194, 80, 5, 194 / 2, 194 / 2);
    ctx.strokeStyle = card2stroke;
    ctx.strokeRect(card2.x, card2.y, card2.width, card2.height);

}
