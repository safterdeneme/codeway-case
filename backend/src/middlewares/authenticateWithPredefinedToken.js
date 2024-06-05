require('dotenv').config();

const authenticateWithPredefinedToken = (req, res, next) => {
  const apiToken = req.headers['api-token'];
  console.log(process.env.API_TOKEN,"process.env.API_TOKENmiddleware")
  if (apiToken === process.env.API_TOKEN) {
    next();
  } else {
    res.status(403).json({ error: 'Forbidden' });
  }
};

module.exports = authenticateWithPredefinedToken;
