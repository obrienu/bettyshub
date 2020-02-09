const Rich = require("../model/rich.model");

exports.getPreview = async (req, res) => {
  try {
    const preview = await Rich.aggregate([
      { $sort: { createdAt: -1 } },
      { $limit: 3 }
    ]);
    return res.json(preview);
  } catch (err) {
    res.status(400).json({ msg: "Cannot get rich preview" });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const rich = await Rich.aggregate([
      { $sort: { createdAt: -1 } },
      { $project: { name: 1, price: 1, imageUrl: 1 } }
    ]);
    return res.json(rich);
  } catch (err) {
    res.status(400).json({ msg: "Cannot get rich products" });
  }
};

exports.getSingleProduct = async (req, res) => {
  try {
    const rich = await Rich.findById(req.params.id);
    return res.json(rich);
  } catch (err) {
    res.status(400).json({ msg: "Cannot get rich products" });
  }
};

exports.postProduct = async (req, res) => {
  try {
    const url = req.protocol + "://" + req.get("host");
    const name = req.sanitize(req.body.name);
    const price = req.sanitize(req.body.price);
    const text = req.body.text;
    const imageUrl = url + "/images/rich/" + req.file.filename;
    const newProduct = new Rich({
      name,
      text,
      price,
      imageUrl
    });
    const product = await newProduct.save();
    return res.json(product);
  } catch (err) {
    res.status(400).json({ msg: "Cannot post product at this moment" });
  }
};
