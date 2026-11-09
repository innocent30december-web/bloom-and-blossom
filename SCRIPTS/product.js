
export const product = [
    {
        id: 1,
        name: "Red Rose Bouquet",
        price: 45000,
        category: "Rose",
        stock: 10,
        image: "../IMAGES/red-rose.jpg"
    },
    {
        id: 2,
        name: "White Lily Bouquet",
        price: 55000,
        category: "Lilies",
        stock: 7,
        image: "../IMAGES/white-lilies.jpg"
    }
];


// Display all products
export const displayProduct = () => {

    const display = document.querySelector(".lilies");

    if (!display) return;

    display.innerHTML = product.map((flower) => {

        return `
            <div class="imagediv">

                <img src="${flower.image}" alt="${flower.name}">

                <h3>${flower.name}</h3>

                <span>UGX ${flower.price.toLocaleString()}</span>

                <div class="product-rating">

                    <p>Rate this flower:</p>

                    <div class="stars">

                        ${[1, 2, 3, 4, 5].map((rating) => `
                            <button
                                type="button"
                                data-rating="${rating}"
                                data-id="${flower.id}"
                            >★</button>
                        `).join("")}

                        <span class="rating-value">0.0</span>

                    </div>

                    <p class="rating-message"></p>

                </div>

                <button
                    class="add-to-cart"
                    data-id="${flower.id}"
                >
                    Add to Cart
                </button>

            </div>
        `;

    }).join("");

};
