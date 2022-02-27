// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Use source model and target model to define association type between models

// Product belongs to Category 1:1
Product.belongsTo(Category, {
  foreignKey: 'category',
});

// Category has many Products 1:many
Category.hasMany(Product, { 
  foreignKey: 'product_id',
});
Product.belongsTo(Category);

// Products belongToMany Tags (through ProductTag) many:many
Product.belongsToMany(Tag, {
  through: 'ProductTag',
});

// Tags belongToMany Products (through ProductTag) many:many
Tag.belongsToMany(Product, {
  through: 'ProductTag',
});


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};