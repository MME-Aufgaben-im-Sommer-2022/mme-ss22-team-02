import * as functions from "firebase-functions";
import FirebaseAdmin from "./FirebaseAdmin";
import {arrayRemove} from "firebase/firestore";

export default functions.https.onCall(async (data, context) => {
    if (!context.auth) return;
    if (typeof data !== "string") return;
    if (data.indexOf("/") !== -1) return;

    const firestore = FirebaseAdmin.firestore();
    const communityDoc = firestore.collection("communities").doc(data);
    const communitySnap = await communityDoc.get();
    const communityData = communitySnap.data();

    if (!communityData) {
        return {
            error: "Community existiert nicht",
        };
    }

    if (!communityData.members.contains(context.auth.uid)) {
        return {
            error: "Du bist nicht in dieser Community",
        };
    }

    await communityDoc.set({
        members: arrayRemove(context.auth.uid),
    }, {
        merge: true,
    });

    await firestore
        .collection(`communities/${data}/members`)
        .doc(context.auth.uid)
        .delete();

    await firestore
        .collection("users")
        .doc(context.auth.uid)
        .set({
            communities: arrayRemove(data),
        }, {
            merge: true,
        });

    return communityData;
});
