// variáveis do tempo de jogo
var segundos = 0;
var minutos = 0;

// contando o tempo do jogo
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
var posicaoNave = 400;

window.addEventListener('keydown', function(event)
{
    const tecla = event.key.toLowerCase();

    if (tecla === 'w')
    {
        posicaoNave -= 10;
    }
    else if (tecla === 's')
    {
        posicaoNave += 10;
    }

    nave.style.top = posicaoNave + 'px';
})

