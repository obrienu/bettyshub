const Fabric = require("../model/fabrics.schema");
const upload = require("../middleware/multer");
const multer = require("multer");

exports.getFabric = async (req, res) => {
  const offset = req.body.offset || 0;
  const totalFabrics = await Fabric.find().countDocuments();
  const pipeline = [{ $skip: 12 * offset }, { $limit: 12 }];

  Fabric.aggregate(pipeline)
    .then(fabrics =>
      res.json({
        fabrics,
        totalFabrics
      })
    )
    .catch(err => res.json({ msg: "Error getting Fabrics" }));
};

exports.getOneFabric = (req, res) => {
  Fabric.findById(req.id)
    .then(fabric => res.json(fabric))
    .catch(err => res.status(400).json({ msg: "Error Fetching Fabric" }));
};

exports.postFabric = (req, res, next) => {
  const { name, description, price, category } = req.body;
  const url = req.protocol + "://" + req.get("host");
  const fabric = new Fabric({
    name,
    description,
    price,
    category,
    imageUrl: req.files.map(file => url + "/images/" + file.filename)
  });

  fabric
    .save()
    .then(fabrics => res.json(fabrics))
    .catch(err => res.status(400).json({ msg: err }));
};
