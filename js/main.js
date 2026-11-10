/**
 * LK // SISTEMAS E PRODUTOS DIGITAIS
 * Interatividade & Otimização de Conversão (Vanilla JavaScript)
 */

// ==========================================================================
// 1. CONFIGURAÇÃO DE CHECKOUT EXTERNO (CHECKOUT_LINKS)
// ==========================================================================
// Mapeie os links das suas plataformas de pagamento (Hotmart, Kiwify, Stripe, Mercado Pago)
const CHECKOUT_LINKS = {
  'kernel-os': 'https://pay.kiwify.com.br/exemplo-kernel-os',
  'manual-operacoes': 'https://pay.hotmart.com/exemplo-manual-operacoes',
  'toolkit-automacao': 'https://pay.kiwify.com.br/exemplo-toolkit-automacao',
  'acervo-completo': 'https://pay.kiwify.com.br/exemplo-acervo-completo'
};

// Dados detalhados dos produtos para o modal de checkout
const PRODUCTS_DATA = {
  'kernel-os': {
    id: 'kernel-os',
    title: 'Kernel OS: Sistema Integrado de Gestão & Produtividade',
    category: 'Sistema Operacional Modular no Notion',
    priceOriginal: 'R$ 197',
    priceCurrent: 'R$ 97',
    installments: 'ou 12x de R$ 9,74 no cartão',
    badge: 'Mais Popular • Versão 3.2',
    benefits: [
      'Acesso imediato e vitalício ao template completo no Notion',
      'Configuração instantânea em 1 clique para seu workspace pessoal ou de equipe',
      'Painéis de metas, sprints, tarefas diárias, finanças e documentação',
      '40+ procedimentos operacionais padrão (SOPs) prontos para uso',
      'Tutorial em vídeo direto ao ponto (20 minutos) + suporte por e-mail',
      'Garantia incondicional de devolução total em até 7 dias'
    ]
  },
  'manual-operacoes': {
    id: 'manual-operacoes',
    title: 'Arquitetura de Operações Digitais Enxutas',
    category: 'Manual Estratégico & Tático em PDF',
    priceOriginal: 'R$ 97',
    priceCurrent: 'R$ 47',
    installments: 'ou 5x de R$ 10,25 no cartão',
    badge: 'Manual Prático',
    benefits: [
      'Download imediato do e-book técnico em PDF (118 páginas)',
      'Diagramas e fluxogramas de processos operacionais editáveis',
      'Checklist de auditoria de eficiência e stack de ferramentas sem custo',
      'Fichas de cálculo de tempo operacional e capacidade produtiva',
      'Compatível com leitura em smartphone, tablet e Kindle',
      'Garantia incondicional de devolução total em até 7 dias'
    ]
  },
  'toolkit-automacao': {
    id: 'toolkit-automacao',
    title: 'Toolkit de Automação & Prompts Operacionais',
    category: 'Ferramentas, Scripts & Modelos',
    priceOriginal: 'R$ 147',
    priceCurrent: 'R$ 67',
    installments: 'ou 8x de R$ 9,51 no cartão',
    badge: 'Automação & IA',
    benefits: [
      '12 blueprints de cenários prontos importáveis no Make / Zapier',
      '120+ prompts estruturados para relatórios, e-mails e síntese de dados',
      'Planilha de parametrização e teste de saídas de inteligência artificial',
      'Guia de integração entre ferramentas sem necessidade de código',
      'Acesso ao repositório privado com atualizações mensais inclusas',
      'Garantia incondicional de devolução total em até 7 dias'
    ]
  },
  'acervo-completo': {
    id: 'acervo-completo',
    title: 'Acervo Integral: Os 3 Produtos com Desconto Unificado',
    category: 'Pacote Completo de Eficiência',
    priceOriginal: 'R$ 441',
    priceCurrent: 'R$ 167',
    installments: 'ou 12x de R$ 16,77 no cartão',
    badge: 'Máxima Economia (62% OFF)',
    benefits: [
      'Todos os 3 produtos completos (Kernel OS + Manual + Toolkit)',
      'Acesso imediato e vitalício a todas as ferramentas e templates',
      'Economia de R$ 274 em relação à compra avulsa',
      'Todas as atualizações futuras de todos os produtos sem custo adicional',
      'Canal de suporte prioritário direto por e-mail em até 12h úteis',
      'Garantia incondicional de devolução total em até 7 dias'
    ]
  }
};

// ==========================================================================
// 2. INICIALIZAÇÃO APÓS CARREGAMENTO DO DOM
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initSmoothScroll();
  initFaqAccordion();
  initCategoryFilters();
  initCheckoutModal();
  initPolicyModals();
});

// ==========================================================================
// 3. EFEITO DE SCROLL NO HEADER
// ==========================================================================
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

// ==========================================================================
// 4. MENU MOBILE
// ==========================================================================
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!toggleBtn || !mobileNav) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = mobileNav.classList.contains('open');
    if (isOpen) {
      mobileNav.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    } else {
      mobileNav.classList.add('open');
      toggleBtn.setAttribute('aria-expanded', 'true');
    }
  });

  // Fechar menu ao clicar em qualquer link
  const links = mobileNav.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Fechar menu ao redimensionar tela
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 860) {
      mobileNav.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

// ==========================================================================
// 5. ROLAGEM SUAVE (SMOOTH SCROLL)
// ==========================================================================
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  const header = document.querySelector('.site-header');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = (header ? header.offsetHeight : 72) + 20;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ==========================================================================
// 6. FAQ INTERATIVO (ACORDEÃO COM FECHAMENTO AUTOMÁTICO)
// ==========================================================================
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!questionBtn || !answer) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Fecha todos os outros itens ativos
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherAnswer) {
            otherAnswer.style.maxHeight = null;
          }
        }
      });

      // Alterna o estado do item clicado
      if (isActive) {
        item.classList.remove('active');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // Abre o primeiro item por padrão para engajamento
  if (faqItems.length > 0) {
    const firstItem = faqItems[0];
    const firstAnswer = firstItem.querySelector('.faq-answer');
    if (firstAnswer) {
      firstItem.classList.add('active');
      firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
    }
  }
}

// ==========================================================================
// 7. FILTROS DE CATEGORIA DO CATÁLOGO
// ==========================================================================
function initCategoryFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  if (!filterBtns.length || !productCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');

      // Atualiza botões ativos
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filtra os cards
      productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(8px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

// ==========================================================================
// 8. MODAL DE CHECKOUT INTERATIVO
// ==========================================================================
function initCheckoutModal() {
  const checkoutModal = document.getElementById('checkoutModal');
  if (!checkoutModal) return;

  const closeBtns = checkoutModal.querySelectorAll('.modal-close-trigger');
  const continueBtn = checkoutModal.querySelector('#modalCheckoutBtn');

  // Elementos internos do modal para injeção dinâmica
  const titleEl = checkoutModal.querySelector('#modalProductTitle');
  const catEl = checkoutModal.querySelector('#modalProductCategory');
  const priceOriginalEl = checkoutModal.querySelector('#modalPriceOriginal');
  const priceCurrentEl = checkoutModal.querySelector('#modalPriceCurrent');
  const installmentsEl = checkoutModal.querySelector('#modalInstallments');
  const benefitsListEl = checkoutModal.querySelector('#modalBenefitsList');

  let currentProductId = null;

  // Ouvintes nos botões de compra
  const buyBtns = document.querySelectorAll('[data-buy-action]');
  buyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const productId = btn.getAttribute('data-product-id');
      const product = PRODUCTS_DATA[productId];

      if (!product) return;

      currentProductId = productId;

      // Preenche os dados no modal
      if (titleEl) titleEl.textContent = product.title;
      if (catEl) catEl.textContent = product.category;
      if (priceOriginalEl) priceOriginalEl.textContent = `De ${product.priceOriginal} por`;
      if (priceCurrentEl) priceCurrentEl.textContent = product.priceCurrent;
      if (installmentsEl) installmentsEl.textContent = product.installments;

      // Preenche a lista de benefícios
      if (benefitsListEl) {
        benefitsListEl.innerHTML = '';
        product.benefits.forEach(benefit => {
          const li = document.createElement('li');
          li.className = 'checkout-benefit-item';
          li.innerHTML = `
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>${benefit}</span>
          `;
          benefitsListEl.appendChild(li);
        });
      }

      // Abre o modal
      openModal(checkoutModal);
    });
  });

  // Ação de prosseguir para o checkout externo
  if (continueBtn) {
    continueBtn.addEventListener('click', () => {
      if (!currentProductId) return;

      const checkoutUrl = CHECKOUT_LINKS[currentProductId] || '#';

      // Feedback visual
      continueBtn.innerHTML = `
        <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10" stroke-width="3" stroke="rgba(255,255,255,0.3)"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-width="3" stroke="#ffffff"></path>
        </svg>
        Conectando ao gateway seguro...
      `;

      setTimeout(() => {
        showToast(`Redirecionando para o ambiente de pagamento criptografado...`);
        // Se a URL for um link de exemplo ou real, abre em nova aba
        window.open(checkoutUrl, '_blank', 'noopener,noreferrer');
        closeModal(checkoutModal);

        // Restaura texto original
        continueBtn.innerHTML = `
          <span>Ir para Pagamento Seguro</span>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        `;
      }, 700);
    });
  }

  // Fechamento do modal
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => closeModal(checkoutModal));
  });

  checkoutModal.addEventListener('click', (e) => {
    if (e.target === checkoutModal) {
      closeModal(checkoutModal);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && checkoutModal.classList.contains('open')) {
      closeModal(checkoutModal);
    }
  });
}

// ==========================================================================
// 9. MODAIS DE POLÍTICAS LEGAIS (TERMOS E PRIVACIDADE)
// ==========================================================================
function initPolicyModals() {
  const policyModal = document.getElementById('policyModal');
  if (!policyModal) return;

  const closeBtns = policyModal.querySelectorAll('.modal-close-trigger');
  const policyTitle = policyModal.querySelector('#policyModalTitle');
  const policyBody = policyModal.querySelector('#policyModalBody');

  const termsTrigger = document.getElementById('openTermsTrigger');
  const privacyTrigger = document.getElementById('openPrivacyTrigger');

  const POLICIES_TEXT = {
    terms: {
      title: 'Termos de Uso e Licenciamento',
      content: `
        <div class="policy-content">
          <h4>1. Natureza do Produto Digital</h4>
          <p>Todos os produtos comercializados neste portal são recursos digitais (templates, planilhas, manuais em PDF e códigos de automação). O acesso é concedido de forma imediata e permanente após a confirmação do pagamento pelo gateway processador.</p>

          <h4>2. Licença de Uso Individual e Comercial</h4>
          <p>A aquisição concede ao comprador uma licença perpétua e intransferível de uso pessoal ou corporativo interno. É expressamente proibida a revenda, sublicenciamento, doação, publicação pública ou distribuição não autorizada de qualquer arquivo ou template contido nos materiais.</p>

          <h4>3. Garantia Incondicional de 7 Dias</h4>
          <p>Em total cumprimento ao Artigo 49 do Código de Defesa do Consumidor (Lei Federal nº 8.078/1990), o comprador possui 7 (sete) dias corridos a contar da data de confirmação da compra para solicitar o cancelamento e reembolso integral do valor pago, sem qualquer taxa ou atrito administrativo.</p>

          <h4>4. Propriedade Intelectual</h4>
          <p>A marca LK, seus métodos, códigos, arquiteturas de informação e identidades visuais são propriedades protegidas pela legislação brasileira e internacional de direitos autorais e propriedade intelectual.</p>
        </div>
      `
    },
    privacy: {
      title: 'Política de Privacidade e Proteção de Dados (LGPD)',
      content: `
        <div class="policy-content">
          <h4>1. Compromisso com a Privacidade</h4>
          <p>A LK Tecnologia e Soluções Digitais Ltda. valoriza a privacidade e a segurança das informações dos seus usuários, atuando em estrita observância à Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018).</p>

          <h4>2. Dados Coletados e Finalidade</h4>
          <p>Coletamos exclusivamente os dados necessários para o processamento do pedido e emissão do comprovante de entrega (nome, endereço de e-mail e dados fiscais requeridos pela legislação tributária brasileira).</p>

          <h4>3. Segurança das Transações</h4>
          <p>Não armazenamos dados bancários ou números de cartão de crédito em nossos servidores. Todas as transações financeiras são intermediadas por processadores de pagamento com certificação internacional PCI-DSS e criptografia SSL de 256 bits.</p>

          <h4>4. Direitos do Titular</h4>
          <p>O titular poderá, a qualquer momento, solicitar a confirmação da existência de tratamento, a correção de dados incompletos ou a exclusão definitiva de seus registros através do e-mail oficial: <strong>suporte@lkdigital.com</strong>.</p>
        </div>
      `
    }
  };

  if (termsTrigger) {
    termsTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      if (policyTitle) policyTitle.textContent = POLICIES_TEXT.terms.title;
      if (policyBody) policyBody.innerHTML = POLICIES_TEXT.terms.content;
      openModal(policyModal);
    });
  }

  if (privacyTrigger) {
    privacyTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      if (policyTitle) policyTitle.textContent = POLICIES_TEXT.privacy.title;
      if (policyBody) policyBody.innerHTML = POLICIES_TEXT.privacy.content;
      openModal(policyModal);
    });
  }

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => closeModal(policyModal));
  });

  policyModal.addEventListener('click', (e) => {
    if (e.target === policyModal) {
      closeModal(policyModal);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && policyModal.classList.contains('open')) {
      closeModal(policyModal);
    }
  });
}

// ==========================================================================
// 10. FUNÇÕES AUXILIARES DE MODAL & TOAST
// ==========================================================================
function openModal(modal) {
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

function showToast(message) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#34D399">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
