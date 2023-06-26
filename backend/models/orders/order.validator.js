
function validateCreditCard(cardNumber) {
  const cleanedCardNumber = cardNumber.replace(/\D/g, '');  
  if (!cleanedCardNumber || !/^\d+$/.test(cleanedCardNumber)) {
      return false;
  }
  const digitCount = cleanedCardNumber.length;
  return digitCount === 16;
}
  
function validateDate(orderDate) {
    const currentDate = new Date();
  
    return orderDate <= currentDate;
  }
  function validateCoupon(coupon) {
    const validCoupons = ['Effi', 'roee', 'gil', 'itay', 'bar', 'kfir'];
    return validCoupons.includes(coupon);
  }
  
  module.exports = {
    validateCreditCard,
    validateDate,
    validateCoupon
  };
  