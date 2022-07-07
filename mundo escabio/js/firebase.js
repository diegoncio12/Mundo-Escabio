
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
  import { getFirestore,
     collection, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  const firebaseConfig = {
    apiKey: "AIzaSyAtKuiiAbPzfI5BHKCS5dJ4a4o7zYlh2k0",
    authDomain: "coffe-dream.firebaseapp.com",
    projectId: "coffe-dream",
    storageBucket: "coffe-dream.appspot.com",
    messagingSenderId: "217375404062",
    appId: "1:217375404062:web:e432249e8a1e9de3d1be0f"
  };

  const app = initializeApp(firebaseConfig);

  const database = getFirestore(app);


  export const getProducts = async () => {

    const querySnapshot = await getDocs(collection(database, "productos"));

    const productos = []

    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
       productos.push(doc);
    });

    return productos;

}


 export const getProduct = async (id) => {

  const docRef = doc(database, "productos", id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return docSnap;
  } else {
  
    console.log("No such document!");
  }
  
}



