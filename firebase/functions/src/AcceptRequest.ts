// welche Daten
// was verändern
// Tipp: User (aus context) angemeldet, requestId, communityId
// CreateCommunity

import * as functions from "firebase-functions";
import FirebaseAdmin from "./FirebaseAdmin";


// onCall request zum Server (alles ausser Imports)
// arrays sind objects
export default functions.https.onCall(async (data, context) => {
    if (!context.auth) return;
    if (typeof data !== "object") return;

    const requestId = data.requestId;
    const communityId = data.communityId;

    if (typeof requestId !== "string") return;
    if (typeof communityId !== "string") return;
    if (communityId.indexOf("/") !== -1) return;

    const firestore = FirebaseAdmin.firestore();

    const requestDoc = firestore
        .collection(`communities/${communityId}/requests`)
        .doc(requestId);

    const requestSnapshot = await requestDoc.get();
    const requestData = requestSnapshot.data();
    if (!requestData) return;

    if (requestData.state !== "OPEN" ) {
        return {
            error: "Anfrage ist nicht offen",
        };
    }

    await requestDoc.update({
        state: "IN_PROGRESS",
        bringer: context.auth.uid,
    });
    return {
        success: true,
    };
});


