function handleGameStatus() {
    ctx.fillStyle = 'gold';
    ctx.font = '30px Arial';
    ctx.fillText('Resources: ' + numberOfResources, 20, 55)
}
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'green'
    ctx.fillRect(0, 0, controlsBar.width, controlsBar.height);
    handleGameGrid();
    handleTowers();
    ctx.fillText('Resources: ' + numberOfResources, 20, 55)
    requestAnimationFrame(animate);
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