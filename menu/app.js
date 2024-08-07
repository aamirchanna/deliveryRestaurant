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

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        login_link.style.display = "none";
        signIn_link.style.display = "none";
        menu_link.style.display = "none";
        logout_btn.style.display = "inline-block";

    } else {
        login_link.style.display = "inline-block";
        // user_img.style.display = "none";
        logout_btn.style.display = "none";
        menu_link.style.display = "inline-block";

    }

    logout_btn.addEventListener("click", () => {
        signOut(auth);
    });
    });

  