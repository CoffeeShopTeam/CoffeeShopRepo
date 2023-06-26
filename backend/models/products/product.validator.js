function validateQuantity(productQuantity) {
  const quantity = productQuantity;
  return !quantity.isInteger() || quantity < 1;
}

module.exports = validateQuantity;
