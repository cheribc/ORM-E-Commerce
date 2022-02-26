const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // Find all categories
  // Include its associated Products
});

router.get('/:id', (req, res) => {
  // Find one category by its `id` value
  // Include its associated Products
});

router.post('/', (req, res) => {
  // Create new category
});

router.put('/:id', (req, res) => {
  // Update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // Delete a category by its `id` value
});

module.exports = router;