/* ============================================================
   SITE DIA DOS NAMORADOS — script.js
   Edite as seções marcadas com ✏️ para personalizar o site
   ============================================================ */

/* ============================================================
   ✏️  CONFIGURAÇÕES — edite aqui
   ============================================================ */

// Data de início do relacionamento (ano, mês-1, dia)
const START_DATE = new Date(2026, 3, 15); // 12 de junho de 2023

// Fotos da galeria — substitua os src pelos caminhos das suas fotos
// Se não tiver foto, um placeholder elegante será exibido
const PHOTOS = [
  {
    src: "",
    title: "Nosso primeiro encontro",
    caption: "O dia em que tudo começou",
  },
  {
    src: "",
    title: "Nossa viagem",
    caption: "Aventuras que guardarei para sempre",
  },
  { src: "", title: "Nosso aniversário", caption: "Celebrando nosso amor" },
  {
    src: "",
    title: "Dia especial",
    caption: "Um momento que ficou na memória",
  },
  { src: "", title: "Juntos", caption: "Simplesmente felizes" },
];

// Linha do tempo do relacionamento
const TIMELINE = [
  {
    date: "Agosto 2025",
    title: "Respondi um tweet teu",
    desc: "Eu não tinha ideia que era minha alma gemea.",
  },
  {
    date: "Fevereiro de 2026",
    title: "Você me pediu ajuda em Log",
    desc: "No fim nunca te ensinei, mas você nem queria aprender, queria era falar comigo.",
  },
  {
    date: "Março 2026",
    title: "Nosso primeiro 'Eu te amo'",
    desc: "Você sabia que eu te amava e eu sabia que tu me amava.",
  },
  {
    date: "Abril 2026",
    title: "Inicio do namoro",
    desc: "Parece que você estava perto de mim, eu sonho com você desde então.",
  },
  {
    date: "Junho 2026",
    title: "Nosso primeiro dia da alma",
    desc: "Queria passar do seu lado, eu ia te encher de beijos.",
  },
  {
    date: "Julho 2036",
    title: "Nosso casamento",
    desc: "'Acho que dei spoilers... deletar isso mais tarde...'",
  },
];
// Carta de amor — escreva à vontade!
const LOVE_LETTER = `Querida Alice,

Pensei que já soubesse o que era o amor, seu conceito, ter visto ele em filmes, em musicas, parecia algo claro de se ver e de dizer, não conhecia os mistérios ou tudo que poderiamos renunciar pelo amor.

Eu estava enganado! Era preciso experienciar-lo, e eu o encontrei em você, o calor do seu amor é sentido a distância, sua paixão é única, quero te pegar nos braços, te amo tanto, seja minha.

Você me ensinou o que é amar alguém é escolhê-la todos os dias, em todos os momentos, me ensinou o que é esperar uma mensagem ou uma ligação e sorrir quando vê ela, me fez saber o que dizer não vem da mente, mas do coração.

Posso estar parecendo meloso, mas não existe um jeito não-brega de dizer o quanto eu te amo, nós vamos nos casar e eu serei seu marido.

Com todo meu amor,`;

// Assinatura da carta
const LETTER_SIGNATURE = "— teu Amoreco ♥";

/* ============================================================
   FIM DAS CONFIGURAÇÕES
   ============================================================ */

// ── 1. PÉTALAS CAINDO (canvas) ──────────────────────────────
(function initPetals() {
  const canvas = document.getElementById("petals-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let W, H, petals;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function randomPetal() {
    return {
      x: Math.random() * W,
      y: -20,
      r: 3 + Math.random() * 5,
      color: ["#ff6b8a", "#f5b8c4", "#c0253a", "#e8a0b0"][
        Math.floor(Math.random() * 4)
      ],
      speed: 0.6 + Math.random() * 1.2,
      drift: (Math.random() - 0.5) * 0.6,
      spin: (Math.random() - 0.5) * 0.05,
      angle: Math.random() * Math.PI * 2,
      waveAmp: 20 + Math.random() * 20,
      waveFreq: 0.005 + Math.random() * 0.005,
      wavePhase: Math.random() * Math.PI * 2,
    };
  }

  function init() {
    resize();
    petals = Array.from({ length: 45 }, randomPetal);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    petals.forEach((p) => {
      p.y += p.speed;
      p.angle += p.spin;
      p.x += p.drift + Math.sin(p.y * p.waveFreq + p.wavePhase) * 0.8;
      if (p.y > H + 20) Object.assign(p, randomPetal(), { y: -20 });

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.beginPath();
      // pétala simples (elipse)
      ctx.ellipse(0, 0, p.r, p.r * 1.7, 0, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.7;
      ctx.fill();
      ctx.restore();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  init();
  draw();
})();

// ── 2. MÚSICA ────────────────────────────────────────────────
(function initMusic() {
  const btn = document.getElementById("musicBtn");
  const audio = document.getElementById("bgMusic");
  if (!btn || !audio) return;
  let playing = false;

  btn.addEventListener("click", () => {
    if (playing) {
      audio.pause();
      btn.classList.remove("playing");
    } else {
      audio.play().catch(() => {}); // ignora erro se não tiver arquivo
      btn.classList.add("playing");
    }
    playing = !playing;
  });
})();

// ── 3. CONTADOR ──────────────────────────────────────────────
(function initCounter() {
  const elDays = document.getElementById("countDays");
  const elHours = document.getElementById("countHours");
  const elMinutes = document.getElementById("countMinutes");
  const elSeconds = document.getElementById("countSeconds");
  if (!elDays) return;

  function animate(el, target) {
    let current = 0;
    const step = Math.ceil(target / 60);
    const id = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current.toLocaleString("pt-BR");
      if (current >= target) clearInterval(id);
    }, 16);
  }

  function tick() {
    const now = new Date();
    const diff = now - START_DATE; // ms
    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = totalSeconds % 60;

    elDays.textContent = days.toLocaleString("pt-BR");
    elHours.textContent = String(hours).padStart(2, "0");
    elMinutes.textContent = String(minutes).padStart(2, "0");
    elSeconds.textContent = String(seconds).padStart(2, "0");
  }

  // anima na primeira vez que a seção aparece
  let animated = false;
  const counterSection = document.getElementById("contador");
  const obs = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !animated) {
        animated = true;
        const now = new Date();
        const diff = now - START_DATE;
        animate(elDays, Math.floor(diff / 86400000));
        obs.disconnect();
      }
    },
    { threshold: 0.3 },
  );
  if (counterSection) obs.observe(counterSection);

  tick();
  setInterval(tick, 1000); // atualiza o relógio a cada segundo
})();

// ── 4. CARTAS (ENVELOPES) ────────────────────────────────────
(function initEnvelopes() {
  const envelopes = document.querySelectorAll(".envelope");
  if (!envelopes.length) return;

  function closeAll() {
    envelopes.forEach((env) => env.classList.remove("open"));
  }

  envelopes.forEach((env) => {
    // Clicar na frente abre a carta
    const front = env.querySelector(".env-front");
    front.addEventListener("click", () => {
      const isOpen = env.classList.contains("open");
      closeAll();
      if (!isOpen) env.classList.add("open");
    });

    // Botão fechar dentro da carta
    const closeBtn = env.querySelector(".env-letter-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        env.classList.remove("open");
      });
    }
  });
})();

// ── 5. CARROSSEL ─────────────────────────────────────────────
(function initCarousel() {
  const track = document.getElementById("carouselTrack");
  const dotsEl = document.getElementById("carouselDots");
  const prev = document.getElementById("prevBtn");
  const next = document.getElementById("nextBtn");
  if (!track) return;

  let current = 0;

  PHOTOS.forEach((photo, i) => {
    const slide = document.createElement("div");
    slide.className = "carousel-slide";

    if (photo.src) {
      slide.innerHTML = `
        <img class="carousel-img" src="${photo.src}" alt="${photo.title}" loading="lazy" />
      `;
    } else {
      slide.innerHTML = `
        <div class="carousel-placeholder">
          <span class="carousel-placeholder-icon">📷</span>
          <span class="carousel-placeholder-text">Adicione sua foto aqui</span>
        </div>
      `;
    }

    slide.innerHTML += `
      <div class="carousel-caption">
        <h3>${photo.title}</h3>
        <p>${photo.caption}</p>
      </div>
    `;
    track.appendChild(slide);

    // dot
    const dot = document.createElement("span");
    dot.className = "dot" + (i === 0 ? " active" : "");
    dot.addEventListener("click", () => goTo(i));
    dotsEl.appendChild(dot);
  });

  function goTo(n) {
    current = (n + PHOTOS.length) % PHOTOS.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dotsEl
      .querySelectorAll(".dot")
      .forEach((d, i) => d.classList.toggle("active", i === current));
  }

  prev?.addEventListener("click", () => goTo(current - 1));
  next?.addEventListener("click", () => goTo(current + 1));

  // swipe (toque)
  let startX = 0;
  track.addEventListener("touchstart", (e) => (startX = e.touches[0].clientX), {
    passive: true,
  });
  track.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) goTo(dx < 0 ? current + 1 : current - 1);
  });

  // auto-play a cada 5s
  setInterval(() => goTo(current + 1), 5000);
})();

// ── 6. LINHA DO TEMPO ────────────────────────────────────────
(function initTimeline() {
  const el = document.getElementById("timelineEl");
  if (!el) return;

  TIMELINE.forEach((item) => {
    const div = document.createElement("div");
    div.className = "timeline-item";
    div.innerHTML = `
      <div class="timeline-content">
        <span class="timeline-date">${item.date}</span>
        <p class="timeline-title">${item.title}</p>
        <p class="timeline-desc">${item.desc}</p>
      </div>
      <div class="timeline-dot"></div>
      <div class="timeline-spacer"></div>
    `;
    el.appendChild(div);
  });

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("visible");
      });
    },
    { threshold: 0.2 },
  );

  el.querySelectorAll(".timeline-item").forEach((i) => obs.observe(i));
})();

// ── 7. CARTA — MÁQUINA DE ESCREVER ───────────────────────────
(function initTypewriter() {
  const el = document.getElementById("cartaText");
  const sig = document.getElementById("cartaAssinatura");
  if (!el || !sig) return;

  const cursor = document.createElement("span");
  cursor.className = "cursor";
  let typed = false;

  // só inicia quando a seção entra na tela
  const obs = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !typed) {
        typed = true;
        obs.disconnect();
        type(0);
      }
    },
    { threshold: 0.3 },
  );

  const section = document.getElementById("carta");
  if (section) obs.observe(section);

  function type(i) {
    if (i <= LOVE_LETTER.length) {
      el.textContent = LOVE_LETTER.slice(0, i);
      el.appendChild(cursor);
      requestAnimationFrame(() => setTimeout(() => type(i + 1), 22));
    } else {
      // remove cursor e mostra assinatura
      cursor.remove();
      sig.textContent = LETTER_SIGNATURE;
      sig.classList.add("show");
    }
  }
})();

// ── 8. SCROLL REVEAL (genérico) ──────────────────────────────
(function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  items.forEach((i) => obs.observe(i));
})();
