const Service = require("../models/service.model");

module.exports.addService = async (req, res) => {
  try {
    let newService = Service({
      title: req.body.title,
      description: req.body.desc,
    });
    let result = await newService.save();
    return res.status(200).json({
      msg: "Service Added",
    });
  } catch (error) {
    res.json(error);
  }
};

module.exports.getAllServices = async (req, res) => {
  try {
    let result = await Service.find();
    return res.status(200).json({
      services: result,
    });
  } catch (error) {
    return res.json(error)
  }
};

module.exports.updateService = async (req, res) => {
  try {
    let id = req.params.id;
    let updatingData = req.body;
    let result = await Service.findByIdAndUpdate(id, updatingData, {new: true});
    return res.status(200).json(result);
  } catch (ex) {
    return res.json(ex);
  }
};

module.exports.deleteService = async (req, res) => {
  try {
    let id = req.params.id;

    let result = await Service.findByIdAndRemove(id);
    return res.status(200).json(result);
  } catch (ex) {
    return res.json(ex);
  }
};
