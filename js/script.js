document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Funcionalidade do Menu Mobile ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-link'); // Seleciona todos os links de navegação

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('show'); // Adiciona/remove a classe 'show' para exibir/esconder o menu
            menuToggle.classList.toggle('active'); // Adiciona/remove a classe 'active' para animar o ícone do hambúrguer
            // Adiciona ou remove aria-expanded para acessibilidade
            const isExpanded = mainNav.classList.contains('show');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });

        // Fechar o menu ao clicar em um link (útil para mobile)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('show')) {
                    mainNav.classList.remove('show');
                    menuToggle.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // --- 2. Funcionalidade de Destaque do Link de Navegação Ativo ---
    // Esta parte assume que você está em 'index.html', 'feminino.html', etc.
    const currentPage = window.location.pathname.split('/').pop(); // Pega o nome do arquivo atual (ex: index.html)

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active'); // Adiciona a classe 'active' ao link da página atual
        } else if (currentPage === '' && link.getAttribute('href') === 'index.html') {
            // Caso especial para quando a URL é apenas o domínio (considera como index.html)
            link.classList.add('active');
        }
    });


    // --- 3. Simulação do Carrinho de Compras (Front-end) ---
    const cartCountSpan = document.querySelector('.cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; // Carrega itens do localStorage ou inicializa vazio

    // Função para atualizar o contador do carrinho
    const updateCartCount = () => {
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCountSpan) {
            cartCountSpan.textContent = totalItems;
        }
    };

    // Adicionar item ao carrinho
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.dataset.productId; // Pega o ID do produto do atributo data-product-id
            const productCard = event.target.closest('.product-card'); // Encontra o card do produto pai
            if (!productCard) return;

            const productName = productCard.querySelector('h3').textContent;
            const productPriceText = productCard.querySelector('.product-price').textContent;
            const productPrice = parseFloat(productPriceText.replace('R$', '').replace(',', '.').trim()); // Converte para número

            const existingItem = cartItems.find(item => item.id === productId);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cartItems.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    quantity: 1
                });
            }

            localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Salva no localStorage
            updateCartCount(); // Atualiza o contador na interface
            alert(`${productName} foi adicionado ao carrinho!`); // Feedback visual simples
        });
    });

    // Inicializa o contador do carrinho ao carregar a página
    updateCartCount();


    // --- 4. Simulação de Busca (Exemplo Simples) ---
    const searchButton = document.querySelector('.header-icons .icon-button[aria-label="Buscar produtos"]');
    if (searchButton) {
        searchButton.addEventListener('click', () => {
            const searchTerm = prompt('Digite o que você procura:');
            if (searchTerm) {
                alert(`Simulando busca por: "${searchTerm}".\nEm um site real, isso o levaria para uma página de resultados.`);
                // Aqui você implementaria a lógica real de busca ou redirecionaria para uma página de resultados
            }
        });
    }

    // --- 5. Validação de Formulário de Contato (Front-end) ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede o envio padrão do formulário

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            let isValid = true;

            // Validação de Nome (exemplo: não pode estar vazio)
            if (nameInput.value.trim() === '') {
                alert('Por favor, preencha seu nome.');
                nameInput.focus();
                isValid = false;
            }

            // Validação de E-mail (exemplo: formato básico de e-mail)
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (isValid && !emailPattern.test(emailInput.value.trim())) {
                alert('Por favor, insira um e-mail válido.');
                emailInput.focus();
                isValid = false;
            }

            // Validação de Mensagem (exemplo: não pode estar vazia)
            if (isValid && messageInput.value.trim() === '') {
                alert('Por favor, digite sua mensagem.');
                messageInput.focus();
                isValid = false;
            }

            if (isValid) {
                alert('Mensagem enviada com sucesso! (Simulação)\nEntraremos em contato em breve.');
                contactForm.reset(); // Limpa o formulário
                // Em um site real, aqui você enviaria os dados para um backend
            }
        });
    }
});document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Funcionalidade do Menu Mobile ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-link'); // Seleciona todos os links de navegação

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('show'); // Adiciona/remove a classe 'show' para exibir/esconder o menu
            menuToggle.classList.toggle('active'); // Adiciona/remove a classe 'active' para animar o ícone do hambúrguer
            // Adiciona ou remove aria-expanded para acessibilidade
            const isExpanded = mainNav.classList.contains('show');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });

        // Fechar o menu ao clicar em um link (útil para mobile)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('show')) {
                    mainNav.classList.remove('show');
                    menuToggle.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // --- 2. Funcionalidade de Destaque do Link de Navegação Ativo ---
    // Esta parte assume que você está em 'index.html', 'feminino.html', etc.
    const currentPage = window.location.pathname.split('/').pop(); // Pega o nome do arquivo atual (ex: index.html)

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active'); // Adiciona a classe 'active' ao link da página atual
        } else if (currentPage === '' && link.getAttribute('href') === 'index.html') {
            // Caso especial para quando a URL é apenas o domínio (considera como index.html)
            link.classList.add('active');
        }
    });


    // --- 3. Simulação do Carrinho de Compras (Front-end) ---
    const cartCountSpan = document.querySelector('.cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; // Carrega itens do localStorage ou inicializa vazio

    // Função para atualizar o contador do carrinho
    const updateCartCount = () => {
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCountSpan) {
            cartCountSpan.textContent = totalItems;
        }
    };

    // Adicionar item ao carrinho
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.dataset.productId; // Pega o ID do produto do atributo data-product-id
            const productCard = event.target.closest('.product-card'); // Encontra o card do produto pai
            if (!productCard) return;

            const productName = productCard.querySelector('h3').textContent;
            const productPriceText = productCard.querySelector('.product-price').textContent;
            const productPrice = parseFloat(productPriceText.replace('R$', '').replace(',', '.').trim()); // Converte para número

            const existingItem = cartItems.find(item => item.id === productId);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cartItems.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    quantity: 1
                });
            }

            localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Salva no localStorage
            updateCartCount(); // Atualiza o contador na interface
            alert(`${productName} foi adicionado ao carrinho!`); // Feedback visual simples
        });
    });

    // Inicializa o contador do carrinho ao carregar a página
    updateCartCount();


    // --- 4. Simulação de Busca (Exemplo Simples) ---
    const searchButton = document.querySelector('.header-icons .icon-button[aria-label="Buscar produtos"]');
    if (searchButton) {
        searchButton.addEventListener('click', () => {
            const searchTerm = prompt('Digite o que você procura:');
            if (searchTerm) {
                alert(`Simulando busca por: "${searchTerm}".\nEm um site real, isso o levaria para uma página de resultados.`);
                // Aqui você implementaria a lógica real de busca ou redirecionaria para uma página de resultados
            }
        });
    }

    // --- 5. Validação de Formulário de Contato (Front-end) ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede o envio padrão do formulário

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            let isValid = true;

            // Validação de Nome (exemplo: não pode estar vazio)
            if (nameInput.value.trim() === '') {
                alert('Por favor, preencha seu nome.');
                nameInput.focus();
                isValid = false;
            }

            // Validação de E-mail (exemplo: formato básico de e-mail)
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (isValid && !emailPattern.test(emailInput.value.trim())) {
                alert('Por favor, insira um e-mail válido.');
                emailInput.focus();
                isValid = false;
            }

            // Validação de Mensagem (exemplo: não pode estar vazia)
            if (isValid && messageInput.value.trim() === '') {
                alert('Por favor, digite sua mensagem.');
                messageInput.focus();
                isValid = false;
            }

            if (isValid) {
                alert('Mensagem enviada com sucesso! (Simulação)\nEntraremos em contato em breve.');
                contactForm.reset(); // Limpa o formulário
                // Em um site real, aqui você enviaria os dados para um backend
            }
        });
    }
});