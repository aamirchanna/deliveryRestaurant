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
    updateDoc,
    arrayUnion,
    arrayRemove,
} from "../utils/utils.js";

const logout_btn = document.getElementById("logout_btn");
const login_link = document.getElementById("login_link");
const signIn_link = document.getElementById("signIn_link");
const menu_link = document.getElementById("menu-link");
const all_items_container = document.getElementById("all_items_container");

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
        console.log("quer", querySnapshot)
        all_items_container.innerHTML = "";
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            const event = doc.data();
            console.log("event=>", event);

            const { banner, title, desc, price } = event;

            const card = `
                <div class=" bg-white shadow-md rounded-lg overflow-hidden">
                    <img src="${banner}" alt="Event Image" class="w-full h-48 object-cover" />
                    <div class="p-4">
                        <h2 class="text-xl font-bold mb-2">${title}</h2>
                        <h2 class="text-sm mb-2">${desc}</h2>
                         <div class="flex items-center justify-between">
                  <span class="text-lg font-medium">$ ${price}</span>
                <a href="#">  <button class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 rounded-md">
                    Add to Cart
                  </button></a>
                </div>
                    </div>
                </div>`;

            all_items_container.innerHTML += card;
        });
    } catch (err) {
        console.log("Error fetching documents: ", err);
        all_items_container.innerHTML = "<p>Failed to load items. Please try again later.</p>";
    }
}