
function renderOrderSummary()
{
  cartSummaryHTML = ``;
cart.forEach((cartItem)=> 
    {

        const productId = cartItem.id;
        let matchingProduct;

        products.forEach((product) =>
        {
           if(productId === product.id)
            {
                matchingProduct = product;
            } 
        });

        const deliveryOptionId = cartItem.deliveryOptionId;

        let deliveryOption;

        deliveryOptions.forEach((option) => 
          {
            if(option.id === deliveryOptionId)
              {
                deliveryOption = option;
              }
          });

        let today = dayjs();
        let deliveryDate = today.add(deliveryOption.deliveryTime, 'days');
        let dateString = deliveryDate.format('dddd, MMMM D');

        html = ` <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                ${(matchingProduct.priceCents / 100).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>
                ${deliveryOptionsHTML(matchingProduct, cartItem)}   
              </div>
            </div>
          </div>`;
          cartSummaryHTML += html;
    });

    function deliveryOptionsHTML(matchingProduct, cartItem)
    {
// Something is seriously fucked up in here

        let html = ``;

        deliveryOptions.forEach((option) =>
            {

                let today = dayjs();
                let deliveryDate = today.add(option.deliveryTime, 'days');
              let dateString = deliveryDate.format('dddd, MMMM D');

                let price = option.priceCents === 0 ? 'FREE' : `$${(option.priceCents / 100).toFixed(2)}`;

              const isChecked = option.id === cartItem.deliveryOptionId;

              html +=  `
                <div class="delivery-option js-delivery-option" data-product-id = "${matchingProduct.id}" data-delivery-option-id = "${option.id}">
                  <input type="radio"
                  ${isChecked ? 'checked': ''}
                    class="delivery-option-input"
                    name="${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${price} - Shipping
                    </div>
                  </div>
                </div>
                `;

            });
            return html;
    }

// put on page
document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link').forEach((link) => 
{
    link.addEventListener('click', () => 
    {
        removeFromCart(link.dataset.productId);
    })


})
};

document.querySelectorAll('.js-delivery-option').forEach((element) => 
  {
    element.addEventListener('click', () => 
      {

        // something fucked up here
        const {productId, deliveryOptionId} = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        //renderOrderSummary();
      });
  });

renderOrderSummary();
