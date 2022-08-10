const User = require("../modals/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


//register a new user
const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });

  //Check if the user already exists
  if (user) return res.status(400).send("Email already exists");

  //hashing passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //creating a new user
  const newUser = await User.create({ name, email, password: hashedPassword });

  //generate a jwr token
  const token = jwt.sign(
    { name: newUser.name, email: newUser.email, _id: newUser._id },
    process.env.JWT_SECRET,
    {
      expiresIn: "10d",
    }
  );
  

  res.status(201).json({ name,email, token });
};


//login a user

const signIn = async (req, res) => {
  const { email, password } = req.body;

  //finding the user in db
  const user = await User.findOne({ email });

  //Check if the user doesn't exists
  if (!user) return res.status(400).send("Email doesn't exist");

  //Check if the password is correct
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.status(400).send("Invalid Password");

  //generate a jwr token
  const token = jwt.sign(
    { name: user.name, email: user.email, _id: user._id },
    process.env.JWT_SECRET,
    {
      expiresIn: "10d",
    }
  );

  res.status(200).json({ name:user.name,email, token });
};

module.exports = {
  signUp,
  signIn,
};
