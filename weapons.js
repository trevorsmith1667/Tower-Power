class Weapon {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 20;
        this.damage = 20;
        this.speed = 5;
    }
    update(){
        this.x += this.speed;
    }

    draw(){
        ctx.fillStyle = 'black'
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
        ctx.fill();
    }
}

function handleWeapons(){
    for(let i = 0; i < weapons.length; i++){
        weapons[i].update();
        weapons[i].draw();

        for(let j = 0; j < enemies.length; j++){
            if (enemies[j] && weapons[i] && collision(weapons[i], enemies[j])){
                enemies[j].health -= weapons[i].damage;
                weapons.splice(i, 1);
                i--;
            }

            if (weapons[i] && weapons[i].x > canvas.width - cellSize){
            weapons.splice(i, 1);
            i--
            }
        }
    }
}