
const router = require("express").Router();
const { User } = require("../Model/user");
const jwt = require("jsonwebtoken");
const {validateRequest,userSchema} = require("./validateData");





router.post("/register", validateRequest(userSchema), async (req, res) => {
    try {
      const { fullname, email, password } = req.body;
  
      const existingUsername = await User.findOne({ fullname });
      if (existingUsername) {
        return res.status(400).json({ error: "Username is already taken" });
      }
  
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ error: "Email is already registered" });
      }
  
      const newUser = new User({ fullname, email });
  
      newUser.setPassword(password);
  
      const savedUser = await newUser.save();
  
      res.status(201).json({
        message: "User registered successfully",
        data: savedUser,
        clearInput: true,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
  
      if (!user || !user.validatePassword(password)) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      res.cookie("token", token, {});
  
      res
        .status(200)
        .json({ token: token, message: "Login successful", Name: user.fullname });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      console.log(error);
    }
  });
  
  router.post("/logout", async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  });

  module.exports = router ;