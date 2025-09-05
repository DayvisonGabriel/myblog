// A variável 'postFiles' é definida no arquivo post-list.js.
// Certifique-se de que o <script src="post-list.js"></script> esteja antes deste arquivo no HTML.

// Seleção de elementos HTML
const introContainer = document.getElementById('intro-container');
const blogContent = document.getElementById('blog-content');
const eyeImage = document.getElementById('eyeImage');
const title = document.getElementById('title');

// Sequência da animação do olho
const sequence = [
    { src: 'wallpaper-fechado.png', delay: 150 },
    { src: 'wallpaper-metade.png', delay: 50 },
    { src: 'wallpaper.png', delay: 800 },
    { src: 'wallpaper-metade.png', delay: 50 },
    { src: 'wallpaper-fechado.png', delay: 150 },
    { src: 'wallpaper-metade.png', delay: 50 },
    { src: 'wallpaper.png', delay: 1000 },
];

let index = 0;
let animationTriggered = false;

// -------------------- LÓGICA DA ANIMAÇÃO INICIAL --------------------

/**
 * Inicia a sequência de animação do olho.
 */
function startAnimation() {
    if (animationTriggered) {
        return;
    }

    animationTriggered = true;
    index = 0;

    // Reset dos estilos para o começo da animação
    eyeImage.style.transform = 'translate(-50%, -50%) scale(1)';
    eyeImage.style.opacity = '1';
    title.style.opacity = 0;
    title.style.transform = 'translate(-50%, -50%) scale(0.1)';

    // Inicia o loop da sequência de animação
    setTimeout(blinkTwiceThenZoom, 300);

    // Remove os event listeners para evitar que a animação seja ativada novamente
    document.removeEventListener('click', startAnimation);
    document.removeEventListener('wheel', startAnimation);
}

/**
 * Executa a sequência de piscar e o zoom final.
 */
function blinkTwiceThenZoom() {
    if (index < sequence.length) {
        eyeImage.src = sequence[index].src;
        setTimeout(blinkTwiceThenZoom, sequence[index].delay);
        index++;
    } else {
        // Inicia a transição do blog e o zoom do olho simultaneamente
        blogContent.classList.add('is-visible');

        eyeImage.style.transform = 'translate(-50%, -50%) scale(100.5)';
        eyeImage.style.opacity = '0';

        title.style.opacity = '0';

        // Oculta o container de animação após a transição do olho
        setTimeout(() => {
            introContainer.style.opacity = '0';
            introContainer.style.visibility = 'hidden';
        }, 1000);
    }
}

// -------------------- LÓGICA DE CARREGAMENTO DINÂMICO DO CONTEÚDO --------------------

/**
 * Carrega os dados dos arquivos JSON e constrói a linha do tempo.
 */
async function loadTimeline() {
    const posts = [];
    if (typeof postFiles === 'undefined') {
        console.error("Variável 'postFiles' não encontrada. Verifique se o arquivo 'post-list.js' foi gerado e está incluído no HTML.");
        return;
    }

    for (const file of postFiles) {
        try {
            const response = await fetch(file);
            if (!response.ok) {
                throw new Error(`Erro ao carregar o arquivo: ${file}`);
            }
            const data = await response.json();
            posts.push(data);
        } catch (error) {
            console.error(error);
        }
    }

    posts.sort((a, b) => a.order - b.order);

    const timelineContentContainer = document.querySelector('.timeline-content');
    const timelinePointsContainer = document.querySelector('.timeline-points');

    if (!timelineContentContainer || !timelinePointsContainer) {
        console.error("Elementos HTML da linha do tempo não encontrados.");
        return;
    }

    timelineContentContainer.innerHTML = '';
    timelinePointsContainer.innerHTML = '';

    posts.forEach((post) => {
        // Cria e anexa a div de texto
        const textDiv = document.createElement('div');
        textDiv.className = 'timeline-item-text';
        textDiv.innerHTML = `
            <h2>${post.title}</h2>
            <h3>${post.subtitle}</h3>
            <p>${post.content}</p>
        `;
        timelineContentContainer.appendChild(textDiv);

        // Cria e anexa o ponto (bolinha)
        const dotDiv = document.createElement('div');
        dotDiv.className = 'timeline-point-dot';
        timelinePointsContainer.appendChild(dotDiv);
    });

    // Ajusta a posição vertical dos pontos para alinhá-los com o texto
    adjustDotPositions();
}

/**
 * Ajusta a posição vertical de cada ponto da linha do tempo.
 */
function adjustDotPositions() {
    const texts = document.querySelectorAll('.timeline-item-text');
    const dots = document.querySelectorAll('.timeline-point-dot');

    if (texts.length !== dots.length) {
        console.error("O número de textos e pontos da linha do tempo não corresponde.");
        return;
    }

    texts.forEach((text, index) => {
        const topPosition = text.offsetTop + (text.offsetHeight / 2) - (dots[index].offsetHeight / 2);
        dots[index].style.top = `${topPosition}px`;
    });
}


// -------------------- INICIALIZAÇÃO --------------------

// Carrega o conteúdo dinâmico assim que a página é carregada.
document.addEventListener('DOMContentLoaded', () => {
    loadTimeline();
    
    // Adiciona os event listeners para iniciar a animação.
    document.addEventListener('click', startAnimation);
    document.addEventListener('wheel', startAnimation);
});