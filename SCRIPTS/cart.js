
export const cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add a flower to the cart

export const addToCart = (flower) => {
    const existingFlower = cart.find(
        (item) => item.id === flower.id
    );

    if (existingFlower) {
        existingFlower.quantity += 1;
    } else {
        cart.push({
            ...flower,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
};


// Display cart items on the page


export const displayCart = () => {
    const cartItems = document.querySelector(".cart-items");
    const cartTotal = document.querySelector(".cart-total");

    if (!cartItems) return;

    cartItems.innerHTML = "";

    let total = 0;
    cart.forEach((flower) => {
        const quantity = flower.quantity || 1;
        const subtotal = flower.price * quantity;

        total += subtotal;

        cartItems.innerHTML += `
        <div class="cart-item">

            <img src="../${flower.image}" alt="${flower.name}">

            <h3>${flower.name}</h3>

            <p>Price per bouquet: UGX ${flower.price.toLocaleString()}</p>

            <div class="quantity-controls">
                <button class="decrease-quantity" data-id="${flower.id}">−</button>

                <span>${quantity}</span>

                <button class="increase-quantity" data-id="${flower.id}">+</button>
            </div>

            <p>Subtotal: UGX ${subtotal.toLocaleString()}</p>

            <button class="remove-from-cart" data-id="${flower.id}">
                Remove
            </button>
        </div>
    `;
    });

    if (cartTotal) {
        cartTotal.textContent = `Total: UGX ${total.toLocaleString()}`;
    }
};


displayCart();


document.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-from-cart")) {
        const id = Number(event.target.dataset.id);

        const updatedCart = cart.filter((flower) => flower.id !== id);

        cart.splice(0, cart.length, ...updatedCart);

        localStorage.setItem("cart", JSON.stringify(cart));

        displayCart();
    }
});


document.addEventListener("click", (event) => {
    const button = event.target;

    if (
        button.classList.contains("increase-quantity") ||
        button.classList.contains("decrease-quantity")
    ) {
        const id = Number(button.dataset.id);

        const flower = cart.find((item) => item.id === id);

        if (!flower) return;

        flower.quantity = flower.quantity || 1;

        if (button.classList.contains("increase-quantity")) {
            if (flower.quantity < flower.stock) {
                flower.quantity++;
            }
        }

        if (button.classList.contains("decrease-quantity")) {
            if (flower.quantity > 1) {
                flower.quantity--;
            }
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        displayCart();
    }
});
