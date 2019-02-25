var requestify = require('requestify')
var jsonfile = require('jsonfile')
var cheerio = require('cheerio')
var arrayUrlList = [
	{szURL: 'https://www.uu898.com/newTrade.aspx?gm=150&area=1319&srv=8963&c=-3&o=5&sa=0&p=1', szJsonPath: './public/shuangmeng.json', nValueMax: 5000},
	{szURL: 'https://www.uu898.com/newTrade.aspx?gm=150&area=1319&srv=6897&c=-3&o=5&sa=0&p=1', szJsonPath: './public/weimanxua.json', nValueMax: 5000},
	{szURL: 'https://www.uu898.com/newTrade.aspx?gm=150&area=1315&srv=30493&c=-3&o=5&sa=0&p=1', szJsonPath: './public/dielianhua.json', nValueMax: 5000},
	{szURL: 'https://www.uu898.com/newTrade.aspx?gm=267&area=2490&srv=29946&c=-3&o=5&sa=0&p=1', szJsonPath: './public/taihuashan.json'},
	{szURL: 'https://www.uu898.com/newTrade.aspx?gm=267&area=2490&srv=31721&c=-3&o=5&sa=0&p=1', szJsonPath: './public/butianling.json'},
	{szURL: 'https://www.uu898.com/newTrade.aspx?gm=267&area=2490&srv=31815&c=-3&o=5&sa=0&p=1', szJsonPath: './public/yingxianmen.json'},
	{szURL: 'https://www.uu898.com/newTrade.aspx?gm=267&area=2490&srv=31821&c=-3&o=5&sa=0&p=1', szJsonPath: './public/liuyuecheng.json'},
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
	var tJson = jsonfile.readFileSync(tLine.szJsonPath)
	for(var i = tJson.length -1; i >= 0 ; i--){
		if(tJson[i][1] < 1){
			console.info(tJson[i])
			tJson.splice(i, 1)
		}
		if(tLine.nValueMax && tJson[i][1] > tLine.nValueMax){
			console.info(tJson[i])
		}
	}
	jsonfile.writeFile(tLine.szJsonPath, tJson, function (err) {
		if (err) {
			console.error(err)
		}
	})
}
