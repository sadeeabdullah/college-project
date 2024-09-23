


// fetching data from the API
let p = [];
const fetchPromises = [];

// Show loader
document.getElementById('loader').removeAttribute('style')

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
    // Hide loader after all data is fetched
    document.getElementById('loader').style.display = 'none';

    displayProducts(p); // Call the function to render the product cards

    displayProductsOnHome(p.slice(1,3))
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
            <div class="p-3 hover:scale-[1.01] duration-500 hover:shadow-lg mx-auto rounded-md border-gray-300 border bg-[#e2e3e4] w-[300px] shadow-md ">
                <div class="overflow-hidden ">
                <img class="rounded-t-sm  w-full duration-500 object-cover  hover:scale-105 h-[250px]" src="${product.image}" alt="${product.title}">
                </div>
                <div class="flex flex-col gap-3 justify-between mt-2">
                    <div>
                        <h1 class="text-md font-semibold">${product.title.length < 14 
                            ?  product.title
                            : product.title.slice(0, 25,) + '...'}</h1>
                        <p class="font-normal text-sm">Price: <span>${product.price} <span class="font-thin ">$</span></span></p>
                    </div>
                    <div class="flex justify-between">
                        <button class="addToCartBtn" onclick="addToCart(${product.id})">Add to Cart</button>
                        <button class="buyBtn">Buy Now</button>
                    </div>
                </div>
            </div>`;
        
        productsList.appendChild(card);
    });
}
function displayProductsOnHome(products) {
    const featureList = document.getElementById('feature-list');
    featureList.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('card');
        
        card.innerHTML = `
            <div class="p-3 hover:scale-[1.01] duration-500 hover:shadow-lg mx-auto rounded-md border-gray-300 border bg-[#e2e3e4] w-[300px] shadow-md ">
                <div class="overflow-hidden ">
                <img class="rounded-t-sm  w-full duration-500 object-cover  hover:scale-105 h-[250px]" src="${product.image}" alt="${product.title}">
                </div>
                <div class="flex flex-col gap-3 justify-between mt-2">
                    <div>
                        <h1 class="text-md font-semibold">${product.title.length < 14 
                            ?  product.title
                            : product.title.slice(0, 25,) + '...'}</h1>
                        <p class="font-normal text-sm">Price: <span>${product.price} <span class="font-thin ">$</span></span></p>
                    </div>
                    <div class="flex justify-between">
                        <button class="addToCartBtn" onclick="addToCart(${product.id})">Add to Cart</button>
                        <button class="buyBtn">Buy Now</button>
                    </div>
                </div>
            </div>`;
        
            featureList.appendChild(card);
    });
}

// Function to add items to the cart
function addToCart(productId) {
    const product = p.find(item => item.id === productId);
    if (product) {
        cart.push(product);
        alert(`${product.title} added to cart!`);
    }
}
