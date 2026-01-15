// =======================
// ✅ Formulário (Formspree)
// =======================
const form = document.querySelector('.confirmation-form');
// =======================
// 👨‍👩‍👧‍👦 Campos dinâmicos para nomes
// =======================
const adultsInput = document.getElementById('guests');
const childrenInput = document.getElementById('guests_children');
const namesContainer = document.getElementById('guests-names-container');

function updateGuestFields() {
  const adults = parseInt(adultsInput.value) || 0;
  const children = parseInt(childrenInput.value) || 0;

  namesContainer.innerHTML = '';

  if (adults > 0) {
    const title = document.createElement('h3');
    title.textContent = 'Adultos';
    title.style.margin = '18px 0 8px';
    namesContainer.appendChild(title);

    for (let i = 1; i <= adults; i++) {
      namesContainer.innerHTML += `
        <div class="form-group">
          <label>Nome do Adulto ${i}</label>
          <input type="text" name="adult_${i}" placeholder="Nome completo" required>
        </div>
      `;
    }
  }

  if (children > 0) {
    const title = document.createElement('h3');
    title.textContent = 'Crianças';
    title.style.margin = '18px 0 8px';
    namesContainer.appendChild(title);

    for (let i = 1; i <= children; i++) {
      namesContainer.innerHTML += `
        <div class="form-group">
          <label>Nome da Criança ${i}</label>
          <input type="text" name="child_${i}" placeholder="Nome">
        </div>
      `;
    }
  }
}

adultsInput.addEventListener('input', updateGuestFields);
childrenInput.addEventListener('input', updateGuestFields);


form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const msg = document.getElementById('confirmation-message');
  msg.textContent = '⏳ A enviar...';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      msg.textContent = '🎉 Obrigado pela confirmação! Aguardamos por si no nosso dia 💕';
      form.reset();
    } else {
      msg.textContent = '⚠️ Ocorreu um erro. Tente novamente mais tarde.';
    }
  } catch {
    msg.textContent = '⚠️ Não foi possível enviar. Verifique a ligação.';
  }
});


// =======================
// 🎵 Música (botão play/pause)
// =======================
document.addEventListener('DOMContentLoaded', () => {
  const music = document.getElementById('bg-music');
  const btn = document.getElementById('music-toggle');
  const icon = document.getElementById('music-icon');

  if (!music || !btn || !icon) return;

  let isPlaying = false;

  // prepara o áudio
  music.volume = 0.6;
  music.load();

  btn.addEventListener('click', async () => {
    try {
      if (!isPlaying) {
        // força desbloqueio com gesto do utilizador
        await music.play();

        isPlaying = true;
        icon.innerHTML = `<path d="M6 5h4v14H6zM14 5h4v14h-4z" fill="currentColor"/>`;
        btn.classList.add('playing');
      } else {
        music.pause();
        isPlaying = false;

        icon.innerHTML = `<path d="M8 5v14l11-7z" fill="currentColor"/>`;
        btn.classList.remove('playing');
      }
    } catch (err) {
      console.error('Áudio bloqueado pelo browser:', err);
      alert('Clique novamente para ativar o som 🎵');
    }
  });
});
