function validateQuantity(productQuantity) {
  const quantity = productQuantity;
  return Number.isInteger(quantity) && quantity >= 0;
}

module.exports = validateQuantity;
