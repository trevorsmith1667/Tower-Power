const enemyTypes = [];
const enemy1 = new Image();
    enemy1.src = './assets/spritesheet.png';
    enemyTypes.push(enemy1);
const enemy2 = new Image();
    enemy2.src = './assets/angryturtle.png'
    enemyTypes.push(enemy2);

 class Enemy {
    constructor(verticalPosition) {
        this.x = canvas.width;
        this.y = verticalPosition;
        this.width = cellSize -cellGap * 2;
        this.height = cellSize - cellGap * 2;
        this.speed = Math.random() * 0.2 + 0.4;
        this.movement = this.speed;
        this.health = 100;
        this.maxHealth = this.health;
        this.enemyType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
        this.frameX = 0;
        this.frameY = 0;
        this.minFrame = 0;
        this.maxFrame = 4;
        this.spriteWidth = 258;
        this.spriteHeight = 258;
    }

    updateMove() {
        this.x -= this.movement;
        if (frame% 10 === 0){
            if (this.frameX < this.maxFrame) this.frameX++;
            else {
                this.frameX = this.minFrame;
            }
        }

    }

    draw() {
        // ctx.fillStyle = 'blue'
        // ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 30)
        ctx.drawImage(this.enemyType, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }
}

function handleEnemies(){
    for (let i = 0; i < enemies.length; i++){
        enemies[i].updateMove();
        enemies[i].draw();
        if (enemies[i].x < 0){
            gameOver = true;
        }
        if (enemies[i].health <= 0){
            let moneyEarned = enemies[i].maxHealth/10;
            meters.push(new Meter('+' + moneyEarned, enemies[i].x, enemies[i].y, 30, 'black'))
            meters.push(new Meter('+' + moneyEarned, 250, 50, 30, 'blue'));
            numberOfResources += moneyEarned;
            points += moneyEarned;
            const findIndex = enemyPosition.indexOf(enemies[i].y)
            enemyPosition.splice(findIndex, 1)
            enemies.splice(i, 1);
            i--;
    
        }
    }
    if (frame % enemiesInterval === 0){
        let verticalPosition = Math.floor(Math.random() * 5 + 1) * cellSize + cellGap;
        enemies.push(new Enemy(verticalPosition));
        enemyPosition.push(verticalPosition);
        if (enemiesInterval > 120) enemiesInterval -= 50;
    }
}