import * as functions from "firebase-functions";
import FirebaseAdmin from "./FirebaseAdmin";
import {arrayUnion} from "firebase/firestore";

export default functions.https.onCall(async (data, context) => {
    if (!context.auth) return;

    // //////////////////////////////
    // INPUT VALIDATION
    // //////////////////////////////


    if (typeof data !== "object") return;

    let {
        name,
        color,
    } = data;

    if (typeof name !== "string") return;
    if (typeof color !== "string") return;

    // Remove all non-alphanumeric characters
    name = name.replace(/[^a-z0-9]/gi, "");

    if (name.length < 3) return;

    // Color is hex color
    if (!/^#([0-9a-f]{3}){1,2}$/i.test(color)) return;


    // //////////////////////////////
    // Function Logic
    // //////////////////////////////

    const firestore = FirebaseAdmin.firestore();

    const communityDoc = await firestore.collection("communities")
        .add({
            name,
            color,
            members: [context.auth.uid],
            tags: {
                "Markt": "string",
                "Bio": "string",
            },
        });


    await firestore.collection(`communities/${communityDoc.id}/members`)
        .doc(context.auth.uid).set({
            role: "owner",
        });

    await firestore.collection("users")
        .doc(context.auth.uid).set({
            communities: arrayUnion([communityDoc.id]),
        }, {
            merge: true,
        });

    return communityDoc.id;
});
