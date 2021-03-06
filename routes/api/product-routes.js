const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// Get all products
router.get('/', (req, res) => {
  // Find all products
  // be sure to include its associated Category and Tag data
  Product.findAll({
    attributes: [
      'id',
      'product_name',
      'price',
      'stock',
      'category_id'
    ],
    include: [
      {
        model: Category,
        attributes: ['category_name']
      }, 
      {
        model: Tag,
        through: ProductTag,
        attributes: ['id', 'tag_name'],
        as: "tag_id"
      }
    ]
  })
  .then(postData => {
    res.json(postData)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Get one product
router.get('/:id', (req, res) => {
  // Find a single product by its `id`
  // be sure to include its associated Category and Tag data
  Product.findOne({
    where: {
      id: req.params.id
    }, 
    attributes: [
      'id',
      'product_name',
      'price',
      'stock',
      'category_id'
    ],
    include: [
      {
        model: Category,
        attributes: ['id', 'category_name']
      }, 
      {
        model: Tag,
        attributes: ['id', 'tag_name'],
        as: "tag_id"
      }
    ]
  })
  .then(dbData => {
    if (!dbData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }
    res.json(dbData);
    })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
 console.log("req.body", req.body);

  Product.create(req.body)
    .then((product) => {
      // If there are product tags, create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // Respond if there are no product tags
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// Update product
router.put('/:id', (req, res) => {
  // Update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // Find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // Get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // Create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // Identify product tags to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // Run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // Delete one product by its `id` value
  Product.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbData => {
    if (!dbData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }
    res.json(dbData);
    })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
