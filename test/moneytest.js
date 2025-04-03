import {formatcurrency}from"../scripts/utils/money.js";
console.log('test suite: formatCurrency');
console.log('convert censt to dollars');
if(formatcurrency(2095)==='20.95'){
    console.log('passed');
}else{
    console.log("fail");
}
console.log('works with 0');
if(formatcurrency(0)==='0.00'){
    console.log("passed");
}else{
    console.log('fail');
} 
console.log('roundup tpo the nearest censt');
if(formatcurrency(2000.5)==='20.01'){
    console.log("passed");   
}else{
    console.log('failed');
}