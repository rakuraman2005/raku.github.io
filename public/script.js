document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cart = document.querySelector('.cart');
    const cartItems = document.querySelector('.cart-items');
    const totalPriceElement = document.querySelector('.total-price');
    const checkoutButton = document.querySelector('.checkout-btn');

    let cartData = [];

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const menuItem = e.target.closest('.menu-item');
            const itemName = menuItem.getAttribute('data-name');
            const itemPrice = parseFloat(menuItem.getAttribute('data-price'));

            addItemToCart(itemName, itemPrice);
        });
    });

    checkoutButton.addEventListener('click', () => {
        alert('Checkout not implemented yet!');
    });

    function addItemToCart(name, price) {
        const existingItem = cartData.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartData.push({ name, price, quantity: 1 });
        }

        renderCart();
    }

    function renderCart() {
        cartItems.innerHTML = '';

        let totalPrice = 0;

        cartData.forEach(item => {
            const itemElement = document.createElement('li');
            itemElement.textContent = `${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
            cartItems.appendChild(itemElement);

            totalPrice += item.price * item.quantity;
        });

        totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
        cart.style.display = cartData.length > 0 ? 'flex' : 'none';
    }
});
