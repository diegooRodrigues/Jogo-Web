//                                                 INFORMAÇÕES DO JOGO
var segundos = 0, minutos = 0; // variáveis do tempo

var tempo = function()
{
    // mostra o tempo na tela
    let tempoSeg = segundos.toString().padStart(2, '0');
    let tempoMin = minutos.toString().padStart(2, '0');

    document.getElementById('tempo').innerText = `${tempoMin}:${tempoSeg}`;
}

var passarTempo = function()
{
    // passa o tempo
    segundos++;

    if (segundos == 60)
    {
        segundos = 0;
        minutos++;
    }
}






//                                                MOVIMENTAÇÃO DO JOGADOR

var nave = document.getElementById('nave');
var velocidadeNave = 6;

posNaveTop = 650; // posição inicial da nave em relação ao top
posNaveLeft = 450; // posição inicial da nave em relação ao left

var teclas = {
    w: false,
    a: false,
    s: false,
    d: false
}

var movimentacaoJogador = function()
{
    // movimenta o jogador
    if (teclas.w) {posNaveTop -= velocidadeNave}
    if (teclas.s) {posNaveTop += velocidadeNave}
    if (teclas.a) {posNaveLeft -= velocidadeNave}
    if (teclas.d) {posNaveLeft += velocidadeNave}

    nave.style.top = posNaveTop + 'px';
    nave.style.left = posNaveLeft + 'px';

    // limite da movimentação conforme a tela
    if (posNaveTop < 0)
    {
        posNaveTop = 0;
        nave.style.top = '0px';
    }

    if (posNaveTop > 700)
    {
        posNaveTop = 700;
        nave.style.top = 700 + 'px';
    }

    if (posNaveLeft < 0)
    {
        posNaveLeft = 0;
        nave.style.left = '0px'
    }

    if (posNaveLeft > 900)
    {
        posNaveLeft = 900;
        nave.style.left = '900px';
    }
}









//                                               MOVIMENTAÇÃO OBSTÁCULO

var obstaculo = document.getElementById('obstaculo');
var posObstaculoTop = -100;
var posObstaculoLeft = 450;

obstaculo.style.top = posObstaculoTop + 'px';
obstaculo.style.left = posObstaculoLeft + 'px';

var randomizarObstaculo = function()
{
    // randomiza onde o obstáculo aparece em relação a esquerda
    posObstaculoLeft = Math.floor(Math.random() * 901);
    obstaculo.style.left = posObstaculoLeft + 'px';
}

var movimentarObstaculo = function()
{
    // movimenta o obstáculo
    let velocidadeObstaculo = 7;

    posObstaculoTop += velocidadeObstaculo;
    obstaculo.style.top = posObstaculoTop + 'px';

    colisaoNaveObstaculo();

    if (posObstaculoTop > 801)
    {
        posObstaculoTop = -100;
        randomizarObstaculo()
    }
}







//                                        HIT BOX

var colisaoNaveObstaculo = function()
{
    // verifica a nave e obstáculo se colidiram

    // hitbox da nave
    let hitboxNaveEsquerda = posNaveLeft;
    let hitboxNaveDireita = hitboxNaveEsquerda + 100;
    let hitboxNaveTopo = posNaveTop;
    let hitboxNaveBaixo = hitboxNaveTopo + 100;

    // hitbox do obstáculo
    let hitboxObstaculoEsquerda = posObstaculoLeft;
    let hitboxObstaculoDireita = hitboxObstaculoEsquerda + 70;
    let hitboxObstaculoTopo = posObstaculoTop;
    let hitboxObstaculoBaixo = hitboxObstaculoTopo + 70;

    // para ver a hitbox funcionando na prática
    // hitbox da nave
    // let divNave = document.getElementById('hitboxNave');
    // divNave.style.left = hitboxNaveEsquerda + 'px';
    // divNave.style.top = hitboxNaveTopo + 'px';

    // hitbox do asteroide
    // let divObstaculo = document.getElementById('hitboxObstaculo');
    // divObstaculo.style.left = hitboxObstaculoEsquerda + 'px';
    // divObstaculo.style.top = hitboxObstaculoTopo + 'px';

    if (
        hitboxNaveDireita > hitboxObstaculoEsquerda &&
        hitboxNaveEsquerda < hitboxObstaculoDireita &&
        hitboxNaveTopo < hitboxObstaculoBaixo &&
        hitboxNaveBaixo > hitboxObstaculoTopo
    )
    {
        let explosao = document.getElementById('explosao');

        // define o locao da explosão
        explosao.style.left = posNaveLeft + 50 + 'px';
        explosao.style.top = posNaveTop + 'px';
        explosao.style.visibility = 'visible'; // torna explosão visível

        setTimeout(() => {
            nave.style.visibility = 'hidden';
            obstaculo.style.visibility = 'hidden';
        }, 300)

        setTimeout(() => {explosao.style.visibility = 'hidden'}, 1000)

        pararJogo()
    }
}










//                                               INICIAR O JOGO

var botaoStart = document.getElementById('botaoStart');
var botaoReiniciar = document.getElementById('botaoReiniciar');
var loopTempo, loopPassarTempo; // variáveis para loop de tempo
var loopMovJogador;
var loopMovObstaculo;

var iniciarJogo = function()
{
    botaoReiniciar.style.visibility = 'hidden';
    botaoStart.style.visibility = 'hidden';
    nave.style.visibility = 'visible';
    obstaculo.style.visibility = 'visible';
    loopPassarTempo = setInterval(passarTempo, 1000);
    loopTempo = setInterval(tempo, 16);

    //                                                Verifica movimentação do jogador
    // verifica se o jogador pressinou alguma tecla
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

    loopMovJogador = setInterval(movimentacaoJogador, 16);
    loopMovObstaculo = setInterval(movimentarObstaculo, 16);
}





//                                              PARAR O JOGO

var pararJogo = function()
{
    clearInterval(loopTempo);
    clearInterval(loopPassarTempo);
    clearInterval(loopMovJogador);
    clearInterval(loopMovObstaculo);

    minutos = 0;
    segundos = 0;

    setTimeout(() => {botaoReiniciar.style.visibility = 'visible'}, 300)

    posObstaculoTop = -100;
    posNaveTop = 650;
    posNaveLeft = 450;
}