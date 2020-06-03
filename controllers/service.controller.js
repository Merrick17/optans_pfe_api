const Service = require("../models/service.model");

module.exports.addService = async (req, res) => {
  try {
    let newService = Service({
      title: req.body.title,
      description: req.body.desc,
    });
    let result = await newService.save();
    res.json({
      msg: "Service Added",
    });
  } catch (error) {
    res.json(error);
  }
};

module.exports.getAllServices = async (req, res) => {
  try {
    let result = await Service.find();
    res.json({
      services: result,
    });
  } catch (error) {}
};

module.exports.updateService = async (req, res) => {
  try {
    let id = req.params.id;
    let updatingData = req.body;
    let result = Service.findByIdAndUpdate(id, updatingData);
    res.json(result);
  } catch (ex) {
    res.json(ex);
  }
};

module.exports.deleteService = async (req, res) => {
  try {
    let id = req.params.id;

    let result = Service.findByIdAndRemove(id);
    res.json(result);
  } catch (ex) {
    res.json(ex);
  }
};
