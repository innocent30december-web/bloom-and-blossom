
const cart = JSON.parse(localStorage.getItem("cart")) || [];

const checkoutItems = document.querySelector(".checkout-items");


cart.forEach((flower) => {
    checkoutItems.innerHTML += `
        <div class="checkout-item">
            <h3>${flower.name}</h3>
            <p>Quantity: ${flower.quantity}</p>
            <p>Price: UGX ${flower.price * flower.quantity}</p>
        </div>
    `;
});

const checkoutTotal = document.querySelector(".checkout-grand-total");

const grandTotal = cart.reduce((total, flower) => {
    return total + flower.price * flower.quantity;
}, 0);

checkoutTotal.textContent = `UGX ${grandTotal.toLocaleString()}`;


const checkoutForm = document.querySelector(".checkout-form");

console.log(checkoutForm);

const fullName = document.querySelector("#fullname");
const phone = document.querySelector("#phone");
const address = document.querySelector
    ("#address");


const nameError = document.querySelector(".name-error");
const phoneNumberError = document.querySelector(".phone-error");
const deliveryAddressError = document.querySelector(".address-error");


fullName.addEventListener("input", () => {
    nameError.textContent = "";
});

phone.addEventListener("input", () => {
    phoneNumberError.textContent = "";
});

address.addEventListener("input", () => {
    deliveryAddressError.textContent = "";
});



checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Clear previous error messages
    nameError.textContent = "";
    phoneNumberError.textContent = "";
    deliveryAddressError.textContent = "";

    // Validate full name
    if (fullName.value.trim() === "") {
        nameError.textContent = "Please enter your full name.";
        return;
    }

    // Validate phone number
    if (phone.value.trim() === "") {
        phoneNumberError.textContent = "Please enter your phone number.";
        return;
    }

    if (!/^[0-9]+$/.test(phone.value.trim())) {
        phoneNumberError.textContent = "Please enter digits only.";
        return;
    }

    const phoneValue = phone.value.trim();

    const ugandanPhonePattern =
        /^(?:0(?:70|74|75|76|77|78|79)[0-9]{7}|\+256(?:70|74|75|76|77|78|79)[0-9]{7})$/;

    if (!ugandanPhonePattern.test(phoneValue)) {
        phoneNumberError.textContent =
            "Enter a valid Ugandan mobile number using local or international format.";
        return;
    }

    if (phone.value.trim().length !== 10) {
        phoneNumberError.textContent =
            "Please enter a 10-digit phone number.";
        return;
    }

    // Validate delivery address
    if (address.value.trim() === "") {
        deliveryAddressError.textContent =
            "Please enter your delivery address.";
        return;
    }

    // Create the order object
    const order = {
        orderId: `BB-${Date.now()}`,

        customer: {
            name: fullName.value.trim(),
            phone: phone.value.trim(),
            address: address.value.trim()
        },

        items: cart.map((flower) => ({
            id: flower.id,
            name: flower.name,
            price: flower.price,
            quantity: flower.quantity
        })),

        total: cart.reduce((total, flower) => {
            return total + flower.price * flower.quantity;
        }, 0),

        status: "Pending",
        createdAt: new Date().toISOString()
    };

    console.log("Order created:", order.orderId);
    console.log("Order total:", order.total);

    // Save the current order
    localStorage.setItem("order", JSON.stringify(order));

    console.log(localStorage.getItem("order"));

    // Retrieve the saved order
    const savedOrder = JSON.parse(localStorage.getItem("order"));

    console.log(savedOrder.orderId);
    console.log(savedOrder.total);
    console.log(savedOrder.status);
    console.log(savedOrder);

    // Retrieve previously saved orders
    const savedOrders =
        JSON.parse(localStorage.getItem("orders")) || [];

    // Add the current order to the orders array
    savedOrders.push(order);

    // Save all orders
    localStorage.setItem("orders", JSON.stringify(savedOrders));

    console.log("Total saved orders:", savedOrders.length);
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];

    console.log(allOrders);
    console.log("Number of orders:", allOrders.length);

    console.log(allOrders[3]);

    console.log(allOrders[0].items[0].name);
    console.log(allOrders[0].items[0].quantity);
    console.log(allOrders[0].items[0].price);
});
