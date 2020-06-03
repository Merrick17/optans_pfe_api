const User = require("../models/user.model");

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    return res.json(err);
  }
};
module.exports.getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);
    return res.json(user);
  } catch (err) {
    return res.json(err);
  }
};
module.exports.getAllAdmins = async (req, res) => {
  try {
    const result = await User.find({ isAdmin: true });
    res.json(result);
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
    return res.json(updateUser);
  } catch (err) {
    return res.json(err);
  }
};

module.exports.deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const deleteUser = await User.findByIdAndDelete(id);
    return res.json(deleteUser);
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
        fullname: req.body.fullname,
        email: req.body.email,
        phoneNumber: req.body.phonenumber,
        address: req.body.address,
        isAdmin: req.body.isAdmin,
        password: hashedPassword,
      });

      let result = await user.save();

      res.json({ user: result });
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
  res
    .header("access_token", token)
    .json({ message: "login valid", token: token, user: user._id });
};
