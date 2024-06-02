const admin = require('firebase-admin');

const serviceAccount = require("../credentials/google-auth-credentials.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


  const fireUser = admin.auth();

  const db = admin.firestore();

module.exports = {
  db,
  fireUser
};
