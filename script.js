document.addEventListener('DOMContentLoaded', function() {

    // --- Animação 1: Corações Flutuantes ---
    const heartContainer = document.querySelector('.heart-container');
    const numberOfHearts = 30; // Quantidade de corações

    for (let i = 0; i < numberOfHearts; i++) {
        let heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤';
        heart.style.left = Math.random() * 100 + 'vw'; // Posição horizontal aleatória
        heart.style.animationDuration = (Math.random() * 5 + 10) + 's'; // Duração da animação aleatória (entre 10 e 15s)
        heart.style.animationDelay = Math.random() * 10 + 's'; // Atraso para começar aleatório
        heart.style.fontSize = (Math.random() * 10 + 10) + 'px'; // Tamanho aleatório
        heartContainer.appendChild(heart);
    }

    // --- Animação 2: Aparecer ao rolar a página ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    // Esta função verifica se o elemento está visível na tela
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Para a animação não repetir
            }
        });
    }, {
        threshold: 0.1 // A animação começa quando 10% do elemento estiver visível
    });

    // Aplica o observador a cada elemento que deve ser animado
    animatedElements.forEach(element => {
        observer.observe(element);
    });

});