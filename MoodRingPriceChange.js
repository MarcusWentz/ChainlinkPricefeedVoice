const Web3 = require('web3')
    const web3ETH = new Web3(process.env.EthereumMainnetInfuraAPIKey);

    const aggregatorV3InterfaceETHABI = [{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"description","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint80","name":"_roundId","type":"uint80"}],"name":"getRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
    const addrETH = "0xf4030086522a5beea4988f8ca5b36dbc97bee88c";
    const priceFeedETH = new web3ETH.eth.Contract(aggregatorV3InterfaceETHABI, addrETH);
    let valueOld = 0;
    let valueNew = 0;

    // var piblaster = require('pi-blaster.js');
    const timeMilliSec = 1000; //2 seconds per value
    const pulseWidthMin = 0.00;
    const pulseWidthMax = 0.35;

    let objectLED = {"pin":   [21   ,25    ,23      ,22     ,24      ,27      ,17    ,18     ],
                     "color": ['RED','BLUE','YELLOW','GREEN','PURPLE','ORANGE','PINK','WHITE']}

    function timeout(ms) {
	     return new Promise(resolve => setTimeout(resolve,ms));
     }

function processMoodValues() {
  if(valueNew > valueOld) {
    console.log("GREEN")
    // piblaster.setPwm(objectLED['pin'][3], pulseWidthMax);
  }
  if(valueNew < valueOld) {
    console.log("RED")
    // piblaster.setPwm(objectLED['pin'][0], pulseWidthMax);
  }
  if(valueNew == valueOld) {
    console.log("YELLOW")
    // piblaster.setPwm(objectLED['pin'][2], pulseWidthMax);
  }
  console.log("old " + valueOld)
  console.log("new " + valueNew)
}

async function start(){
  priceFeedETH.methods.latestRoundData().call()
      .then((roundData) => {
          // Do something with roundData
          let valueConverted = ((roundData.answer)/(10**8)).toFixed(2)
          console.log("BTC_PRICE",  valueConverted)
          valueNew = valueConverted;
          valueOld = valueNew;
      });

      processMoodValues()

      await timeout(1000)
}

async function loop(){
  await timeout(1000)
  let i = 0;
  while(true) {
    i++;
    console.log(i)
    priceFeedETH.methods.latestRoundData().call()
        .then((roundData) => {
            // Do something with roundData
            let valueConverted = ((roundData.answer)/(10**8)).toFixed(2)
            console.log("BTC_PRICE",  valueConverted)
            if(i%2){
              valueOld = valueNew;
              valueNew = 40000;
            } else{
              valueOld = valueNew;
              valueNew = 50000;
            }

            processMoodValues()

        });
        await timeout(1000)
  }

}

start()
loop()
