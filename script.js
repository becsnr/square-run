const player = document.getElementById('player');

let state = {
    x: 100, // posição horizontal
    y: 100, // posição vertical
    speed: 5 // velocidade
};

function clamp() {
    state.x = Math.max(0, Math.min(state.x, 760)); // nunca pode ser menor q 0 e nem maior q 760
    state.y = Math.max(0, Math.min(state.y, 560)); // nunca pode ser menor q 0 e nem maior q 560
}

function render() { // isso desenha o quadrado na posição do state

    clamp();

    player.style.left = state.x + 'px'; // mover horizontal
    player.style.top = state.y + 'px'; // mover vertical
}

render();

let keys = { // estado do teclado
    up: false,
    down: false,
    left: false,
    right: false
};

document.addEventListener("keydown", (event) => {
    // pegar a posição atual e soma ou subtrai a velocidade
    // ATIVAR TECLAS
    if (event.key === "ArrowUp" || event.key === "w") {
        keys.up = true;
    }

    if (event.key === "ArrowDown" || event.key === "s") {
        keys.down = true;
    }

    if (event.key === "ArrowRight" || event.key === "d") {
        keys.right = true;
    }

    if (event.key === "ArrowLeft" || event.key === "a") {
        keys.left = true;
    }
});

document.addEventListener("keyup", (event) => {
    // DETECTAR QND SOLTAR AS TECLAS
    if (event.key === "ArrowUp" || event.key === "w") {
        keys.up = false;
    }

    if (event.key === "ArrowDown" || event.key === "s") {
        keys.down = false;
    }

    if (event.key === "ArrowRight" || event.key === "d") {
        keys.right = false;
    }

    if (event.key === "ArrowLeft" || event.key === "a") {
        keys.left = false;
    }
});

function update() {
    if (keys.up) {
        state.y -= state.speed;
    }

    if (keys.down) {
        state.y += state.speed;
    }

    if (keys.right) {
        state.x += state.speed;
    }

    if (keys.left) {
        state.x -= state.speed;
    }

    render();
}

// ativar o update. isso faz rodar a cada x ms
setInterval(update, 16);