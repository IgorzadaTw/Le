document.addEventListener('DOMContentLoaded', function() {

    // --- Música de fundo ---
    const audio = new Audio('igor4(Extend).mp3'); // Caminho do arquivo da música
    audio.loop = true; // Faz a música tocar em loop
    audio.volume = 0.5; // Volume inicial (0.0 a 1.0)

    // Tenta tocar automaticamente (nem todos navegadores permitem sem interação)
    audio.play().catch(() => {
        // Se o navegador bloquear, cria um botão pra tocar
        const playButton = document.createElement('button');
        playButton.textContent = '▶️ Tocar Música';
        playButton.style.position = 'fixed';
        playButton.style.bottom = '20px';
        playButton.style.right = '20px';
        playButton.style.padding = '10px 20px';
        playButton.style.fontSize = '16px';
        playButton.style.borderRadius = '10px';
        playButton.style.border = 'none';
        playButton.style.cursor = 'pointer';
        playButton.style.background = '#ff4d6d';
        playButton.style.color = '#fff';
        playButton.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';
        
        playButton.addEventListener('click', () => {
            audio.play();
            playButton.remove(); // Remove o botão depois de começar
        });

        document.body.appendChild(playButton);
    });

    // --- Animação 1: Corações Flutuantes ---
    const heartContainer = document.querySelector('.heart-container');
    const numberOfHearts = 30; // Quantidade de corações

    for (let i = 0; i < numberOfHearts; i++) {
        let heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 5 + 10) + 's';
        heart.style.animationDelay = Math.random() * 10 + 's';
        heart.style.fontSize = (Math.random() * 10 + 10) + 'px';
        heartContainer.appendChild(heart);
    }

    // --- Animação 2: Aparecer ao rolar a página ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(element => observer.observe(element));
});
