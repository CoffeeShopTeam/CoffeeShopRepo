function validateQuantity(productQuantity) {
  const quantity = productQuantity;
  if (!quantity.isInteger() || quantity < 1) {
    return false;
  }
  return true;
}

module.exports = validateQuantity;
