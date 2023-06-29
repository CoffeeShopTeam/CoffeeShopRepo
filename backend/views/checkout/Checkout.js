
$(function () {
    $('#currency-conversion-form').on('submit', async function(e) {
        e.preventDefault();
        const targetCurrency = $('#currency').val();
        const allProducts = $('.d-flex.justify-content-between.align-items-center.mb-2.product');
        allProducts.each(async function(i, product) {
            const amount = $(product).find('h5').attr('data-amount');
            const baseCurrency = $(product).find('span').attr('currency-select');
            // fetch 
            const res = await axios.get(`/checkout/exchange/`, {
                params: {
                    baseCurrency, targetCurrency, amount
                }
            })
            const data = res.data;
            console.log(`the data is  ${data}`, data);
            $(product).find('span').attr('currency-select', data.current);
            $(product).find('h5').attr('data-amount',  data.convertedAmount);
            $(product).find('.currency-symbol').text(function() {
                return `${data.convertedAmount} ${data.currencySymbol}`;
              });
        });
    })
});
