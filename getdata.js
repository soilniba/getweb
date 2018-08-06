// var express = require('express')
// var app = express()
// var bodyParser = require('body-parser')
var requestify = require('requestify')
// var fse = require('fs-extra')
var jsonfile = require('jsonfile')
// var moment = require('moment')
var cheerio = require('cheerio')
var szJsonPath = './public/data.json'
jsonfile.readFile(szJsonPath, function(err, obj) {
	if (err) {
		console.info('not find save.json \n')
		jsonfile.writeFile(szJsonPath, [], function (err) {
			if (err) {
				console.error(err)
			} else {
				main()
			}
		})
	} else {
		main()
	}
	// console.info(err)
	// console.dir(obj)
})

function main(){
    console.info('*** Main Start *** \n')
    var oneSecond = 1000 * 60 // one second = 1000 x 1 ms
    setInterval(function() {
        GetUrl('https://www.uu898.com/newTrade.aspx?gm=150&area=1319&srv=8963&c=-3&o=5&sa=0&p=1')
    }, oneSecond)
    // GetUrl('https://www.uu898.com/newTrade.aspx?gm=150&area=1319&srv=8963&c=-3&o=5&sa=0&p=1')
	// var tJson = jsonfile.readFileSync(szJsonPath)
	// tJson.tA = {}
	// tJson.arrayB = []
	// tJson.tA.ccc = 142314
	// tJson.arrayB.push('aaaaa')
	// tJson.arrayB.push('bbbbb')
	// tJson.arrayB.push('ccccc')
	// tJson.arrayB.pop()
	// tJson.arrayB.shift()
	// tJson.push([Date.now() ,108.37])
	// jsonfile.writeFile(szJsonPath, tJson, function (err) {
	// 	if (err) {
	// 		console.error(err)
	// 	}
	// })
}

function GetUrl(szUrl){
    //查询服务器状态
    requestify.request(szUrl, {
        method: 'GET',
        // headers: headers    
    })
    .then(function(tResponse) {
        // console.info('Get成功')
		// console.dir(tResponse)
		// console.info(tResponse.body)
		const $ = cheerio.load(tResponse.body)
        const szText = $('#divCommodityLst').children('ul').first().children('li.sp_li1').children('h6').children('span').first().text()
        const szNum = szText.match(/[^=][0-9.]+/g).toString()
        console.dir(szNum)
        var tJson = jsonfile.readFileSync(szJsonPath)
        tJson.push([Date.now(), parseInt(szNum)])
        jsonfile.writeFile(szJsonPath, tJson, function (err) {
            if (err) {
                console.error(err)
            }
        })
    })
    .fail(function(tResponse) {
		console.dir(tResponse)
    });
}

// app.use('/public', express.static('public'))

// app.listen(8081)