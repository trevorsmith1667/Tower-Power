const meters = []
class Meter {
    constructor(value, x, y, size, color){
        this.value = value;
        this.x = x;
        this.y = y;
        this.size = size;
        this.lifespan = 0;
        this.color = color;
        this.opacity = 1;
    }
    update(){
        this.y -= 0.3;
        this.lifespan += 1;
        if (this.opacity > 0.01) this.opacity -= 0.01

        
    }

    draw(){
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.font = this.size + 'px Arial'
        ctx.fillText(this.value, this.x, this.y)
        ctx.globalAlpha = 1;
    }
}

function handleMeters(){
    for(let i = 0; i < meters.length; i++){
        meters[i].update();
        meters[i].draw();
        if(meters[i].lifespan >= 50){
            meters.splice(i, 1);
            i--;
        }
    }
}