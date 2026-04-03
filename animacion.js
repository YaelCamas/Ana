document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor-paw');
    const cards = document.querySelectorAll('.glass-card');

    // 1. Seguimiento del cursor
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // 2. Observer para animar tarjetas al scroll (Tu lógica original)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.5 });

    cards.forEach(card => observer.observe(card));

    // 3. Lógica del Botón "No" que se escapa
    const noBtn = document.getElementById('no-btn');
    if (noBtn) {
        noBtn.addEventListener('mouseover', () => {
            const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
            const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
            
            noBtn.style.position = 'fixed';
            noBtn.style.left = x + 'px';
            noBtn.style.top = y + 'px';
            noBtn.style.zIndex = "10000";
        });
    }

    // 4. Manejo del Formulario (Botón Sí)
    const confirmForm = document.getElementById('confirm-form');
    if (confirmForm) {
        confirmForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Evita recarga
            celebrate(e, 'love', true); // Lanza las flores

            // Enviar a Formspree de fondo
            fetch(confirmForm.action, {
                method: 'POST',
                body: new FormData(confirmForm),
                headers: { 'Accept': 'application/json' }
            });

            // Ocultar botones y mostrar tu mensaje final
            document.getElementById('final-step').classList.add('show-message');
            setTimeout(() => {
                document.getElementById('final-message').classList.add('visible');
            }, 500);
        });
    }
});

// 5. Función de Partículas (Tu lógica original mejorada)
function celebrate(event, type, final = false) {
    // Si viene del formulario, usamos el botón de "Sí" como centro
    const btn = event.currentTarget.tagName === 'FORM' ? document.getElementById('yes-btn') : event.currentTarget;
    const rect = btn.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;

    const config = {
        vet: ['🐾', '🐶', '🐱', '🏥'],
        love: ['🌹', '✨', '🌸', '💖']
    };

    const icons = config[type] || config['love'];

    for (let i = 0; i < 40; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.innerText = icons[Math.floor(Math.random() * icons.length)];
        
        p.style.left = startX + 'px';
        p.style.top = startY + 'px';
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 300 + 150;
        p.style.setProperty('--x', `${Math.cos(angle) * velocity}px`);
        p.style.setProperty('--y', `${Math.sin(angle) * velocity}px`);
        p.style.fontSize = (Math.random() * 20 + 20) + 'px';

        document.body.appendChild(p);
        setTimeout(() => p.remove(), 2000);
    }
}