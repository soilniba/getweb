var requestify = require('requestify')
var jsonfile = require('jsonfile')
var cheerio = require('cheerio')
var arrayUrlList = [
	{szURL: 'https://www.uu898.com/newTrade.aspx?gm=150&area=1319&srv=8963&c=-3&o=5&sa=0&p=1', szJsonPath: './public/shuangmeng.json'},
	{szURL: 'https://www.uu898.com/newTrade.aspx?gm=150&area=1319&srv=6897&c=-3&o=5&sa=0&p=1', szJsonPath: './public/weimanxua.json'},
]

arrayUrlList.forEach(function(tLine){
	CreateJsonFile(tLine)
})

function CreateJsonFile(tLine){
	jsonfile.readFile(tLine.szJsonPath, function(err, obj) {
		if (err) {
			console.info('not find json \n')
			jsonfile.writeFile(tLine.szJsonPath, [], function (err) {
				if (err) {
					console.error(err)
				} else {
					main(tLine)
				}
			})
		} else {
			main(tLine)
		}
		// console.info(err)
		// console.dir(obj)
	})
}

function main(tLine){
	console.info('*** Main Start *** \n')
	GetUrl(tLine.szURL, tLine.szJsonPath)
    // var oneSecond = 1000 * 60 // one second = 1000 x 1 ms
    // setInterval(function() {
	// 	arrayUrlList.forEach(function(tLine){
	// 		GetUrl(tLine.szURL, tLine.szJsonPath)
	// 	})
    // }, oneSecond)
}

function GetUrl(szUrl, szJsonPath){
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
        const nNum = parseInt(szText.match(/[^=][0-9.]+/g).toString())
        console.dir(nNum)
		var tJson = jsonfile.readFileSync(szJsonPath)
		if (typeof(nNum) == 'number' && nNum > 100) {
			tJson.push([Date.now() + 8 * 60 * 60 * 1000, nNum])
			jsonfile.writeFile(szJsonPath, tJson, function (err) {
				if (err) {
					console.error(err)
				}
			})
		} else {
			setTimeout(GetUrl, 60 * 1000, szUrl, szJsonPath)
		}
    })
    .fail(function(tResponse) {
		console.dir(tResponse)
    });
}
