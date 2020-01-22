const Fabric = require("../model/fabrics.schema");

exports.getFabric = async (req, res) => {
  const totalItems = await Fabric.find().countDocuments();
  const pipeline = [{ $sort: { createdAt: -1 } }];
  Fabric.aggregate(pipeline)
    .then(fabric =>
      res.json({
        fabric,
        totalItems
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
    imageUrl: req.files.map(file => url + "/images/fabric/" + file.filename)
  });

  fabric
    .save()
    .then(fabrics => res.json(fabrics))
    .catch(err => res.status(400).json({ msg: err }));
};

exports.getCategoryList = (req, res) => {
  let pipeline = [
    {
      $group: {
        _id: 1,
        mycategory: {
          $addToSet: "$category"
        }
      }
    },
    {
      $project: {
        mycategory: 1,
        _id: 0
      }
    }
  ];

  Fabric.aggregate(pipeline)
    .then(category => res.json(category[0].mycategory))
    .catch(err => res.status(400).json({ msg: err }));
};

exports.getCategory = async (req, res) => {
  const category = req.params.category || "all";
  const offset = req.params.offset || 0;
  let pipeline = [];

  if (category === "all") {
    pipeline = [{ $skip: 12 * offset }, { $limit: 12 }];
  } else {
    pipeline = [
      {
        $match: {
          category: category
        }
      },
      { $skip: 12 * offset },
      { $limit: 12 }
    ];
  }

  let totalItems = await Fabric.aggregate([
    ...pipeline,
    { $count: "count" },
    { $project: { count: 1 } }
  ]);

  Fabric.aggregate(pipeline)
    .then(fabric =>
      res.json({ fabric: [...fabric], totalItems: totalItems[0].count })
    )
    .catch(err => res.status(400).json({ msg: "Could not fetch items" }));
};
