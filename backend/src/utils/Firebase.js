const admin = require('firebase-admin');

require('dotenv').config();
const getServiceAccountCredential = () => {

  const serviceAccount = {
    type: 'service_account',
    universe_domain: "googleapis.com",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY,    
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
  };
  return serviceAccount
}

const serviceAccountCredential =  getServiceAccountCredential()

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountCredential)
});

  const db = admin.firestore();
  db.settings({ ignoreUndefinedProperties: true })


  const verifyFirebaseVerifyIdToken = async (idToken)  => {
    return  await admin.auth().verifyIdToken(idToken);
  }
  const getFirebaseServerTimestamp = () => {
    return admin.firestore.FieldValue.serverTimestamp();
  }

module.exports = {
  db,
  verifyFirebaseVerifyIdToken,
  getFirebaseServerTimestamp
};
