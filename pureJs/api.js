function setup(){

  const mykey = config.MY_KEY;
  const symbolsAPI      = 'https://sandbox.iexapis.com/stable/stock/market/list/gainers?token='+mykey;
  const intraDayAPI_    = 'https://sandbox.iexapis.com/stable/stock/';
  const intraDayAPI_end = '/intraday-prices?token='+mykey;

  let symbols = []; let symbolArr = []; let megaArr = []  
  // constructor object to save new incoming data
  function Gainers( volume, symbol, minute,  open, close){ //, date , high, low, open, close, notional){
    this.symbol = symbol
    this.volume = volume
    this.minute = minute 
    this.open = open
    this.close = close
    this.color =  (close > open) ? '#0FD9BA' : '#D90404';  
    // this.date  = date 
    // this.intraday = {  
    //  minute: minute, volume: volume, high: high, open: open, 
    //  close : close, low: low, notional: notional,
    // }
  }
  // Call the 1 API to get all the most gainers of the day 
  function fetchSymbols(symbolsURL){
    return fetch(symbolsURL).then(response => response.json()) 
  }
  // input the symbols found in 1 API into 2 API and return a new object
  function fetchInrtaday(stonks){
    return fetch(`${intraDayAPI_}${stonks}${intraDayAPI_end}`)
      .then(response => response.json())
      .then(response => response.map( data => {
        const gainers = new Gainers( data.volume, stonks, data.minute, data.open, data.close, data.date, data.high, data.low, data.notional) 
        return gainers
      }))
  }
  // make it work in this function
  async function symbolsFetched(url){

    try {
      symbols = await fetchSymbols(url)
      symbolArr = symbols.map( s => s.symbol)

      for(const symbol of symbolArr){
        megaArr.push( await fetchInrtaday(symbol) )
      }
      const data = await Promise.all(megaArr).then(result => result).catch(e => console.log(e))
      return data;
    
    } catch(e){
      console.log(e)
    }  
  }

  return symbolsFetched(symbolsAPI).then(result => result)
}