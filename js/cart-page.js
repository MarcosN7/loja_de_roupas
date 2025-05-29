document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotalPriceElement = document.getElementById('cart-total-price');
    const emptyCartPlaceholder = document.getElementById('empty-cart-placeholder');
    const checkoutButton = document.getElementById('checkout-btn'); // For future use
    const cartTotalsSection = document.querySelector('.cart-totals');
    const cartActionsSection = document.querySelector('.cart-actions');

    let cartItems = [];
    let localStorageWarningShown = false; // To match potential global var in script.js

    // Helper function to format currency
    function formatCurrency(value) {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    // Function to update the cart count in the main header
    function updateHeaderCartCount() {
        const headerCartCountSpan = document.querySelector('.main-header .cart-count');
        if (headerCartCountSpan) {
            const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
            headerCartCountSpan.textContent = totalItems;
        }
    }

    // Function to update cart totals
    function updateCartTotals() {
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        if (cartTotalPriceElement) {
            cartTotalPriceElement.textContent = formatCurrency(total);
        }
        // Also update header cart count whenever totals change
        updateHeaderCartCount();
    }

    // Function to save cart to localStorage
    function saveCart() {
        try {
            if (typeof Storage !== "undefined") {
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
            } else {
                if (!localStorageWarningShown) {
                    console.warn('LocalStorage is not available. Cart items will not be saved.');
                    // alert('Atenção: O seu navegador não permite salvar os itens do carrinho entre visitas.');
                    localStorageWarningShown = true;
                }
            }
        } catch (e) {
            console.warn('Erro ao salvar itens no localStorage.', e);
            if (!localStorageWarningShown) {
                // alert('Atenção: Ocorreu um erro ao tentar salvar seu carrinho.');
                localStorageWarningShown = true;
            }
        }
    }

    // Function to handle item removal
    function handleRemoveItem(productId) {
        cartItems = cartItems.filter(item => item.id !== productId);
        saveCart();
        renderCartItems();
        updateCartTotals(); // This will also update header count
    }

    // Function to handle quantity update
    function handleUpdateQuantity(productId, newQuantity) {
        newQuantity = parseInt(newQuantity, 10);
        const itemIndex = cartItems.findIndex(item => item.id === productId);

        if (itemIndex > -1) {
            if (newQuantity > 0) {
                cartItems[itemIndex].quantity = newQuantity;
            } else {
                // If quantity is 0 or less, remove the item
                cartItems.splice(itemIndex, 1);
            }
            saveCart();
            renderCartItems(); // Re-render all items for simplicity now
            updateCartTotals(); // This will also update header count
        }
    }

    // Function to render cart items in the DOM
    function renderCartItems() {
        if (!cartItemsContainer) return;
        cartItemsContainer.innerHTML = ''; // Clear existing items

        if (cartItems.length === 0) {
            if (emptyCartPlaceholder) emptyCartPlaceholder.style.display = 'block';
            if (cartItemsContainer) cartItemsContainer.style.display = 'none';
            if (cartTotalsSection) cartTotalsSection.style.display = 'none';
            if (cartActionsSection) {
                 // Hide only checkout button if cart is empty, keep "Continue Shopping"
                if(checkoutButton) checkoutButton.style.display = 'none';
            }
        } else {
            if (emptyCartPlaceholder) emptyCartPlaceholder.style.display = 'none';
            if (cartItemsContainer) cartItemsContainer.style.display = 'block'; // Or use table display
            if (cartTotalsSection) cartTotalsSection.style.display = 'block'; // Or 'flex' or 'grid' if needed
             if (cartActionsSection) {
                if(checkoutButton) checkoutButton.style.display = 'inline-block'; // Or original display type
            }

            const table = document.createElement('table');
            table.classList.add('cart-table');
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Preço Unit.</th>
                        <th>Quantidade</th>
                        <th>Total Linha</th>
                        <th>Remover</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            `;
            const tbody = table.querySelector('tbody');

            cartItems.forEach(item => {
                const itemRow = document.createElement('tr');
                itemRow.classList.add('cart-item');

                const lineTotal = item.price * item.quantity;

                itemRow.innerHTML = `
                    <td>${item.name}</td>
                    <td>${formatCurrency(item.price)}</td>
                    <td class="cart-item-quantity">
                        <input type="number" value="${item.quantity}" min="1" data-product-id="${item.id}">
                    </td>
                    <td>${formatCurrency(lineTotal)}</td>
                    <td class="cart-item-remove">
                        <button data-product-id="${item.id}">Remover</button>
                    </td>
                `;

                const quantityInput = itemRow.querySelector('input[type="number"]');
                quantityInput.addEventListener('change', (event) => {
                    handleUpdateQuantity(event.target.dataset.productId, event.target.value);
                });
                // Prevent form submission if this input is part of a form
                quantityInput.addEventListener('keypress', (event) => {
                    if (event.key === 'Enter') {
                        event.preventDefault();
                        handleUpdateQuantity(event.target.dataset.productId, event.target.value);
                    }
                });


                const removeButton = itemRow.querySelector('button');
                removeButton.addEventListener('click', (event) => {
                    handleRemoveItem(event.target.dataset.productId);
                });

                tbody.appendChild(itemRow);
            });
            cartItemsContainer.appendChild(table);
        }
    }

    // Function to load cart items from localStorage
    function loadCartItems() {
        try {
            if (typeof Storage !== "undefined") {
                const storedItems = localStorage.getItem('cartItems');
                cartItems = storedItems ? JSON.parse(storedItems) : [];
            } else {
                throw new Error("LocalStorage is not supported by this browser.");
            }
        } catch (e) {
            console.warn('Erro ao carregar itens do localStorage. O carrinho pode não funcionar como esperado.', e);
            if (!localStorageWarningShown) {
                // alert('Atenção: Não foi possível carregar seu carrinho. Algumas funcionalidades podem estar indisponíveis.');
                localStorageWarningShown = true;
            }
            cartItems = []; // Ensure cartItems is an array
        }
        renderCartItems();
        updateCartTotals(); // This also calls updateHeaderCartCount
    }

    // Initialization
    if (cartItemsContainer && cartTotalPriceElement && emptyCartPlaceholder) {
        loadCartItems();
    } else {
        console.error('Elementos essenciais da página do carrinho não foram encontrados. O script não será executado.');
    }

    // Example for checkout button (no actual checkout logic yet)
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            if (cartItems.length > 0) {
                alert('Simulando finalização de compra...\nEm um site real, você seria direcionado para o pagamento.');
                // Potentially clear cart:
                // cartItems = [];
                // saveCart();
                // renderCartItems();
                // updateCartTotals();
            } else {
                alert('Seu carrinho está vazio. Adicione itens antes de finalizar a compra.');
            }
        });
    }
});
