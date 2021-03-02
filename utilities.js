function handleGameStatus() {
    ctx.fillStyle = 'gold';
    ctx.font = '30px Arial';
    if (gameOver){
        ctx.fillStyle = 'black'
        ctx.font = '30px Helvetica'
        ctx.fillText('GAME OVER', 135, 330)
    }
}
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'green'
    ctx.fillRect(0, 0, controlsBar.width, controlsBar.height);
    handleGameGrid();
    handleTowers();
    handleEnemies();
    ctx.fillText('Resources: ' + numberOfResources, 20, 55)
    frame++;
    console.log(frame)
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