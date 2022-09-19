import * as admin from "firebase-admin";

export default admin.initializeApp();
export const arrayUnion = admin.firestore.FieldValue.arrayUnion;
export const arrayRemove = admin.firestore.FieldValue.arrayRemove;
