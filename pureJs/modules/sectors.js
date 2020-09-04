	function sectors(){
		Promise.all([
			d3.csv("data/nyse.csv"),
			d3.csv("data/amex.csv"),
			d3.csv("data/nasdaq.csv")
		]).then( (data) => {
			// const amor  = dataFunction(data);
			// console.log(amor);
		}).catch(e => console.log(e));

		function dataFunction(daticos){
			const datos = [];
			let energy = [], miscellaneous =[], capitalGoods =[], consumerNonDurables=[], utilities = [], consumerDurables=[], consumerService=[], industrial=[], technology=[], finance=[], healthCare=[];
			let sectorsObj = {};
			
			for(let v of daticos){
				v.map( d => {
					if ( (d.Sector !== "n/a" && d.MarketCap !== "n/a" ) ) { 
						datos.push(d);
						const sectors = d.Sector;

						switch(sectors){
							case 'Energy':
								energy.push(d);
								break;
							case 'Miscellaneous':
								miscellaneous.push(d);
								break;
							case 'Capital Goods':
								capitalGoods.push(d);
								break;
							case 'Consumer Non-Durables':
								consumerNonDurables.push(d);
								break;
							case 'Public Utilities':
								utilities.push(d);
								break;
							case 'Consumer Durables':
								consumerDurables.push(d);
								break;
							case 'Consumer Services':
								consumerService.push(d);
								break;
							case 'Basic Industries':
								industrial.push(d);
								break;
							case 'Technology':
								technology.push(d);
								break;
							case 'Finance':
								finance.push(d);
								break;
							case 'Health Care':
								healthCare.push(d);
								break;
						}
					}
				});

				return ( 
					sectorsObj = {
						energy: energy, 
						marikadas: miscellaneous,
						capitalGoods: capitalGoods,
						consumerNonDurables: consumerNonDurables, 
						utilities: utilities,
						consumerDurables: consumerDurables,
						consumerService: consumerService,
						industrial: industrial,
						technology: technology,
						finance: finance,
						healthcare: healthCare
					}		 		 
				);
			};
		}

	}
