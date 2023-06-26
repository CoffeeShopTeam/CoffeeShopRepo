function validateQuantity(productQuantity) {
  const quantity = productQuantity;
  return Number.isInteger(quantity) && quantity > 1;
}

module.exports = validateQuantity;
