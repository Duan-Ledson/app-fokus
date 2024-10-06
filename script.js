const html = document.querySelector('html');
const focoBtn = document.querySelector('.app__card-button--foco');
const curtoBtn = document.querySelector('.app__card-button--curto');
const longoBtn = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image')
const title = document.querySelector('.app__title');
const buttons = document.querySelectorAll('.app__card-button');
const startPauseBtn = document.querySelector('#start-pause');
const iniciarOuPausarBtn = document.querySelector('#start-pause span');
const iniciarOuPausarBtnIcon = document.querySelector('.app__card-primary-butto-icon');
const temporizador = document.querySelector('#timer');


const musicFocoInput = document.querySelector('#alternar-musica');
const music = new Audio('/sons/naruto-sad-song.mp3');
const audioPlay = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3')

let tempoEmSegundos = 1500;
let intervaloId = null;

music.loop = true;

function alterarContexto (contexto) {
    mostrarTempo ();
    buttons.forEach (function (contexto){
        contexto.classList.remove ('active');
    })
    html.setAttribute ('data-contexto', contexto);
    banner.setAttribute ('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            title.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`            
            break;

        case "descanso-curto":
            title.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faca uma pausa curta!.</strong`
            break;

        case "descanso-longo":
            title.innerHTML = `Hora de voltar a superficie<br>
                <strong class="app__title-strong">Faca uma pausa longa.</strong`
    
        default:
            break;
    }
}

focoBtn.addEventListener ('click', () => {
    tempoEmSegundos = 1500;
    alterarContexto ('foco');
    focoBtn.classList.add ('active');
})

curtoBtn.addEventListener ('click', () => {
    tempoEmSegundos = 300;
    alterarContexto ('descanso-curto');
    curtoBtn.classList.add ('active');
})

longoBtn.addEventListener ('click', () => {
    tempoEmSegundos = 900;
   alterarContexto ('descanso-longo');
   longoBtn.classList.add ('active');
})

musicFocoInput.addEventListener ('change', () => {
    if (music.paused) {
        music.play()
    }
    else {
        music.pause()
    }
})

const contagemRegressiva = () => {
    if(tempoEmSegundos <= 0) {
        audioTempoFinalizado.play();
        alert('Tempo finalizado');
        zerar();
        return;
    }
    tempoEmSegundos -= 1
    mostrarTempo ();
}

startPauseBtn.addEventListener ('click', iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloId) {
        audioPausa.play();
        zerar();
        return;
    }
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);

    iniciarOuPausarBtn.textContent = "Pausar";

    iniciarOuPausarBtnIcon.setAttribute('src', `/imagens/pause.png`);
}

function zerar () {
    clearInterval (intervaloId);
    iniciarOuPausarBtn.textContent = "Começar";
    iniciarOuPausarBtnIcon.setAttribute('src', `/imagens/play_arrow.png`);
    intervaloId = null;
}

function mostrarTempo () {
    const tempo = new Date (tempoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString ('pt-br', {minute: '2-digit', second: '2-digit'});
    temporizador.innerHTML = `${tempoFormatado}`;
}

mostrarTempo ();