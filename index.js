const https = require('https');

module.exports = {
    bse: async function (stock, callback) {
        return main(stock, 'bse', callback)
    },
    nse: async function (stock, callback) {
        return main(stock, 'nse', callback)
    }
}

async function main(stock, exchange, callback){

    let stockInfo = await getStockInfo(stock, exchange);

    if(stockInfo == null){
        try{
            stock = await getMoneyControlCode(stock);
            stockInfo = await getStockInfo(stock, exchange);

            if(stockInfo == null) {
                if(callback) callback(`Invalid Stock ${stock}`)
                else throw new Error(`Invalid Stock ${stock}`)
            }
        }
        catch (e){
            if(callback) return callback(e)
            else throw new Error(e)
        }
    }

    if(callback) callback(null, stockInfo)
    else return stockInfo;
}

function getStockInfo(stock, exchange){
    return new Promise((resolve, reject) => {
        https.get(`https://priceapi.moneycontrol.com/pricefeed/${exchange}/equitycash/${stock}`, (res) => {
            let response = '';
            res.on('data', (d) => response += d);
            res.on('end', () => resolve(JSON.parse(response).data));
        }).on('error', (e) => reject(e));
    })
}

function getMoneyControlCode(stockName){
    return new Promise((resolve, reject) => {
        https.get( `https://www.moneycontrol.com/mccode/common/autosuggestion_solr.php?classic=true&query=${stockName}&type=1&format=json&callback=suggest1`, (res) => {
            let body = '';
            res.on('data', (d) => body += d);
            res.on('end', () => {
                body = body.replace('suggest1(', '');
                body = body.slice(0, -1);
                body = body.replace(/\s/g, '');
                body = JSON.parse(body);

                body.forEach((info) => {
                    if(info.pdt_dis_nm === 'NoResultAvailable')
                        reject(`Invalid Stock ${stockName}`)
                    else{
                        let searchResultArray = info.pdt_dis_nm.split(',');
                        if(searchResultArray[searchResultArray.length - 2].toUpperCase() === stockName.toUpperCase()) resolve(info.sc_id);
                    }
                })
            });
        }).on('error', (e) => reject(e));
    })
}