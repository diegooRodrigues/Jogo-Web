// variáveis de controle de loop
var loopTempo;
var loopMovimentacaoJogador;
var loopMovimentoAsteroide;

// variáveis do tempo de jogo
var segundos = 0;
var minutos = 0;

// cria variável do botão start
var botaoStart = document.getElementById('botaoStart');

// conta o tempo do jogo
var tempoDeJogo = function ()
{   
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

// Obstáculos
var asteroide = document.getElementById('asteroide');

// define as posições iniciais do asteroide
var posicaoAsteroidTop = -1000;
var posicaoAsteroidLeft = 1200;
asteroide.style.left = posicaoAsteroidLeft + 'px';
asteroide.style.top = posicaoAsteroidTop + 'px';

// movimento horizontal do asteroide
var movimentoAsteroide = function()
{
    var velociadeAsteroide = 10;

    posicaoAsteroidLeft -= velociadeAsteroide;
    asteroide.style.left = posicaoAsteroidLeft + 'px';

    verificarColisao();

    if (posicaoAsteroidLeft <= -100)
    {
        posicaoAsteroidLeft = 1200;
        aleatoriedadeAsteroide()
    }
}

// define localização vertical do asteroide
var aleatoriedadeAsteroide = function()
{
    posicaoAsteroidTop = Math.floor(Math.random() * 701);
    asteroide.style.top = posicaoAsteroidTop + 'px';
}

var verificarColisao = function()
{
    // hitbox da nava
    let hitboxNaveEsquerda = posicaoNaveLeft + 20;
    let hitboxNaveDireita = hitboxNaveEsquerda + 70;
    let hitboxNaveTopo = posicaoNaveTop + 15;
    let hitboxNaveBaixo = hitboxNaveTopo + 70;

    // hitbox do asteroide
    let hitboxAsteroideEsquerda = posicaoAsteroidLeft + 30;
    let hitboxAsteroideTopo = posicaoAsteroidTop + 30;
    let hitboxAsteroideDireita = hitboxAsteroideEsquerda + 40;
    let hitboxAsteroideBaixo = hitboxAsteroideTopo + 40;

    // para ver a hitbox funcionando na prática
    // hitbox da nave
    // let divNave = document.getElementById('hitboxNave');
    // divNave.style.left = hitboxNaveEsquerda + 'px';
    // divNave.style.top = hitboxNaveTopo + 'px';

    // hitbox do asteroide
    // let divAst = document.getElementById('hitboxAst');
    // divAst.style.left = hitboxAsteroideEsquerda + 'px';
    // divAst.style.top = hitboxAsteroideTopo + 'px';

    // verifica se encostou
    if (
        hitboxNaveDireita > hitboxAsteroideEsquerda && 
        hitboxNaveEsquerda < hitboxAsteroideDireita &&
        hitboxNaveBaixo > hitboxAsteroideTopo && 
        hitboxNaveTopo < hitboxAsteroideBaixo
    )
    {
        // define local da explosão
        let explosao = document.getElementById('explosao');
        pararJogo();
        explosao.style.left = hitboxNaveDireita + 'px';
        explosao.style.top = posicaoNaveTop + 50 + 'px';
        explosao.style.visibility = 'visible';

        // tira visibilidade da nave e asteroide após 300 ms
        setTimeout(() => {
            nave.style.visibility = 'hidden';
            asteroide.style.visibility = 'hidden';
        }, 300)
        // tira visibilidade da explosão após 1 seg
        setTimeout(() => {explosao.style.visibility = 'hidden';}, 1000)
    }
}


// inicia o jogo
var iniciarJogo = function()
{
    botaoReiniciar.style.visibility = 'hidden';
    nave.style.visibility = 'visible';
    asteroide.style.visibility = 'visible';
    posicaoAsteroidLeft = 1200;
    posicaoNaveTop = 400;
    posicaoNaveLeft = 10;

    botaoStart.style.display = 'none';

    tempoDeJogo();
    loopTempo = setInterval(tempoDeJogo, 1000);

    loopMovimentacaoJogador = setInterval(movimentacaoJogador, 16);
    aleatoriedadeAsteroide();
    loopMovimentoAsteroide = setInterval(movimentoAsteroide, 16);
}

// para o jogo
var botaoReiniciar = document.getElementById('botaoReiniciar');

var pararJogo = function()
{
    clearInterval(loopTempo);
    segundos = 0;
    minutos = 0;
    clearInterval(loopMovimentacaoJogador);
    clearInterval(loopMovimentoAsteroide);
    botaoReiniciar.style.visibility = 'visible';
}