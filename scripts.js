// variáveis do tempo de jogo
var segundos = 0;
var minutos = 0;

// cria variável do botão start
var botaoStart = document.getElementById('botaoStart');

// conta o tempo do jogo
var tempoDeJogo = function ()
{   
    botaoStart.style.display = 'none';

    let tempoSeg = segundos.toString().padStart(2, '0');
    let tempoMin = minutos.toString().padStart(2, '0');

    document.getElementById('tempo').innerText = `${tempoMin}:${tempoSeg}`;

    if (segundos == 60)
    {
        segundos = 0;
        minutos++;
    }

    segundos++;
}


// movimentação do jogador
var nave = document.getElementById('nave'); 
// define a distância inicial da esquerda e do topo
var posicaoNaveTop = 400;
var posicaoNaveLeft = 10;
// coloca a nave na posição definida
nave.style.top = posicaoNaveTop;
nave.style.left = posicaoNaveLeft;

// variáveis de tecla
var teclas = {
    w: false,
    a: false,
    s: false,
    d: false
};

// verifica se a tecla foi apertada
window.addEventListener('keydown', function(tecla)
{
    let teclaPressionada = tecla.key.toLowerCase(); // muda a tecla para minúscula

    if (teclaPressionada == 'w') {teclas.w = true;}

    if (teclaPressionada == 'a') {teclas.a = true;}

    if (teclaPressionada == 's') {teclas.s = true;}

    if (teclaPressionada == 'd') {teclas.d = true;}
})

// verifica se a tecla foi 'solta'
window.addEventListener('keyup', function(tecla)
{
    let teclaPressionada = tecla.key.toLowerCase(); // muda a tecla para minúscula

    if (teclaPressionada == 'w') {teclas.w = false;}

    if (teclaPressionada == 'a') {teclas.a = false;}

    if (teclaPressionada == 's') {teclas.s = false;}

    if (teclaPressionada == 'd') {teclas.d = false;}
})

// função da movimentação
var movimentacaoJogador = function()
{
    if (teclas.w) {posicaoNaveTop -= 5}
    if (teclas.s) {posicaoNaveTop += 5}
    if (teclas.a) {posicaoNaveLeft -= 5}
    if (teclas.d) {posicaoNaveLeft += 5}

    nave.style.top = posicaoNaveTop + 'px';
    nave.style.left = posicaoNaveLeft + 'px';

    // limite a movimentação
    if (posicaoNaveTop < 0)
    {
        posicaoNaveTop = 0;
        nave.style.top = '0px';
    }

    if (posicaoNaveTop > 700)
    {
        posicaoNaveTop = 700;
        nave.style.top = 700 + 'px';
    }

    if (posicaoNaveLeft < 0)
    {
        posicaoNaveLeft = 0;
        nave.style.left = '0px'
    }

    if (posicaoNaveLeft > 1100)
    {
        posicaoNaveLeft = 1100;
        nave.style.left = '1100px';
    }
}
// roda a movimentação
setInterval(movimentacaoJogador, 16);
