/*
*   An implamentation of D3 js in the stock market
*   Freddy Castano portfolio 2020 
*   I hope you find this useful ;) 
*/

const margin = 50
const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
const width = vw/3 - margin 
const height = 300
const innerRadius = 70
const rectWidth = 1.5
const outerRadius = Math.min(width, height)/2
// our data from the async function return only de volume
//grab the data

setup().then(dara => { 

   
  // for(let i=0; i<dara.length; i++){

    // const data = dara[i].map(data => data)
    /*
    * Oh yes i did it baby ! 
    */
    // console.log(JSON.stringify(dara))
 
  _.forEach(dara, function(data, key) {

     const svg = d3.select('div#gainers')
    .append('svg')
    .attr("class", "col-3")
    .style("width", width)
    .style("height", height)
    // .style("border", "1px solid #D2DBE2")
    .style("font", "15px sans-serif")
    .append("g")
      .attr("transform", "translate(" + width/2 + "," + height/2 + ")"+"rotate(180)" );

    // console.log(data)

    const max = d3.max(data, d => d.volume)
    const min = d3.min(data, d => d.volume)
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
    
    const rects = svg.selectAll('rect')
      .data(data).enter().append('rect')

    rects.attr('transform',(d,i) => `rotate( ${angle(i)} )translate(0,${rectWidth})` )
      .attr('x', (d, i) =>  - rectWidth/2)
      .attr('y', innerRadius)
      // set height based on the bound datum
      .attr('height', d => yScale(d.volume) - innerRadius)
      // rest of attributes are constant values
      .attr('width', rectWidth)
      .attr('stroke-width', 0.1)
      .attr('stroke', 'white')
      .attr('fill', d => d.color );

    //write the symbol with an for loop should rewrite this man
    const symbol = svg.selectAll('text')
      .data(data).enter().append('text')

    symbol.attr('x', -170)
      .attr('y', -height/3)
      .attr('transform', 'rotate(180)')
      .attr('fill', 'white');
      // .text(symbol[0] )
    symbol.text( (d,i) => {
     if (i == 1 ) {
        return d.symbol 
     } 
    });

     // lets make the tooltip
    //Create Bars part 2
    svg.selectAll("rect")
      .on("mouseover", function(d) {
        //Get this bar's x/y values, then augment for the tooltip
        const xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
        //Create the tooltip label
        svg.append("text")
          .attr("id", "tooltip")
          .attr("transform","rotate(180)" )
          .attr("x", xPosition)
          .attr("y", 0)
          .attr("text-anchor", "middle")
          .attr("font-size", "16px")
          .attr("font-weight", "bold")
          .attr("fill", "white")
          .text( d.minute)

      svg.append("text")
          .attr("id", "tooltip2")
          .attr("transform","rotate(180)" )
          .attr("x", xPosition)
          .attr("y", 20)
          .attr("text-anchor", "middle")
          .attr("font-size", "16px")
          .attr("font-weight", "bold")
          .attr("fill", "white")
          .text( d3.format(",.2r")(d.volume) )
      })
      .on("mouseout", function() {
        //Remove the tooltip
        d3.select("#tooltip").remove();
        d3.select("#tooltip2").remove();
      })
  })
  // end of loop
})
/*
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
   
*/