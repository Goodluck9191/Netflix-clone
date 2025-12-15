// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPUKcjbwYvQXuvO3OlK6NKe4Ymb5eIW-8",
  authDomain: "netflix-clone-30ecb.firebaseapp.com",
  projectId: "netflix-clone-30ecb",
  storageBucket: "netflix-clone-30ecb.firebasestorage.app",
  messagingSenderId: "220190343880",
  appId: "1:220190343880:web:4ee330c19063e8063e1bfd"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
      

    } catch (error) {
        console.log("Signup error: ", error);
        alert(error.message);
    }

}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        
    } catch (error) {
        console.log("Login error: ", error);
        alert(error.message);
    }
}

const logout = () => {
    signOut(auth);
}
export { auth, db, signup, login, logout };