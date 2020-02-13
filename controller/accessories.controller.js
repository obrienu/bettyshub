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
  const { name, description, price, category, imageUrl, shop } = req.body;
  //const url = req.protocol + "://" + req.get("host");
  const accessories = new Accessories({
    name,
    description,
    price,
    category,
    imageUrl,
    shop
  });

  accessories
    .save()
    .then(accessories => res.json(accessories))
    .catch(err => res.status(400).json("Failed to Post Commodity"));
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

//GET LIST OF CATEGORIES

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

// GET SEARCH LIST

exports.getSearchList = async (req, res) => {
  try {
    let { category, name, limit, page } = req.query;
    limit = parseInt(limit);
    skip = (parseInt(page) - 1) * parseInt(limit);
    let match;
    let searchName = new RegExp(name, "i");
    if (category && name) {
      match = {
        $match: {
          category,
          name: searchName
        }
      };
    } else if (name && !category) {
      match = {
        $match: {
          name: searchName
        }
      };
    } else if (!name && category) {
      match = {
        $match: {
          category
        }
      };
    } else {
      match = {
        $match: {}
      };
    }
    const countItems = await Accessories.aggregate([
      match,
      { $count: "count" },
      { $project: { count: 1 } }
    ]);
    const items = await Accessories.aggregate([
      match,
      { $skip: skip },
      { $limit: limit },
      { $sort: { createdAt: -1 } }
    ]);
    return res.json({
      items: items,
      totalItems: !countItems[0] ? 0 : countItems[0].count
    });
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

//INACTIVE ROUTES

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
