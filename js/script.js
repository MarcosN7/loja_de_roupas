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

    let cartItems = [];
    let localStorageWarningShown = false;

    try {
        if (typeof Storage === "undefined") {
            throw new Error("LocalStorage is not supported by this browser.");
        }
        cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    } catch (e) {
        console.warn('Erro ao acessar o localStorage. O carrinho não será salvo entre sessões.', e);
        if (!localStorageWarningShown) {
            alert('Atenção: O seu navegador não permite salvar os itens do carrinho entre visitas (localStorage indisponível ou bloqueado). O carrinho funcionará apenas nesta sessão.');
            localStorageWarningShown = true;
        }
        // Mesmo com erro, inicializa cartItems como array vazio para a sessão atual
        cartItems = cartItems || [];
    }

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
            if (!productCard) {
                console.error('Product card not found for this button.');
                return;
            }

            const productNameElement = productCard.querySelector('h3');
            if (!productNameElement) {
                console.error('Product name element not found in product card:', productCard);
                return;
            }
            const productName = productNameElement.textContent;

            const productPriceElement = productCard.querySelector('.product-price');
            if (!productPriceElement) {
                console.error('Product price element not found in product card:', productCard);
                return;
            }
            const productPriceText = productPriceElement.textContent;
            const productPrice = parseFloat(productPriceText.replace('R$', '').replace(',', '.').trim()); // Converte para número

            if (isNaN(productPrice)) {
                console.error('Invalid product price format after parsing:', productPriceText);
                return;
            }

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

            try {
                if (typeof Storage !== "undefined") {
                    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Salva no localStorage
                } else {
                     if (!localStorageWarningShown) {
                        console.warn('LocalStorage is not available. Cart items will not be saved.');
                        alert('Atenção: O seu navegador não permite salvar os itens do carrinho entre visitas (localStorage indisponível ou bloqueado). O carrinho funcionará apenas nesta sessão.');
                        localStorageWarningShown = true;
                    }
                }
            } catch (e) {
                console.warn('Erro ao salvar itens no localStorage. O carrinho pode não persistir.', e);
                if (!localStorageWarningShown) {
                    alert('Atenção: Ocorreu um erro ao tentar salvar seu carrinho. Os itens podem não ser mantidos entre visitas.');
                    localStorageWarningShown = true;
                }
            }

            updateCartCount(); // Atualiza o contador na interface
            // Feedback visual melhorado
            const itemInCart = cartItems.find(item => item.id === productId); // Pega o item atualizado
            const currentQuantity = itemInCart ? itemInCart.quantity : 0; // Garante que temos a quantidade
            const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
            alert(`${productName} foi adicionado ao carrinho! Quantidade: ${currentQuantity}. Total de itens no carrinho: ${totalCartItems}`);
        });
    });

    // Inicializa o contador do carrinho ao carregar a página
    updateCartCount();

    // --- Event listener para o ícone do carrinho ---
    // Seleciona o ícone do carrinho especificamente no header, se houver múltiplos .cart-icon
    const headerCartIcon = document.querySelector('.main-header .cart-icon');
    if (headerCartIcon) {
        headerCartIcon.addEventListener('click', () => {
            window.location.href = 'cart.html'; // Navega para a página do carrinho
        });
    }

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