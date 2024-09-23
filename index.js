// fetching data from the API
let p = [];
const fetchPromises = [];

const productsCount = 20;
for (let i = 1; i <= productsCount; i++) {
    const fetchPromise = fetch(`https://fakestoreapi.com/products/${i}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        p.push(data);
    })
    .catch(error => console.error('Error fetching product:', error)); // Optional error handling

    fetchPromises.push(fetchPromise); // Add the promise to the array
}

// Wait for all fetch requests to complete
Promise.all(fetchPromises).then(() => {
    p.forEach(element => {
        console.log(element); // Log each product
    });
});

// Adding a cart variable so that I can add items to the cart later
let cart = [];

// Function to render product cards
function displayProducts(products) {
    const productsList = document.getElementById('product-list');
    productsList.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('card');
        
        card.innerHTML = `
            <div
          class="p-3 hover:scale-[1.01] duration-500 hover:shadow-lg   mx-auto  rounded-md border-gray-300 border bg-[#e2e3e4] w-[300px] shadow-md">
          <img class="rounded-t-sm w-full duration-500 object-cover hover:scale-105 h-[250px]" src="images/products image/iphoneX.jpg" alt="">
          <div class="flex flex-col  gap-3 justify-between mt-2">
            <div>
              <h1 class="text-lg font-semibold">dash keyboard</h1>
              <p class="font-semibold">price: <span class="">500 <span class="font-bold text-xl">$</span></span></p>
            </div>
            <!-- add to cart or buy now button -->
            <div class="flex justify-between">
              <button
                class="addToCartBtn">Add
                to Cart</button>
              <button
                class="buyBtn"
                id="check">Buy Now</button>
            </div>
          </div>

        </div>`;
        
        productsList.appendChild(card);
    });
}

// Call the displayProducts function once all data is fetched
Promise.all(fetchPromises).then(() => {
    displayProducts(p); // Call the function to render the product cards
});

// Function to add items to the cart
function addToCart(productId) {
    const product = p.find(item => item.id === productId);
    if (product) {
        cart.push(product);
        alert(`${product.title} added to cart!`);
    }
}
