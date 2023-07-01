    function renderOrders(orders) {
        const ordersTable = $("#ordersTable");
        const orderTableBody = $("#orderTableBody");
        const emptyMessage = $("#emptyMessage");
    
        if (orders.length === 0) {
            emptyMessage.text("No orders have been made yet.");
            emptyMessage.append(" <a href='#'>Product</a>");
            ordersTable.hide();
        } else {
            $.each(orders, function (index, order) {
            const row = $("<tr></tr>");
            const orderNumberCell = $("<td></td>");
            const dateCell = $("<td></td>");
            const emailCell = $("<td></td>");
            const priceCell = $("<td></td>");
            const actionsCell = $("<td></td>");
    
            orderNumberCell.addClass(order._id.toString().slice(-5));
            orderNumberCell.text(order._id.toString().slice(-5));
            dateCell.text(new Date(order.orderDate).toLocaleString());
            emailCell.text(order.shippingDetails.email);
            priceCell.text(order.orderPrice);
            actionsCell.text(new Date(order.orderDate).toLocaleString());
    
            row.append(orderNumberCell);
            row.append(dateCell);
            row.append(emailCell);
            row.append(priceCell);
            row.append(actionsCell);
            orderTableBody.append(row);
            });
        }

        $('.view-order').each(function(i,btn){
            $(btn).on('click', function() {
                const orderId = $(this).attr('data-order-id');
                console.log(orderId);
                window.location.href = '/orders/' + orderId;
            })
        })                
    }



            
    $(function () {
    $(".btn.edit").each(function (i, btn) {
            $(btn).on("click", async function (event) 
            {
                const orderId = event.target.value;
                console.log(event.target);
        
                $("#save").on("click", function (event) {
                event.preventDefault();
                console.log(event.target);
                console.log(orderId);
    
                $("#save").off("click");
                const newEmail = $("#email-details").val();
                console.log(newEmail);
                    const data = {
                    orderId: orderId,
                    email: newEmail,
                };
        
                $.ajax({
                    url: `/account/orders/${orderId}`,
                    method: "PUT",
                    data: data,
                    success: function (response) {
                    window.location.href = "/account/orders/";
                    },
                    error: function (error) {
                    console.error("Error fetching products:", error);
                    },
                });
                });
            });
        });
    })
