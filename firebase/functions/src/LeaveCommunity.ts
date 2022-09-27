import * as functions from "firebase-functions";
import FirebaseAdmin, {arrayRemove} from "./FirebaseAdmin";

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

    if (!communityData.members.includes(context.auth.uid)) {
        return {
            error: "Du bist nicht in dieser Community",
        };
    }


    if (communityData.members.length > 1) {
        await communityDoc.set({
            members: arrayRemove(context.auth.uid),
        }, {
            merge: true,
        });

        await firestore
            .collection(`communities/${data}/members`)
            .doc(context.auth.uid)
            .delete();
    } else {
        await firestore.recursiveDelete(communityDoc);
    }

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
