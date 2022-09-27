import * as functions from "firebase-functions";
import FirebaseAdmin from "./FirebaseAdmin";

export default functions.https.onCall(async (data, context) => {
    if (!context.auth) return;
    if (typeof data !== "object") return;

    // eslint-disable-next-line
    const delta: any = {};

    if (data.name && typeof data.name === "string") {
        const name = data.name.replace(/\s+$/, "");
        if (name.length > 3 && name.length < 20) {
            delta.name = data.name;
        }
    }

    const firestore = FirebaseAdmin.firestore();
    const profileDoc = firestore.collection("profiles").doc(context.auth.uid);
    await profileDoc.update(delta, {merge: true});
});
