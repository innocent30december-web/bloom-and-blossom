
import { product, displayProduct } from "./product.js";
import { cart, addToCart, displayCart } from "./cart.js";


// =====================================
// 1. DISPLAY PRODUCTS
// =====================================

displayProduct();


// =====================================
// 2. RETRIEVE SAVED RATINGS
// =====================================

const ratings = JSON.parse(
    localStorage.getItem("productRatings")
) || {};


// =====================================
// 3. RESTORE SAVED PRODUCT RATINGS
// =====================================

document.querySelectorAll(".stars").forEach((starGroup) => {

    // Get the flower ID
    const firstStar = starGroup.querySelector("button");

    if (!firstStar) return;

    const flowerId = Number(firstStar.dataset.id);

    // Retrieve saved rating
    const savedRating = ratings[flowerId] || 0;

    // Restore numerical rating
    const ratingValue = starGroup.querySelector(".rating-value");

    if (ratingValue) {
        ratingValue.textContent = savedRating.toFixed(1);
    }

    // Restore star colours
    starGroup.querySelectorAll("button").forEach((star) => {

        const starRating = Number(star.dataset.rating);

        star.style.color =
            starRating <= savedRating ? "gold" : "lightgray";

    });

});


// =====================================
// 4. HANDLE STAR RATING CLICKS
// =====================================

document.querySelectorAll(".stars button").forEach((button) => {

    button.addEventListener("click", () => {

        const rating = Number(button.dataset.rating);
        const flowerId = Number(button.dataset.id);

        // Get stars belonging to this flower
        const stars = button.parentElement.querySelectorAll("button");

        // Update star colours
        stars.forEach((star) => {

            const starRating = Number(star.dataset.rating);

            star.style.color =
                starRating <= rating ? "gold" : "lightgray";

        });

        // Update numerical rating
        const ratingValue =
            button.parentElement.querySelector(".rating-value");

        if (ratingValue) {
            ratingValue.textContent = rating.toFixed(1);
        }

        // Update saved ratings
        ratings[flowerId] = rating;

        // Save ratings to LocalStorage
        localStorage.setItem(
            "productRatings",
            JSON.stringify(ratings)
        );

        console.log(ratings);

    });

});


// =====================================
// 5. CALCULATE AVERAGE RATING
// =====================================

const calculateAverage = (ratingList) => {

    if (ratingList.length === 0) {
        return 0;
    }

    const total = ratingList.reduce((sum, rating) => {
        return sum + rating;
    }, 0);

    return total / ratingList.length;

};


// Test average calculation
const sampleRatings = [5, 3, 4];

console.log(calculateAverage(sampleRatings)); // 4

document.title = "bloom&blossom"