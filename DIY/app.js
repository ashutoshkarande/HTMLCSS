const express = require('express')
const app = express()
const port = 3000
const path = require('path');
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/1', (req, res) => {
    res.sendFile(path.join(__dirname + '/index2.html'));
});

app.get('/code', (req, res) => {
    const request = require('request');

    console.log("in get ");
    // request('http://www1.nseindia.com/homepage/Indices1.json', { json: true }, (err, res, body) => {
    //     if (err) { return console.log(err); }
    //     console.log(body.url);
    //     console.log(body.explanation);
    // });



    const axios = require('axios');
    const cheerio = require('cheerio');
    axios.get('https://www.nseindia.com/api/allIndices')
        .then(function (response) {
            // handle success
            console.log(typeof response.data);
            //res.json(response.data);
            //const fs = require('fs');
            let data = JSON.stringify(response.data);
            //fs.writeFileSync('student-2.json', data);


            var request = require('request');
            request.post({
                headers: { 'content-type': 'application/json' },
                url: 'https://morning-cove-84300.herokuapp.com/api/',
                body: data,
            }, function (error, response, body) {
                //console.log(body);
                res.json(JSON.parse(body));
            });


        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
});

var cron = require('node-cron');

function nifty() {
    const axios = require('axios');
    const cheerio = require('cheerio');
    //axios.get('https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%2050')
    axios.get('https://www1.nseindia.com/live_market/dynaContent/live_watch/stock_watch/niftyStockWatch.json')
        .then(function (response1) {
            var data1 = response1.data.data;
            var AXISBANK = data1.find(function (post, index) {
                if (post.symbol == 'AXISBANK')
                    return true;
            });
            var NTPC = data1.find(function (post, index) {
                if (post.symbol == 'NTPC')
                    return true;
            });
            var HINDALCO = data1.find(function (post, index) {
                if (post.symbol == 'HINDALCO')
                    return true;
            });
            var HCLTECH = data1.find(function (post, index) {
                if (post.symbol == 'HCLTECH')
                    return true;
            });
            var TATAMOTORS = data1.find(function (post, index) {
                if (post.symbol == 'TATAMOTORS')
                    return true;
            });
            var SBIN = data1.find(function (post, index) {
                if (post.symbol == 'SBIN')
                    return true;
            });
            var ADANIPORTS = data1.find(function (post, index) {
                if (post.symbol == 'ADANIPORTS')
                    return true;
            });
            var TITAN = data1.find(function (post, index) {
                if (post.symbol == 'TITAN')
                    return true;
            });
            var RELIANCE = data1.find(function (post, index) {
                if (post.symbol == 'RELIANCE')
                    return true;
            });
            var ZEEL = data1.find(function (post, index) {
                if (post.symbol == 'ZEEL')
                    return true;
            });
            var BPCL = data1.find(function (post, index) {
                if (post.symbol == 'BPCL')
                    return true;
            });
            var COALINDIA = data1.find(function (post, index) {
                if (post.symbol == 'COALINDIA')
                    return true;
            });
            axios.get('https://www1.nseindia.com/live_market/dynaContent/live_watch/stock_watch/juniorNiftyStockWatch.json')
                .then(function (response2) {
                    var data2 = response2.data.data;
                    var MARICO = data2.find(function (post, index) {
                        if (post.symbol == 'MARICO')
                            return true;
                    });
                    var LUPIN = data2.find(function (post, index) {
                        if (post.symbol == 'LUPIN')
                            return true;
                    });
                    axios.get('https://www1.nseindia.com/live_market/dynaContent/live_watch/stock_watch/niftyMidcap50StockWatch.json')
                        .then(function (response3) {
                            var data3 = response3.data.data;
                            var CHOLAFIN = data3.find(function (post, index) {
                                if (post.symbol == 'CHOLAFIN')
                                    return true;
                            });
                            var arr = [];
                            arr.push(AXISBANK);
                            var d = new Date(AXISBANK.lastUpdateTime);
                            var hours = d.getHours();
                            var minutes = d.getMinutes();
                            var seconds = d.getSeconds();
                            arr.push(NTPC);
                            arr.push(HINDALCO);
                            arr.push(HCLTECH);
                            arr.push(MARICO);
                            arr.push(LUPIN);
                            arr.push(CHOLAFIN);
                            arr.push(TATAMOTORS);
                            arr.push(SBIN);
                            arr.push(ADANIPORTS);
                            arr.push(TITAN);
                            arr.push(RELIANCE);
                            arr.push(ZEEL);
                            arr.push(BPCL);
                            arr.push(COALINDIA);
                            //console.log(arr);
                            var request = require('request');

                            axios.get('https://morning-cove-84300.herokuapp.com/nifty')
                                .then(function (response) {
                                    var timeDatatemp;
                                    if (response.data.data != "nodata") {
                                        timeDatatemp = response.data.find(o => o.symbol === 'TIMEDATA');
                                        //console.log(timeDatatemp);
                                    }

                                    if (hours == 9 && minutes >= 70 && seconds >= 0) {
                                        // AXISBANK
                                        if (AXISBANK.lastPrice > timeDatatemp.AXISBANK.high) { timeDatatemp.AXISBANK.high = AXISBANK.lastPrice }
                                        if (AXISBANK.lastPrice < timeDatatemp.AXISBANK.low) { timeDatatemp.AXISBANK.low = AXISBANK.lastPrice }
                                        // NTPC
                                        if (NTPC.lastPrice > timeDatatemp.NTPC.high) { timeDatatemp.NTPC.high = NTPC.lastPrice }
                                        if (NTPC.lastPrice < timeDatatemp.NTPC.low) { timeDatatemp.NTPC.low = NTPC.lastPrice }
                                        // HINDALCO
                                        if (HINDALCO.lastPrice > timeDatatemp.HINDALCO.high) { timeDatatemp.HINDALCO.high = HINDALCO.lastPrice }
                                        if (HINDALCO.lastPrice < timeDatatemp.HINDALCO.low) { timeDatatemp.HINDALCO.low = HINDALCO.lastPrice }
                                        // HCLTECH
                                        if (HCLTECH.lastPrice > timeDatatemp.HCLTECH.high) { timeDatatemp.HCLTECH.high = HCLTECH.lastPrice }
                                        if (HCLTECH.lastPrice < timeDatatemp.HCLTECH.low) { timeDatatemp.HCLTECH.low = HCLTECH.lastPrice }
                                        // MARICO
                                        if (MARICO.lastPrice > timeDatatemp.MARICO.high) { timeDatatemp.MARICO.high = MARICO.lastPrice }
                                        if (MARICO.lastPrice < timeDatatemp.MARICO.low) { timeDatatemp.MARICO.low = MARICO.lastPrice }
                                        // LUPIN
                                        if (LUPIN.lastPrice > timeDatatemp.LUPIN.high) { timeDatatemp.LUPIN.high = LUPIN.lastPrice }
                                        if (LUPIN.lastPrice < timeDatatemp.LUPIN.low) { timeDatatemp.LUPIN.low = LUPIN.lastPrice }
                                        // CHOLAFIN
                                        if (CHOLAFIN.lastPrice > timeDatatemp.CHOLAFIN.high) { timeDatatemp.CHOLAFIN.high = CHOLAFIN.lastPrice }
                                        if (CHOLAFIN.lastPrice < timeDatatemp.CHOLAFIN.low) { timeDatatemp.CHOLAFIN.low = CHOLAFIN.lastPrice }
                                        // TATAMOTORS
                                        if (TATAMOTORS.lastPrice > timeDatatemp.TATAMOTORS.high) { timeDatatemp.TATAMOTORS.high = TATAMOTORS.lastPrice }
                                        if (TATAMOTORS.lastPrice < timeDatatemp.TATAMOTORS.low) { timeDatatemp.TATAMOTORS.low = TATAMOTORS.lastPrice }
                                        // SBIN
                                        if (SBIN.lastPrice > timeDatatemp.SBIN.high) { timeDatatemp.SBIN.high = SBIN.lastPrice }
                                        if (SBIN.lastPrice < timeDatatemp.SBIN.low) { timeDatatemp.SBIN.low = SBIN.lastPrice }
                                        // ADANIPORTS
                                        if (ADANIPORTS.lastPrice > timeDatatemp.ADANIPORTS.high) { timeDatatemp.ADANIPORTS.high = ADANIPORTS.lastPrice }
                                        if (ADANIPORTS.lastPrice < timeDatatemp.ADANIPORTS.low) { timeDatatemp.ADANIPORTS.low = ADANIPORTS.lastPrice }
                                        // TITAN
                                        if (TITAN.lastPrice > timeDatatemp.TITAN.high) { timeDatatemp.TITAN.high = TITAN.lastPrice }
                                        if (TITAN.lastPrice < timeDatatemp.TITAN.low) { timeDatatemp.TITAN.low = TITAN.lastPrice }
                                        // RELIANCE
                                        if (RELIANCE.lastPrice > timeDatatemp.RELIANCE.high) { timeDatatemp.RELIANCE.high = RELIANCE.lastPrice }
                                        if (RELIANCE.lastPrice < timeDatatemp.RELIANCE.low) { timeDatatemp.RELIANCE.low = RELIANCE.lastPrice }
                                        // ZEEL
                                        if (ZEEL.lastPrice > timeDatatemp.ZEEL.high) { timeDatatemp.ZEEL.high = ZEEL.lastPrice }
                                        if (ZEEL.lastPrice < timeDatatemp.ZEEL.low) { timeDatatemp.ZEEL.low = ZEEL.lastPrice }
                                        // BPCL
                                        if (BPCL.lastPrice > timeDatatemp.BPCL.high) { timeDatatemp.BPCL.high = BPCL.lastPrice }
                                        if (BPCL.lastPrice < timeDatatemp.BPCL.low) { timeDatatemp.BPCL.low = BPCL.lastPrice }
                                        // COALINDIA
                                        if (COALINDIA.lastPrice > timeDatatemp.COALINDIA.high) { timeDatatemp.COALINDIA.high = COALINDIA.lastPrice }
                                        if (COALINDIA.lastPrice < timeDatatemp.COALINDIA.low) { timeDatatemp.COALINDIA.low = COALINDIA.lastPrice }

                                        arr.push(timeDatatemp);
                                    } else {
                                        var timeData = {
                                            symbol: "TIMEDATA",
                                            AXISBANK: {
                                                high: AXISBANK.lastPrice,
                                                low: AXISBANK.lastPrice
                                            },
                                            NTPC: {
                                                high: NTPC.lastPrice,
                                                low: NTPC.lastPrice
                                            },
                                            HINDALCO: {
                                                high: HINDALCO.lastPrice,
                                                low: HINDALCO.lastPrice
                                            },
                                            HCLTECH: {
                                                high: HCLTECH.lastPrice,
                                                low: HCLTECH.lastPrice
                                            },
                                            MARICO: {
                                                high: MARICO.lastPrice,
                                                low: MARICO.lastPrice
                                            },
                                            LUPIN: {
                                                high: LUPIN.lastPrice,
                                                low: LUPIN.lastPrice
                                            },
                                            CHOLAFIN: {
                                                high: CHOLAFIN.lastPrice,
                                                low: CHOLAFIN.lastPrice
                                            },
                                            TATAMOTORS: {
                                                high: TATAMOTORS.lastPrice,
                                                low: TATAMOTORS.lastPrice
                                            },
                                            SBIN: {
                                                high: SBIN.lastPrice,
                                                low: SBIN.lastPrice
                                            },
                                            ADANIPORTS: {
                                                high: ADANIPORTS.lastPrice,
                                                low: ADANIPORTS.lastPrice
                                            },
                                            TITAN: {
                                                high: TITAN.lastPrice,
                                                low: TITAN.lastPrice
                                            },
                                            RELIANCE: {
                                                high: RELIANCE.lastPrice,
                                                low: RELIANCE.lastPrice
                                            },
                                            ZEEL: {
                                                high: ZEEL.lastPrice,
                                                low: ZEEL.lastPrice
                                            },
                                            BPCL: {
                                                high: BPCL.lastPrice,
                                                low: BPCL.lastPrice
                                            },
                                            COALINDIA: {
                                                high: COALINDIA.lastPrice,
                                                low: COALINDIA.lastPrice
                                            }
                                        }
                                        arr.push(timeData);
                                    }

                                    var data = JSON.stringify(arr);
                                    request.post({
                                        headers: { 'content-type': 'application/json' },
                                        url: 'https://morning-cove-84300.herokuapp.com/nifty',
                                        body: data,
                                    }, function (error, response, body) {
                                        if (response != undefined && response.statusCode != undefined)
                                            console.log("nifty " + response.statusCode);
                                        //res.json(JSON.parse(body));
                                    });
                                });
                        })
                        .catch(function (error) {
                            // handle error
                            console.log(error);
                        })
                        .finally(function () {
                            // always executed
                        });
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
}

function stockIndices() {
    const axios = require('axios');
    const cheerio = require('cheerio');
    //axios.get('https://www.nseindia.com/api/allIndices')
    axios.get('https://www1.nseindia.com/live_market/dynaContent/live_watch/stock_watch/niftyStockWatch.json')
        .then(function (response) {
            // handle success
            //console.log(typeof response.data);
            //res.json(response.data);
            //const fs = require('fs');
            let data = JSON.stringify(response.data);
            //fs.writeFileSync('student-2.json', data);


            var request = require('request');
            request.post({
                headers: { 'content-type': 'application/json' },
                url: 'https://morning-cove-84300.herokuapp.com/api/',
                body: data,
            }, function (error, response, body) {
                if (response != undefined && response.statusCode != undefined)
                    console.log("nifty 2 " + response.statusCode);
                nifty();
                //res.json(JSON.parse(body));
            });

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
}

cron.schedule('*/20 * * * * *', () => {
    console.log('running a task every');
    stockIndices();
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));