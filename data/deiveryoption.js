
export let deliveryOption=[{
    id:'1',
    deliveryDays:7,
    priceCents:0
},{
    id:'2',
    deliveryDays:3,
    priceCents:499
},{
    id:'3',
    deliveryDays:1,
    priceCents:999
}];
export function getdeliveryoption(deliveryOptionId){
    let DeliveryOption;
    
      // Ensure that deliveryOption is an array and find the selected option
      if (Array.isArray(deliveryOption)) {
        DeliveryOption = deliveryOption.forEach(option => option.id === deliveryOptionId
    )};
    return deliveryOption || deliveryOption[0];
}