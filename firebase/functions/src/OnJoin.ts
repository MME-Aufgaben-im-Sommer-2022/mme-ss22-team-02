
import * as functions from "firebase-functions";
import FirebaseAdmin from "./FirebaseAdmin";


export default functions.auth.user().onCreate(async (user) => {
    await FirebaseAdmin.firestore().collection("profiles").doc(user.uid).set({
        name: user.displayName || user.email,
        profilePicture: "https://avatars.dicebear.com/api/bottts/"+encodeURIComponent(user.displayName || user.email || "error")+".svg",
    });
});


