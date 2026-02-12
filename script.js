const player = document.getElementById('player');
const triangulo = document.getElementById('obstaculo');
const titulo = document.getElementById('titulo');
const info = document.getElementById('info');

let state = {
    x: 100, // posição horizontal
    y: 100, // posição vertical
    speed: 5 // velocidade
};

let keys = { // estado do teclado
    up: false,
    down: false,
    left: false,
    right: false
};

let obstaculo = {
    x: 250,
    y: 250,
    speed: 2
}

let gameOver = false;

function clamp() {
    state.x = Math.max(0, Math.min(state.x, 760)); // nunca pode ser menor q 0 e nem maior q 760
    state.y = Math.max(0, Math.min(state.y, 560)); // nunca pode ser menor q 0 e nem maior q 560
}

function render() { // isso desenha o quadrado na posição do state

    clamp();

    player.style.left = state.x + 'px'; // mover horizontal
    player.style.top = state.y + 'px'; // mover vertical

    triangulo.style.left = obstaculo.x + 'px';
    triangulo.style.top = obstaculo.y + 'px';
}

render();

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

    if (event.key === "r" && gameOver) {
        restart();
    }
});

function update() {

    if (gameOver) {
        titulo.innerText = 'GAME OVER';
        info.innerText = 'aperte a tecla "R" para reiniciar.'

        player.style.backgroundColor = 'red';
        return;
    }

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

    // MOVIMENTO DO OBSTACULO

    // seguir no eixo x
    if (state.x > obstaculo.x) {
        obstaculo.x += obstaculo.speed;
    } else if (state.x < obstaculo.x) {
        obstaculo.x -= obstaculo.speed;
    }
    // seguir no eixo y
    if (state.y > obstaculo.y) {
        obstaculo.y += obstaculo.speed;
    } else if (state.y < obstaculo.y) {
        obstaculo.y -= obstaculo.speed;
    }

    render();
    colidir();
}

// ativar o update. isso faz rodar a cada x ms
setInterval(update, 16);

function colidir() {

    let playerEsquerda = player.offsetLeft;
    let playerDireita = player.offsetLeft + player.offsetWidth;
    let playerTopo = player.offsetTop;
    let playerBaixo = player.offsetTop + player.offsetHeight;

    let obstaculoEsquerda = triangulo.offsetLeft;
    let obstaculoDireita = triangulo.offsetLeft + triangulo.offsetWidth;
    let obstaculoTopo = triangulo.offsetTop;
    let obstaculoBaixo = triangulo.offsetTop + triangulo.offsetHeight;

    if (playerDireita > obstaculoEsquerda && playerEsquerda < obstaculoDireita && playerBaixo > obstaculoTopo && playerTopo < obstaculoBaixo) {
        gameOver = true;
        console.log('colidiu')
    }
}

function restart() {
    gameOver = false;

    titulo.innerText = '';
    info.innerText = '';

    state.x = 100;
    state.y = 100;

    obstaculo.x = 250;
    obstaculo.y = 250;

    player.style.backgroundColor = 'hotpink';

    render();
}