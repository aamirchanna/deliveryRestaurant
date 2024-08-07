import {
    ref,
    storage,
    uploadBytes,
    getDownloadURL,
    db,
    collection,
    addDoc,
    auth,
    doc,
  } from "../utils/utils.js";
  
  console.log(auth)
  const item_form = document.getElementById("item_form");
  const submit_btn = document.getElementById("submit_btn");

  item_form.addEventListener("submit", function (e) {
  e.preventDefault()
  console.log(e);

  const currentUser = auth.currentUser;

  if (!currentUser) {
    console.error("No user is currently signed in");
    return;
  }

  
  const itemInfo = {
    banner: e.target[0].files[0],
    title: e.target[1].value,
    desc: e.target[2].value,
    price: e.target[3].value,
    createdBy: currentUser.uid,  // Corrected property access
    createdByEmail: auth.currentUser.email,
    likes: [],
  };

  submit_btn.disabled = true
  submit_btn.innerHTML = "Loading..."

    const imgRef= ref(storage , itemInfo.banner.name)
    uploadBytes(imgRef , itemInfo.banner).then(()=>{
    getDownloadURL(imgRef , itemInfo).then((url)=>{
      itemInfo.banner = url
      console.log("url agyaw")
  
      
    
          // add document to item collection
const itemCollection = collection(db , "fooditems")
addDoc(itemCollection , itemInfo).then(()=>{
submit_btn.disabled = false;
submit_btn.innerHTML = "add"
console.log("item added")
window.location.href = "../menu/index.html"
}).catch((err)=>{
    console.log("collection mistake" , err)
})  

    
    
    }).catch((err)=>{
      console.log("url nh derah " , err)
  })


})

})
