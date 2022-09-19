import * as functions from "firebase-functions";
import FirebaseAdmin from "./FirebaseAdmin";


export default functions.https.onCall(async (data, context) => {
    if (!context.auth) return;
    if (typeof data !== "object") return;

    const {
        communityId,
        tags,
    } = data;

    let products = data.products;

    if (typeof communityId !== "string") return;
    if (typeof tags !== "object") return;
    if (typeof products["filter"] !== "function") return;

    products = products
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .filter((product: any) => typeof product === "string") as string[];

    if (products.length === 0) return;

    const firestore = FirebaseAdmin.firestore();
    const communitySnap = await firestore
        .collection("communities")
        .doc(communityId)
        .get();
    const communityData = communitySnap.data();

    if (!communityData) return;

    const communityTags: {
        [key: string]: string
    } = communityData.tags;

    for (const [key, value] of Object.entries(tags)) {
        if (typeof value !== communityTags[key]) {
            return {
                error: "Invalid type",
            };
        }
    }


    const doc = await firestore
        .collection(`communities/${communityId}/requests`)
        .add({
            bringer: null,
            owner: context.auth.uid,
            products,
            state: "OPEN",
            tags,
        });

    return {
        documentId: doc.id,
    };
});
