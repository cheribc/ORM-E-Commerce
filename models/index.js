// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Use source model and target model to define association type between models

// Product belongs to Category 1:1
Product.belongsTo(Category);

// Category has many Products 1:many
Category.hasMany(Product);

// Products belongToMany Tags (through ProductTag) many:many
Product.belongsToMany(Tag, {
  through: 'ProductTag',
  as: 'tag_id',
  foreignKey: 'product_id'
});

// Tags belongToMany Products (through ProductTag) many:many
Tag.belongsToMany(Product, {
  through: 'ProductTag',
  as: 'tag_id',
  foreignKey: 'tag_id'
});


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};