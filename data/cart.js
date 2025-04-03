
export let cart=JSON.parse(localStorage.getItem('cart'));
if(!cart){
    cart =[{
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity:2,
        deliveryOptionId:'1'
    },{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:1,
        deliveryOptionId:'2'
    }];
      
    
}
 export function savetostorge(){
    localStorage.setItem('cart',JSON.stringify(cart));
}
export function addtocart(productId) {
    let matching = cart.find((item) => item.productId === productId);  // Use find to get the matching item

    if (matching) {
        matching.quantity += 1;  // If item exists, increase quantity
    } else {
        cart.push({
            productId: productId,
            quantity: 1, 
            deliveryOptionId:'1' // If item doesn't exist, add it with quantity 1
        });
    }

    // Save to local storage or other storage mechanism
    savetostorge();
}

export function removfromcart(productId){
    let newCart=[];
    cart.forEach((item)=>{
        if(item.productId !== productId){
            newCart.push(item);
        }
    });
    cart=newCart;
    savetostorge();
} 
export function updateDeliveryoption(productId, deliveryOptionId) {
    let matching;

    cart.forEach((item)=>{
        if(productId === item.productId){
            matching=item
        }
    });
   matching.deliveryOptionId = deliveryOptionId;

   savetostorge();
}


