$(function () {
    const editButton = $(".btn.edit");
    $(".btn.delete").each(function (i, btn) {
        $(btn).on('click', async function (event) {
            const productId = event.target.value;
            console.log(productId);
            $.ajax({
                url: `/product/${productId}`,
                method: "DELETE",
                success: function (response) {
                    window.location.href = "/account/products/"
                },
                error: function (error) {
                    console.error("Error fetching products:", error);
                },
            });

        });
    })

    editButton.on('click', function (event) {
        const productId = event.target.value;

    })
});