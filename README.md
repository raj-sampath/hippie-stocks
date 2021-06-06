# Hippie Stocks 
### A Real Time light-weight package for retrieving stock info from the National Stock Exchange (NSE) and Bombay Stock Exchange (BSE)
**All stock info available via this package is scraped from [Moneycontrol.com](https://www.moneycontrol.com/)**

## Installation

` npm install hippie-stocks`

## Usage
`
Installation  
const { nse, bse } = require('hippe-stocks')
`

The package supports both callbacks and promises.

`
// Promise  
nse('ITC').then((data) = console.log(data)).catch((e) = console.error(e))  
bse('ITC').then((data) = console.log(data)).catch((e) = console.error(e))
`

`
 // Callback  
nse('ITC', (error, data) = {  
if(error) console.log(error);  
else console.log(data)})  
`
`
bse('ITC', (error, data) = {  
if(error) console.log(error);  
else console.log(data)});
`
`
// Usage in Async Blocks  
let stockPrice = await nse('ITC');    
let stockPrice = await bse('ITC');  
`

## Response
Apart from the current price a lot more info is present in the response. Listed below are few. The key names are self explanatory and easy understandable.

1. pricecurrent - Current Price
2. priceprevclose - Price at the last close
3. 52H - 52 Week High
4. 52L - 52 Week Low
5. pricechange - Price Change
6. pricepercentchange - Price Percentage Change
