$(function () {
    $("#header").load("/frontend/views/partials/Header/Header.html");
    $("#footer").load("/frontend/views/partials/Footer/Footer.html");
  });

  $(document).ready(function() {
    $('.minus-button').click(function() {
      let value = parseInt($(this).siblings('.counter-value').text());
      if (value > 1) {
        value--;
        $(this).siblings('.counter-value').text(value);
      }
    });
  
    $('.plus-button').click(function() {
      let value = parseInt($(this).siblings('.counter-value').text());
      value++;
      $(this).siblings('.counter-value').text(value);
    });
  });
  
  $(document).ready(function() {
    $('.add-to-cart-button').click(function() {
      var message = $('<div>', {
        id: 'message-content',
        class: 'message-content-box'
      });
  
      var messageContent = $('<div>', {
        class: 'message-content-flex'
      });
  
      var messageIcon = $('<div>', {
        class: 'message-icon'
      }).append(
        $('<img>', {
          src: '/frontend/views/partials/assets/29721143e926a816dec4943d6352c52e.png',
          alt: 'alt text',
          class: 'message-icon'
        })
      );
  
      var messageText = $('<h5>', {
        class: 'message-highlights',
        text: 'This item has been added to your Shopping bag.'
      });
  
      var viewCartButton = $('<h5>', {
        class: 'view-cart-button',
        text: 'VIEW CART',
        click: function() {
          alert('It is clickable');
        }
      });
  
      messageContent.append(messageIcon, messageText, viewCartButton);
  
      message.append(messageContent);
  
      $("#header").load("/frontend/views/partials/Header/Header.html", function() {
        $(this).after(message);
      });
    });
  });
  
  