//https://gist.github.com/kjantzer/5936491
/*
 	Convert numbers to words

 	copyright 25th July 2006, by Stephen Chapman http://javascript.about.com
 	permission to use this Javascript on your web page is granted
 	provided that all of the code (including this copyright notice) is
 	used exactly as shown (you can change the numbering system if you wish)
*/
	var numberToWords = function(s){

		var th = ['','thousand','million', 'billion','trillion'];
		var dg = ['zero','one','two','three','four', 'five','six','seven','eight','nine'];
		var tn = ['ten','eleven','twelve','thirteen', 'fourteen','fifteen','sixteen', 'seventeen','eighteen','nineteen'];
		var tw = ['twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

		s = (s||'').toString(); s = s.replace(/[\, ]/g,''); if (s != parseFloat(s)) return 'not a number'; var x = s.indexOf('.'); if (x == -1) x = s.length; if (x > 15) return 'too big'; var n = s.split(''); var str = ''; var sk = 0; for (var i=0; i < x; i++) {if ((x-i)%3==2) {if (n[i] == '1') {str += tn[Number(n[i+1])] + ' '; i++; sk=1;} else if (n[i]!=0) {str += tw[n[i]-2] + ' ';sk=1;}} else if (n[i]!=0) {str += dg[n[i]] +' '; if ((x-i)%3==0) str += 'hundred ';sk=1;} if ((x-i)%3==1) {if (sk) str += th[(x-i-1)/3] + ' ';sk=0;}} if (x != s.length) {var y = s.length; str += 'point '; for (var i=x+1; i<y; i++) str += dg[n[i]] +' ';} return str.replace(/\s+/g,' ');

	}

const Web3 = require('web3')
    //MASK ENV VAR
    const web3ETH = new Web3(process.env.EthereumMainnetInfuraAPIKey);
    //MASK ENV VAR
    const aggregatorV3InterfaceETHABI = [{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"description","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint80","name":"_roundId","type":"uint80"}],"name":"getRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
    const addrETH = "0xf4030086522a5beea4988f8ca5b36dbc97bee88c";
    const priceFeedETH = new web3ETH.eth.Contract(aggregatorV3InterfaceETHABI, addrETH);
    priceFeedETH.methods.latestRoundData().call()
        .then((roundData) => {
            // Do something with roundData
            let valuePricefeed = ((roundData.answer)/(10**8)).toFixed(2);
            console.log("BTC_PRICEFEED_MAINNET", valuePricefeed )
            console.log("BTC_PRICEFEED_MAINNET", numberToWords(valuePricefeed) )
            console.log("BTC_PRICEFEED_MAINNET", numberToWords(valuePricefeed).split(" ") )
        });
