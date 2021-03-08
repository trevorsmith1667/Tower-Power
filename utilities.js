function handleGameStatus() {
    ctx.fillStyle = 'silver';
    ctx.font = '30px Arial';
    ctx.fillText('Score: ' + points, 180, 40)
    ctx.fillText('Resources: ' + numberOfResources, 180, 80)
    if (gameOver){
        ctx.fillStyle = 'black';
        ctx.font = '90px Arial';
        ctx.fillText('GAME OVER', 135, 330);
    }
    if (points >= winScore && enemies.length === 0){
        ctx.fillStyle = 'black'
        ctx.font = '60px Arial'
        ctx.fillText('LEVEL COMPLETE', 130, 300);
        ctx.font = "30px Arial" 
        ctx.fillText('You scored: ' + points + '!', 134, 340);
    }
}
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'green'
    ctx.fillRect(0, 0, controlsBar.width, controlsBar.height);
    handleGameGrid();
    handleTowers();
    handlePowerups();
    handleWeapons();
    handleEnemies();
    chooseTower();
    handleGameStatus();
    handleMeters();
    frame++;
    if (!gameOver) requestAnimationFrame(animate);
}

animate();

function collision(first, second) {
    if (!(first.x > second.x + second.width ||
        first.x + first.width < second.x ||
        first.y > second.y + second.height ||
        first.y + first.height < second.y)

    ) {
        return true;
    };
};

window.addEventListener('resize', function(){
    canvasPosition = canvas.getBoundingClientRect();
})