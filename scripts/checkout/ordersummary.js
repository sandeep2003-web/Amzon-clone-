import { cart, removfromcart,updateDeliveryoption } from "../../data/cart.js";
import { productss,getproduct } from "../../data/products.js";
import { formatcurrency } from "../utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOption,getdeliveryoption} from '../../data/deiveryoption.js';
import { renderpaymentsummary } from "./paymentSummary.js";


export function renderordersummary(){


  let cartsummaryHTML = '';  // Initialize the cart summary HTML string

  cart.forEach((item) => {
      const productId = item.productId;
      const matchingproduct=getproduct(productId);

      const deliveryOptionId = item.deliveryOptionId;
      const selectedDeliveryOption = getdeliveryoption(deliveryOptionId);
    
      // Calculate the delivery date if the delivery option is selected
      const today = dayjs();
      const deliverydate = selectedDeliveryOption ? today.add(selectedDeliveryOption.deliveryDays, 'days') : today;
      const dateString = deliverydate.format('dddd, MMMM D');
    

    
      cartsummaryHTML += `
            <div class="cart-item-container js-cart-item-container-${matchingproduct.id}">
              <div class="delivery-date">
                Delivery date: "${deliveryOptionId}"
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingproduct.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingproduct.name}
                  </div>
                  <div class="product-price">
                    $${matchingproduct.priceCents/100}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label">${item.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delect-link"data-product-id="${matchingproduct.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  <div>
                  ${deliveryoptionHTML(matchingproduct,item)}
                  </div>
                </div>
              </div>
            </div>


      
      `;
      
  });
  function deliveryoptionHTML(matchingproduct,item){
  let html='';

      deliveryOption.forEach((deliveryOption) =>{
      const today=dayjs();
      const deliverydate =today.add(
        deliveryOption.deliveryDays,
        'days'
      );
      const dateString = deliverydate.format(
        'dddd,MMMM D'
      );

      const priceString = deliveryOption.priceCents
      ===0
      ?'FREE'
      :`$${formatcurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === item.deliveryOptionId;
      html += ` 
        <div class="delivery-option js-delivery-option"
        data-product-id="${matchingproduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
            <input type="radio"
            ${isChecked ? 'checked':''}
              class="delivery-option-input"
              name="delivery-option-${matchingproduct.id}">
            <div>
              <div class="delivery-option-date">
                ${dateString}
              </div>
              <div class="delivery-option-price">
                ${priceString} Shipping
              </div>
            </div>
          </div>
        </div>
      `
    });
    
    return html;
    
  };

  document.querySelector('.js-order-summary').innerHTML = cartsummaryHTML;

  document.querySelectorAll('.js-delect-link')
  .forEach((link)=>{
    link.addEventListener('click',()=>{
      const productId=link.dataset.productId;
      removfromcart(productId);
      

      const container=document.querySelector(
      `.js-cart-item-container-${productId}`
      );
    container.remove();

    renderpaymentsummary();

    });
 });


  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const { productId, deliveryOptionId } = element.dataset;
        updateDeliveryoption(productId, deliveryOptionId);
        renderordersummary();
        renderpaymentsummary();
      });
      
  });
}
