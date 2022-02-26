const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // Find all tags
  // Include its associated Product data
});

router.get('/:id', (req, res) => {
  // Find a single tag by its `id`
  //  Include its associated Product data
});

router.post('/', (req, res) => {
  // Create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
