$(document).ready(function () {
  const $tableBody = $("#orderTableBody");
  const $emptyMessage = $("#emptyMessage");

  // Check if the table is empty
  if ($tableBody.children().length === 0) {
    $emptyMessage.show();
  } else {
    $emptyMessage.hide();
  }
});

$(document).ready(function () {
  const orders = [
    {
      orderNumber: 1,
      date: "2023-06-19",
      status: "Completed",
      total: "$100.00",
    },
    { orderNumber: 2, date: "2023-06-20", status: "Pending", total: "$50.00" },
    {
      orderNumber: 3,
      date: "2023-06-21",
      status: "Cancelled",
      total: "$75.00",
    },
  ];

  const $tableBody = $("#orderTableBody");
  const $emptyMessage = $("#emptyMessage");

  // Generate table rows from the orders data
  if (orders.length === 0) {
    $emptyMessage.show();
  } else {
    $emptyMessage.hide();

    $.each(orders, function (index, order) {
      const $row = $("<tr>");
      $row.append("<td>" + order.orderNumber + "</td>");
      $row.append("<td>" + order.date + "</td>");
      $row.append("<td>" + order.status + "</td>");
      $row.append("<td>" + order.total + "</td>");
      $row.append('<td><a href="#">View Order</a></td>');
      $tableBody.append($row);
    });
  }
});
