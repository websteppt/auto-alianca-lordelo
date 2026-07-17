// =========================================================
// AUTO ALIANÇA LORDELO — script.js
// =========================================================
(function () {
  'use strict';

  /* ---------- Menu mobile ---------- */
  const navToggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const aberto = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!aberto));
      nav.setAttribute('data-open', String(!aberto));
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        nav.setAttribute('data-open', 'false');
      });
    });
  }

  /* ---------- Cabeçalho: sombra ao fazer scroll ---------- */
  const header = document.querySelector('[data-header]');
  if (header) {
    const onScroll = () => {
      header.style.boxShadow = window.scrollY > 8
        ? '0 8px 24px -12px rgba(0,0,0,.4)'
        : 'none';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- FAQ (acordeão acessível) ---------- */
  const faqContainer = document.querySelector('[data-faq]');
  if (faqContainer) {
    const perguntas = faqContainer.querySelectorAll('.faq-item__pergunta');

    perguntas.forEach((botao) => {
      const resposta = botao.closest('.faq-item').querySelector('.faq-item__resposta');
      resposta.style.maxHeight = '0px';

      botao.addEventListener('click', () => {
        const estaAberto = botao.getAttribute('aria-expanded') === 'true';

        // Fecha todas as outras perguntas
        perguntas.forEach((outroBotao) => {
          if (outroBotao !== botao) {
            outroBotao.setAttribute('aria-expanded', 'false');
            const outraResposta = outroBotao.closest('.faq-item').querySelector('.faq-item__resposta');
            outraResposta.style.maxHeight = '0px';
          }
        });

        botao.setAttribute('aria-expanded', String(!estaAberto));
        resposta.style.maxHeight = estaAberto ? '0px' : resposta.scrollHeight + 'px';
      });
    });
  }

  /* ---------- Formulário de contacto ---------- */
  const form = document.getElementById('form-contacto');

  if (form) {
    const mensagensErro = {
      nome: 'Por favor, indique o seu nome.',
      telefone: 'Indique um número de telemóvel válido.',
      email: 'Indique um email válido.',
      servico: 'Escolha o serviço pretendido.'
    };

    const validarCampo = (campo) => {
      const erroEl = form.querySelector(`[data-erro-para="${campo.name}"]`);
      let valido = true;
      let mensagem = '';

      if (campo.hasAttribute('required') && !campo.value.trim()) {
        valido = false;
        mensagem = mensagensErro[campo.name] || 'Campo obrigatório.';
      } else if (campo.type === 'email' && campo.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(campo.value)) {
        valido = false;
        mensagem = mensagensErro.email;
      } else if (campo.type === 'tel' && campo.value && !/^[+\d\s()-]{9,}$/.test(campo.value)) {
        valido = false;
        mensagem = mensagensErro.telefone;
      }

      if (erroEl) erroEl.textContent = valido ? '' : mensagem;
      campo.setAttribute('aria-invalid', String(!valido));
      return valido;
    };

    form.querySelectorAll('input, select').forEach((campo) => {
      campo.addEventListener('blur', () => validarCampo(campo));
    });

    form.addEventListener('submit', (evento) => {
      evento.preventDefault();

      const camposObrigatorios = form.querySelectorAll('[required]');
      let formularioValido = true;

      camposObrigatorios.forEach((campo) => {
        if (!validarCampo(campo)) formularioValido = false;
      });

      if (!formularioValido) {
        const primeiroInvalido = form.querySelector('[aria-invalid="true"]');
        if (primeiroInvalido) primeiroInvalido.focus();
        return;
      }

      // Em produção: substituir por um fetch() para o endpoint/API de envio de leads.
      const sucesso = form.querySelector('.form-sucesso');
      const botaoSubmit = form.querySelector('button[type="submit"]');

      botaoSubmit.disabled = true;
      botaoSubmit.textContent = 'A enviar...';

      setTimeout(() => {
        form.reset();
        botaoSubmit.disabled = false;
        botaoSubmit.textContent = 'Enviar pedido de orçamento';
        if (sucesso) {
          sucesso.hidden = false;
          sucesso.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 700);
    });
  }

  /* ---------- Revelação suave ao fazer scroll ---------- */
  const prefereReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefereReducedMotion && 'IntersectionObserver' in window) {
    const elementosRevelar = document.querySelectorAll(
      '.beneficio-card, .servico-card, .testemunho-card, .processo__item, .stat'
    );

    elementosRevelar.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity .5s ease, transform .5s ease';
    });

    const observer = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada, indice) => {
          if (entrada.isIntersecting) {
            const atraso = (indice % 4) * 70;
            setTimeout(() => {
              entrada.target.style.opacity = '1';
              entrada.target.style.transform = 'translateY(0)';
            }, atraso);
            observer.unobserve(entrada.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    elementosRevelar.forEach((el) => observer.observe(el));
  }

  /* ---------- Ano atual no rodapé ---------- */
  document.querySelectorAll('[data-ano-atual]').forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
})();
