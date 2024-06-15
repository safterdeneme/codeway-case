const admin = require('firebase-admin');
const { verifyFirebaseVerifyIdToken } = require('../utils/Firebase')
const validateFirebaseIdToken = async (req, res, next) => {
  const idToken = req.headers['authorization']?.split('Bearer ')[1];

  if (!idToken) {
    return res.status(401).json({ error: 'Please Sign In' });
  }

  try {
    const decodedToken = await verifyFirebaseVerifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Please Sign In' });
  }
};

module.exports = validateFirebaseIdToken;
