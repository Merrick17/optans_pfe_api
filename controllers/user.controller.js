const User = require("../models/user.model");

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    return res.json(err);
  }
};
module.exports.getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);
    return res.status(200).json(user);
  } catch (err) {
    return res.json(err);
  }
};
module.exports.getAllAdmins = async (req, res) => {
  try {
    const result = await User.find({ isAdmin: true });
    return res.status(200).json(result);
  } catch (ex) {
    console.log(ex);
  }
};
module.exports.updateUser = async (req, res) => {
  const id = req.params.id;
  console.log("My user", id);
  try {
    const dataToUpdate = req.body;
    const { ...updateData } = dataToUpdate;
    const updateUser = await User.findByIdAndUpdate(id, updateData);
    return res.status(200).json(updateUser);
  } catch (err) {
    return res.json(err);
  }
};

module.exports.deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const deleteUser = await User.findByIdAndDelete(id);
    return res.status(200).json(deleteUser);
  } catch (err) {
    return res.json(err);
  }
};
module.exports.register = async (req, res) => {
  try {
    const existEmail = await User.findOne({ email: req.body.email });
    if (existEmail) {
      res.json({ err: "Email already exist" });
    } else {
      const salt = await bcrypt.genSalt(16);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      //Creating new user
      const user = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        isAdmin: req.body.isAdmin,
        password: hashedPassword,
      });

      let result = await user.save();

      return res.status(200).json({ user: result });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
};

module.exports.loginUser = async (req, res) => {
  //Validating the data
  //Checking if email is valid
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.send({ err: "Wrong Email or Password" });
  //Validate password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.send({ err: "Wrong Email or Password" });
  //Generating Token
  const token = jwt.sign(
    { _id: user._id, role: user.isAdmin },
    process.env.TOKEN_KEY_PASS,
    { expiresIn: "2 days" }
  );
  return res.header("access_token", token).json({ message: "login valid", token: token, user: user._id });
};
