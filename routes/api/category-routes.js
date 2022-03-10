const router = require('express').Router();
const { where } = require('../../../../Homework18/social-network-api/models/Thought');
const { Category, Product } = require('../../models');
const { sequelize } = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // Find all categories
  // Include its associated Products
  Category.findAll({
    attributes: [
      'id',
      'category_name'
    ],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
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

router.get('/:id', (req, res) => {
  // Find one category by its `id` value
  // Include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'category_name'
    ],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'category_id']
      }
    ]
  })
  .then(dbData => {
    if (!dbData) {
      res.status(404).json({ message: 'No category found with this id!'});
      return;
    }
    res.json(dbData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});
  

router.post('/', (req, res) => {
  // Create new category
  Category.create(
    req.body
  )
  .then(dbData => res.json(dbData))
  .catch(er => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.put('/:id', (req, res) => {
  // Update a category by its `id` value
  Category.update(
    req.body,
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(dbData => {
    if (!dbData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.json(dbData);
    })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  }); 
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy( {
    where: {
      id: req.params.id
    }
  })
  .then(dbData => {
    if (!dbData) {
      res.status(404).json({ message: 'No category found with this id!' });
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