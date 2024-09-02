import {
    auth,
    storage,
    db,
    signOut,
    getDoc,
    doc,
    onAuthStateChanged,
    getDocs,
    collection,
} from "../utils/utils.js";

const logout_btn = document.getElementById("logout_btn");
const login_link = document.getElementById("login_link");
const signIn_link = document.getElementById("signIn_link");
const menu_link = document.getElementById("menu-link");
const all_items_container = document.getElementById("all_items_container");
let totalPrice = 0; // Variable to keep track of the total price

// Event listener for logout button
if (logout_btn) {
    logout_btn.addEventListener("click", () => {
        signOut(auth).then(() => {
            console.log("User signed out.");
        }).catch((error) => {
            console.error("Error signing out: ", error);
        });
    });
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        login_link.style.display = "none";
        signIn_link.style.display = "none";
        menu_link.style.display = "none";
        if (logout_btn) logout_btn.style.display = "inline-block";
    } else {
        login_link.style.display = "inline-block";
        signIn_link.style.display = "inline-block";
        if (logout_btn) logout_btn.style.display = "none";
        menu_link.style.display = "inline-block";
    }
});

// Fetch all items and display them
getallitems();

async function getallitems() {
    try {
        const querySnapshot = await getDocs(collection(db, "fooditems"));
        all_items_container.innerHTML = "";
        querySnapshot.forEach((doc) => {
            const item = doc.data();

            const card = `
                <div class="bg-white shadow-md rounded-lg overflow-hidden">
                    <img src="${item.banner}" alt="Event Image" class="uniform-image" />
                    <div class="p-4">
                        <h2 class="text-xl font-bold mb-2">${item.title}</h2>
                        <p class="text-sm mb-2">${item.desc}</p>
                        <div class="flex items-center justify-between">
                            <span class="text-lg font-medium">$${item.price}</span>
                            <button data-id="${doc.id}" class="add-to-cart-btn inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 rounded-md">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>`;

            all_items_container.innerHTML += card;
        });

        // Add event listeners for "Add to Cart" buttons after the items are rendered
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const itemId = event.target.dataset.id;
                addToCart(itemId);
            });
        });

    } catch (err) {
        console.log("Error fetching documents: ", err);
        all_items_container.innerHTML = "<p>Failed to load items. Please try again later.</p>";
    }
}

function addToCart(itemId) {
    // Fetch item details using itemId
    getDoc(doc(db, "fooditems", itemId)).then((docSnap) => {
        if (docSnap.exists()) {
            const item = docSnap.data();

            const cartItemsContainer = document.getElementById('cart-items');
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('flex', 'justify-between', 'items-center', 'mb-4');
            cartItemDiv.innerHTML = `
                <span>${item.title}</span>
                <span>$${parseFloat(item.price).toFixed(2)}</span>
            `;

            cartItemsContainer.appendChild(cartItemDiv);

            // Update the total price
            totalPrice += parseFloat(item.price);
            updateTotalPrice();
        } else {
            console.log("No such document!");
        }
    }).catch((error) => {
        console.error("Error adding document to cart: ", error);
    });
}

function updateTotalPrice() {
    const totalPriceElement = document.getElementById('total-price');
    if (totalPriceElement) {
        totalPriceElement.innerText = `Total: $${totalPrice.toFixed(2)}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const cartLink = document.getElementById('cart-link');
    const cart = document.getElementById('cart');
    const closeCart = document.getElementById('close-cart');

    cartLink.addEventListener('click', () => {
        cart.classList.remove('translate-x-full');
        cart.classList.add('translate-x-0');
    });

    closeCart.addEventListener('click', () => {
        cart.classList.remove('translate-x-0');
        cart.classList.add('translate-x-full');
    });

    // Total price element should be outside the cart items container to prevent re-adding
    const totalPriceDiv = document.getElementById('total-price');
    if (!totalPriceDiv) {
        const cartContainer = document.getElementById('cart');
        const totalPriceDiv = document.createElement('div');
        totalPriceDiv.classList.add('flex', 'justify-between', 'items-center', 'border-t', 'pt-4', 'mt-4');
        totalPriceDiv.innerHTML = `<span id="total-price" class="font-bold">Total: $0.00</span>`;
        cartContainer.appendChild(totalPriceDiv);
    }
});
