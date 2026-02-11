const player = document.getElementById('player');

let state = {
    x: 100, // posição horizontal
    y: 100, // posição vertical
    speed: 20 // velocidade
};

function render() { // isso desenha o quadrado na posição do state
    player.style.left = state.x + 'px'; // mover horizontal
    player.style.top = state.y + 'px'; // mover vertical
}

render();

document.addEventListener("keydown", (event) => {
    // pegar a posição atual e soma ou subtrai a velocidade
    if (event.key === "ArrowUp" || event.key === "w") {
        state.y -= state.speed;
    }

    if (event.key === "ArrowDown" || event.key === "s") {
        state.y += state.speed;
    }

    if (event.key === "ArrowRight" || event.key === "d") {
        state.x += state.speed;
    }

    if (event.key === "ArrowLeft" || event.key === "a") {
        state.x -= state.speed;
    }
    render()
});