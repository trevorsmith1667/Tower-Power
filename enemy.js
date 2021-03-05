
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
    }

    updateMove() {
        this.x -= this.movement;
    }

    draw() {
        ctx.fillStyle = 'blue'
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 30)
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
            numberOfResources += moneyEarned;
            points += moneyEarned;
            const findIndex = enemyPosition.indexOf(enemies[i].y)
            enemyPosition.splice(findIndex, 1)
            enemies.splice(i, 1);
            i--;
            console.log(enemyPosition);
        }
    }
    if (frame % enemiesInterval === 0){
        let verticalPosition = Math.floor(Math.random() * 5 + 1) * cellSize + cellGap;
        enemies.push(new Enemy(verticalPosition));
        enemyPosition.push(verticalPosition);
        if (enemiesInterval > 120) enemiesInterval -= 50;
    }
}