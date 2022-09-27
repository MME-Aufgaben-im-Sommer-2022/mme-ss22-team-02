import * as functions from "firebase-functions";
import FirebaseAdmin from "./FirebaseAdmin";

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

    if (requestData.bringer !== context.auth.uid ) {
        return {
            error: "Nicht dein request",
        };
    }

    await requestDoc.update({
        state: "OPEN",
        bringer: null,
    });
    return {
        success: true,
    };
});


