import {
    auth,
    storage,
    db,
    signOut,
    getDoc,
    doc,
    onAuthStateChanged,
   
} from "./utils/utils.js";
const logout_btn = document.getElementById("logout_btn");
const login_link = document.getElementById("login_link");
const signIn_link = document.getElementById("signIn_link");
const dashboard_link = document.getElementById("dashboard_link");
const search = document.getElementById("search");

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        login_link.style.display = "none";
        signIn_link.style.display = "none";
        logout_btn.style.display = "inline-block";
        dashboard_link.style.display = "inline-block";

    } else {
        login_link.style.display = "inline-block";
        logout_btn.style.display = "none";
        signIn_link.style.display = "inline-block";
        dashboard_link.style.display = "none";

      
    }

    logout_btn.addEventListener("click", () => {
        signOut(auth);
    });
    });

    