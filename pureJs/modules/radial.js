

	function setup(){
		const symbolsAPI 			= 'https://sandbox.iexapis.com/stable/stock/market/list/gainers?token=Tpk_101d22a03efc4707950e8dd88e1d53df';
		const intraDayAPI_ 		= 'https://sandbox.iexapis.com/stable/stock/';
		const intraDayAPI_end = '/intraday-prices?token=Tpk_101d22a03efc4707950e8dd88e1d53df';

		let symbols = []; let symbolArr = []; let megaArr = []	
		// constructor object to save new incoming data
		function Gainers( volume, symbol, minute,  open, close){ //, date , high, low, open, close, notional){
			this.symbol = symbol
			this.volume = volume
			this.minute = minute 
			this.open = open
			this.close = close
			// this.date 	= date 
			// this.intraday = {	
			// 	minute: minute, volume: volume, high: high, open: open, 
			// 	close : close, low: low, notional: notional,
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
				.then(response => response.map( data => new Gainers( data.volume, stonks, data.minute, data.open, data.close, data.date, data.high, data.low, data.notional) ) )
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
	// get the response of each symbol and its data

	/*
	void draw(){
	  translate(width/2, height/2);
	  for (float theta = 0.0; theta < TWO_PI; theta += PI/6) {   
	    int   r = 200;
	    // Unite Circle formula
	    float x = r * cos(theta);
	    float y = r * sin(theta);
	    point(x, y);
	  }
	}
	*/























	async function draw(){

		try {

		const margin = 50
		const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
		const width = vw/3 - margin 
		const height = 300
		const innerRadius = 70
		const rectWidth = 1.5
		const outerRadius = Math.min(width, height)/2
		// our data from the async function return only de volume
		//grab the data
		
		let dara = await setup().then(d => d);

		function colorRect(sArr){
			const yesno = sArr.map(d => {
				const arr = []
				const open = d.open
				const close = d.close
				let yn = (close > open) ? '#0D2F73' : '#D90404';
				return yn;
			});
			return yesno;
		}

		// console.log(s11,' dera ',s1)
		console.log('yes or no', s11)
		// __________ SVG _________________
		// __________ SVG _________________
		// __________ SVG _________________
		function svgGrid(id){

			const svg =	d3.select(id)
				.attr('xmlns', 'http://www.w3.org/2000/svg')
	    	.attr('xmlns:xlink', 'http://www.w3.org/1999/xlink')
			  .style("width", width)
			  .style("height", height)
			  .style("border", "1px solid black")
			  .style("font", "15px sans-serif")
			  .append("g")
			    .attr("transform", "translate(" + width/2 + "," + height/2 + ")"+"rotate(180)" );

			return svg
		 }
		const svg1 = svgGrid('#svg1') 
		const svg2 = svgGrid('#svg2') 
		const svg3 = svgGrid('#svg3') 
		const svg4 = svgGrid('#svg4') 
		const svg5 = svgGrid('#svg5') 
		const svg6 = svgGrid('#svg6')

		// __________ SVG _________________
		// __________ SVG _________________
		// __________ SVG _________________
		
		function svgDraw(svg, data, symbol){	

			svg.append('text')
					.attr('x', -170)
					.attr('y', -height/3)
					.attr('transform', 'rotate(180)')
					.text(symbol[0] )

			const max = d3.max(data, d => d)
			const min = d3.min(data, d => d)
			//console.log(min)
			const xScale = d3.scaleBand()
				.domain(d3.keys(data))
				.range([0, 2 * Math.PI]);

			const angle = d3.scaleBand()
			  .domain(d3.keys(data))
			  .range([0, 360]);

			const yScale = d3.scaleSqrt()
				.domain([min, max])
				.range([innerRadius, outerRadius]);

			// const answer = angle(90)
			const answerX = xScale(1)
			const answerY = yScale(0)

			console.log('x ', answerX, 'Y ', answerY)
			svg.append('g').selectAll("rect")
			  .data(data, d => d)
			  .join("rect")
			    .attr('transform',(d,i) => `rotate( ${angle(i)} )translate(0,${rectWidth})` )
			    .attr('x', (d, i) =>  - rectWidth/2)
			    .attr('y', innerRadius)
			    // set height based on the bound datum
			    .attr('height', d => yScale(d) - innerRadius)
			    // rest of attributes are constant values
			    .attr('width', rectWidth)
			    .attr('stroke-width', 0.1)
			    .attr('stroke', 'white')
			    .attr('fill',  "#FFF" );
		}
		// __________ Draw :) _________________
		// __________ Draw :) _________________
		// __________ Draw :) _________________
	}
	catch(e) {
		console.log(e)
	}
}


	/*
	void draw(){
	  translate(width/2, height/2);
	  for (float theta = 0.0; theta < TWO_PI; theta += PI/6) {   
	    int   r = 200;
	    // Unite Circle formula
	    float x = r * cos(theta);
	    float y = r * sin(theta);
	    point(x, y);
	  }
	}
	*/




/*
void draw(){
  translate(width/2, height/2);
  for (float theta = 0.0; theta < TWO_PI; theta += PI/6) {   
    int   r = 200;
    // Unite Circle formula
    float x = r * cos(theta);
    float y = r * sin(theta);
    point(x, y);
  }
}
*/

	// print the symbols from sectors 
	//pk_91a9729e9985452696f114a3b51938d4 
// Tpk_101d22a03efc4707950e8dd88e1d53df