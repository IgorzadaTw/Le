document.addEventListener('DOMContentLoaded', function() {

  // ----------------------------
  // ÁUDIO: setup + fallback UI
  // ----------------------------
  const audioElement = document.getElementById('bg-audio');
  let audio = audioElement ? audioElement : new Audio('musica.mp3');
  audio.loop = true;
  audio.volume = 0.5;
  audio.preload = 'auto';

  const musicToggleBtn = document.getElementById('music-toggle');

  // Função pra atualizar o botão (ícone/texto)
  function updateButton() {
    if (!musicToggleBtn) return;
    if (audio.paused) {
      musicToggleBtn.textContent = '▶️ Tocar';
    } else {
      musicToggleBtn.textContent = '⏸️ Pausar';
    }
  }

  // Tenta tocar automaticamente. Muitos navegadores bloqueiam autoplay com som.
  audio.play().then(() => {
    // tocou — esconde botão se existir
    if (musicToggleBtn) musicToggleBtn.style.display = 'none';
  }).catch(() => {
    // autoplay bloqueado -> mostra botão pra usuário
    if (musicToggleBtn) {
      musicToggleBtn.style.display = 'block';
      // primeiro clique inicia áudio (alguns navegadores permitem interação para permitir som)
      musicToggleBtn.addEventListener('click', function onFirstClick() {
        audio.play();
        updateButton();
        // muda comportamento depois: serve pra alternar play/pause
        musicToggleBtn.removeEventListener('click', onFirstClick);
      });
    }
  });

  // Se o botão existir, torna-o toggle play/pause após áudio ter sido iniciado
  if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
      updateButton();
    });
  }

  // Se quiser, podemos começar mudo e desmutar após interação (opcional)
  // audio.muted = true; // descomente se quiser começar mudo

  // Atualiza botão quando estado do audio muda
  audio.addEventListener('play', updateButton);
  audio.addEventListener('pause', updateButton);

  // ----------------------------
  // Animação 1: Corações Flutuantes
  // ----------------------------
  const heartContainer = document.querySelector('.heart-container');
  const numberOfHearts = 30; // Quantidade de corações

  // Se o elemento não existir, criamos um fallback no body
  const actualContainer = heartContainer || (function() {
    const c = document.createElement('div');
    c.className = 'heart-container';
    document.body.appendChild(c);
    return c;
  })();

  for (let i = 0; i < numberOfHearts; i++) {
    let heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = (100 + Math.random() * 20) + 'vh'; // começa um pouco abaixo
    heart.style.animationDuration = (Math.random() * 6 + 9) + 's'; // 9 a 15s
    heart.style.animationDelay = (Math.random() * 8) + 's';
    heart.style.fontSize = (Math.random() * 20 + 14) + 'px';
    actualContainer.appendChild(heart);
  }

  // ----------------------------
  // Animação 2: Aparecer ao rolar a página
  // ----------------------------
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  animatedElements.forEach(element => observer.observe(element));

  // ----------------------------
  // Debug logs úteis (se necessário)
  // ----------------------------
  // Se não estiver tocando, verifique caminho do arquivo e console do navegador (F12)
  if (!audio) console.error('Áudio não inicializado — verifique caminho para musica.mp3');
});
