const Accessories = require("../model/accessories.schema");

//GET ALL ACCESSORIES
exports.getAccessories = async (req, res) => {
  const totalItems = await Accessories.find().countDocuments();
  const pipeline = [{ $sort: { createdAt: -1 } }];

  Accessories.aggregate(pipeline)
    .then(accessories =>
      res.json({
        accessories,
        totalItems
      })
    )
    .catch(err => res.json({ msg: "Error getting Accessories" }));
};

//GET SINGLE ACCESSORIES
exports.getOneAccessories = (req, res) => {
  Accessories.findById(req.params.id)
    .then(accessories => res.json(accessories))
    .catch(err => res.status(400).json({ msg: "Error Fetching Accessories" }));
};

//POST ACCESSORIES
exports.postAccessories = (req, res, next) => {
  const { name, description, price, category } = req.body;
  const url = req.protocol + "://" + req.get("host");
  const accessories = new Accessories({
    name,
    description,
    price,
    category,
    imageUrl: req.files.map(
      file => url + "/images/accessories/" + file.filename
    )
  });

  accessories
    .save()
    .then(accessories => res.json(accessories))
    .catch(err => res.status(400).json({ msg: err }));
};

// EDIT ACCESSORIES ROUTE
exports.editAccessoreis = async (req, res) => {
  try {
    const body = req.body;
    const accessories = await Accessories.findByIdAndUpdate(
      req.params.id,
      body
    );
    return res.json(accessories);
  } catch (err) {
    return res.status(400).json("Failed to edit commodity");
  }
};

//DELETE ACCESSORIES ROUTE
exports.deleteAccessories = async (req, res) => {
  try {
    const accessories = await Accessories.findByIdAndDelete(req.params.id);
    return res.json("Commodity has been deleted");
  } catch (err) {
    return res.status(400).json("Failed to delete commodity");
  }
};

//INACTIVE ROUTES
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

  Accessories.aggregate(pipeline)
    .then(categories => res.json(categories[0].mycategory))
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

  let totalItems = await Accessories.aggregate([
    ...pipeline,
    { $count: "count" },
    { $project: { count: 1 } }
  ]);

  Accessories.aggregate(pipeline)
    .then(accessories =>
      res.json({ ...accessories, totalItems: totalItems[0].count })
    )
    .catch(err => res.status(400).json({ msg: "Could not fetch items" }));
};
