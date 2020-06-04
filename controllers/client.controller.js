const Client = require("../models/client.model");

module.exports.addClient = async (req, res) => {
    try {
      let newClient = new Client({
        title: req.body.title,
        description: req.body.desc,
        requirement: req.body.rec,
        minSalary: req.body.salary,
      });
      let res = await newClient.save();
      return res.status(200).json({
        msg: "Offre Added",
      });
    } catch (ex) {
      return res.json({ err: ex });
    }
  };
  
  module.exports.getAllClients = async (req, res) => {
    try {
      let result = await Client.find();
      return res.status(200).json({ clients: result });
    } catch (ex) {
      res.json({ err: ex });
    }
  };
  
  module.exports.deleteClient = async (req, res) => {
    try {
      await Client.findByIdAndRemove(req.params.id);
      return res.status(200).json({ msg: "Client Deleted" });
    } catch (ex) {
      res.json({ err: ex });
    }
  };
  
  module.exports.updateClient = async (req, res) => {
    const id = req.params.id;
    console.log("My Client", id);
    try {
      const dataToUpdate = req.body;
      const { ...updateData } = dataToUpdate;
      const updateUser = await Client.findByIdAndUpdate(id, updateData, {new: true});
      return res.status(200).json(updateUser);
    } catch (ex) {
      res.json({ err: ex });
    }
  };