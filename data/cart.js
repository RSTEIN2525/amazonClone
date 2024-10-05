let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart)
    {
        cart = [
            {
                id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 2,
                deliveryOptionId: '1'
               
            },
            {
                id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity: 3,
                 deliveryOptionId: '2'
            }];
    }


function addToCart(productId)
{
  // Determine if This Product is Already in Cart
  let matchingItem;
  cart.forEach((item) => 
  {
      if(productId === item.id)
      {
        matchingItem = item;
      }
  });
 
  if(matchingItem)  // If we find an object (its not null) its a truthy value
      {
          matchingItem.quantity ++;
      }else{
          cart.push({
              id: productId,
              quantity: 1,
              deliveryOptionId: '1'
          })

         
      }

      saveToStorage();
    }

      

function removeFromCart(productId)
{
    let newCart = [];

    cart.forEach((cartItem) => 
    {
        if(!(productId === cartItem.id))
        {
            newCart.push(cartItem);
        }
    })

    cart = newCart;
    // removing container, identified via special class added onto on the elemnt ref: line 40;
    document.querySelector(`.js-cart-item-container-${productId}`).remove();

    saveToStorage();
}

function saveToStorage()
{
   localStorage.setItem('cart', JSON.stringify(cart));
}

function updateDeliveryOption(productId, deliveryOptionId)
{
    let matchingItem;
  cart.forEach((item) => 
  {
      if(productId === item.id)
      {
        matchingItem = item;
      }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();

}