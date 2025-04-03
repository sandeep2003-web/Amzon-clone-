import { cart } from "../../data/cart.js";
import { getproduct } from "../../data/products.js";
import { getdeliveryoption } from "../../data/deiveryoption.js";
import{formatcurrency} from "../utils/money.js"
export function renderpaymentsummary(){
    let productpriceCents = 0;
    let shappingpriceCents = 0;
    
    cart.forEach((item) => {
        const product = getproduct(item.productId);
    
        // Ensure that the product exists before performing the calculation
        if (product && !isNaN(product.priceCents)) {
            productpriceCents += product.priceCents * item.quantity;
        } else {
            console.warn(`Product with ID ${item.productId} not found or has invalid priceCents`);
        }
    
        const deliveryoption = getdeliveryoption(item.deliveryoptionId);
    
        // Ensure that the delivery option exists before performing the calculation
        if (deliveryoption && !isNaN(deliveryoption.priceCents)) {
            shappingpriceCents += deliveryoption.priceCents;
        } else {

        }
    });
    
    // Log the totals
    console.log('Total Product Price in Cents:', productpriceCents);
    console.log('Total Shipping Price in Cents:', shappingpriceCents);
    
    // Example of calling getproduct with a specific productId
    const sampleProductId = 123;  // Replace with an actual product ID for testing
    // Log the result of getproduct with a valid productId
    
     
    // Example of calling getproduct with a specific productId
      // Replace with an actual product ID for testing
    // Log the result of getproduct with a valid productId
    
    const totalBeforeTaxCents= productpriceCents + shappingpriceCents; 
    const taxCents =totalBeforeTaxCents *0.1;
    const TotalCents = totalBeforeTaxCents + taxCents;

    const paymentSummaryHTML=`

            <div class="payment-summary-title">
                Order Summary
            </div>

            <div class="payment-summary-row">
                <div>Items (3):</div>
                <div class="payment-summary-money">${formatcurrency(productpriceCents)}</div>
            </div>

            <div class="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div class="payment-summary-money">$${formatcurrency(shappingpriceCents)}</div>
            </div>

            <div class="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div class="payment-summary-money">$${formatcurrency(totalBeforeTaxCents)}</div>
            </div>

            <div class="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div class="payment-summary-money">$${formatcurrency(taxCents)}</div>
            </div>

            <div class="payment-summary-row total-row">
                <div>Order total:</div>
                <div class="payment-summary-money">$${formatcurrency(TotalCents)}</div>
            </div>

            <button class="place-order-button button-primary">
                Place your order
            </button>
        


    `;
    document.querySelector('.js-payment-summary')
     .innerHTML=paymentSummaryHTML;
}