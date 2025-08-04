const eyeImage = document.getElementById('eyeImage');
const title = document.getElementById('title');

// Cada item tem: imagem e tempo de exibição (em ms)
const sequence = [
  { src: 'wallpaper-fechado.png', delay: 150 },
  { src: 'wallpaper-metade.png', delay: 50 },
  { src: 'wallpaper.png',         delay: 800 }, // pausa no aberto

  { src: 'wallpaper-metade.png', delay: 50 },
  { src: 'wallpaper-fechado.png', delay: 150 },
  { src: 'wallpaper-metade.png', delay: 50 },
  { src: 'wallpaper.png',         delay: 1000 }, // segunda pausa no aberto
];

let index = 0;

function blinkTwiceThenZoom() {
  if (index < sequence.length) {
    eyeImage.src = sequence[index].src;
    setTimeout(blinkTwiceThenZoom, sequence[index].delay);
    index++;
  } else {
    // Zoom final após segunda pausa no aberto
    eyeImage.style.transform = 'translate(-50%, -50%) scale(100.5)';
    
    // Faz o título crescer junto com o zoom
    title.style.opacity = 1;
    title.style.transform = 'translate(-50%, -50%) scale(1)';
  }
}

eyeImage.addEventListener('click', () => {
  index = 0;

  // Reset do zoom e opacidade da imagem
  eyeImage.style.transform = 'translate(-50%, -50%) scale(1)';
  eyeImage.style.opacity = '1';

  // Reset do título
  title.style.opacity = 0;
  title.style.transform = 'translate(-50%, -50%) scale(0.1)';

  setTimeout(blinkTwiceThenZoom, 300);
});
