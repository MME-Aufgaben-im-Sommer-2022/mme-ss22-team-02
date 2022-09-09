import * as functions from "firebase-functions";

export default functions.https.onCall((data, context) => {
  if (!context.auth) return;
  functions.logger.info("Hallo");
});
