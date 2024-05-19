const { fireUser } = require("../utils/Firebase");
const logIn = async (email, password) => {
  try {
    const userCredential = await fireUser.signInWithEmailAndPassword(
      email,
      password
    );
    const user = userCredential?.user;
    console.log("User signed in:", user.uid);
  } catch (error) {
    console.error("Error signing in:", error);
    throw new Error("No such user!");
  }
};

module.exports = {
    logIn
};
