const amounts = [20, 30, 40];

class Powerup {
    constructor(){
        this.x = Math.random() * (canvas.width - cellSize);
        this.y = (Math.floor(Math.random() *5) + 1) * cellSize + 25;
        this.width = cellSize * 0.6;
        this.height = cellSize * 0.6;
        this.amount = amounts[Math.floor(Math.random() * amounts.length)]
    }

    draw(){
        ctx.fillStyle = 'orange'
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'black'
        ctx.font = "20px Arial";
        ctx.fillText(this.amount, this.x + 15, this.y + 25);
    }

}
function handlePowerups(){
    if (frame % 500 === 0 && points < winScore){
        powerups.push(new Powerup());
    }
    for(let i= 0; i < powerups.length; i++){
        powerups[i].draw();
        if (powerups[i] && mouse.x && mouse.y && collision(powerups[i], mouse)){
            numberOfResources += powerups[i].amount;
            meters.push( new Meter('+' + powerups[i].amount, powerups[i].x, powerups[i].y, 30, black))
            meters.push(new Meter('+' + powerups[i].amount, 250, 50, 30, blue));
            powerups.splice(i,1);
            i--
        }
    }
}