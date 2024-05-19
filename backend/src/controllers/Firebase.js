const { logIn: firebaseLogin } = require('../services/Firebase');

const logIn = async (req, res) => {
    try {
      const {email, password}  = req.body 
      console.log(email,password)
      const config = await firebaseLogin(email, password);
      res.json(config);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
module.exports = {
    logIn
}