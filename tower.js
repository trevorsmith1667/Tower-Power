class Tower {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = cellSize;
        this.height = cellSize;
        this.shoot = false;
        this.health = 100;
        this.projectiles = [];
        this.timer = 0;
    }

    draw() {
        ctx.fillStyle = "purple";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 30)
    }
    update(){
        this.timer++;
        if (this.timer % 100 === 0){
            weapons.push(new Weapon(this.x + 70, this.y + 70));

        }
    }
}
canvas.addEventListener('click', function () {
    const gridPositionX = mouse.x - (mouse.x % cellSize);
    const gridPositionY = mouse.y - (mouse.y % cellSize);
    if (gridPositionY < cellSize) return;
    for (let i = 0; i < towers.length; i++) {
        if (towers[i].x === gridPositionX && towers[i].y === gridPositionY)
            return;
    }
    let towerCost = 100;
    if (numberOfResources >= towerCost) {
        towers.push(new Tower(gridPositionX, gridPositionY));
        numberOfResources -= towerCost;
    }
});
function handleTowers() {
    for (let i = 0; i < towers.length; i++) {
        towers[i].draw();
        towers[i].update();
        for(let j = 0; j < enemies.length; j++){
            if (collision(towers[i], enemies[j])){
                enemies[j].movement = 0
                towers[i].health -= 0.2;
            }
            if (towers[i] && towers[i].health <= 0){
                towers.splice(i, 1)
                i--;
                enemies[j].movement = enemies[j].speed
            }
        }
    }
}