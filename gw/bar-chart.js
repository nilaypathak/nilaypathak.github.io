var w = 200;
var h = 100;

var dataset = [ 1,3,2,5,7,8,9,10,13,17 ];

var xScale = d3.scaleBand()
			.domain(d3.range(dataset.length))
			.rangeRound([0, w])
			.paddingInner(0.08);

var yScale = d3.scaleLinear()
			.domain([0, d3.max(dataset)])
			.range([0, h]);

//Create SVG element
var svg3 = d3.select("#bar-chart")
		.append("svg")
		.attr("width", w)
		.attr("height", h);


//Create bars
svg3.selectAll("rect")
.data(dataset)
.enter()
.append("rect")
.attr("x", function(d, i) {
		return xScale(i);
})
.attr("y", function(d) {
		return h - yScale(d);
})
.attr("width", xScale.bandwidth())
.attr("height", function(d) {
		return yScale(d);
})
.attr("fill", function(d) {
	return "rgb(0, 0, " + Math.round(d * 10) + ")";
});

//Create labels
svg3.selectAll("text")
.data(dataset)
.enter()
.append("text")
.text(function(d) {
		return d;
})
.attr("text-anchor", "middle")
.attr("x", function(d, i) {
		return xScale(i) + xScale.bandwidth() / 2;
})
.attr("y", function(d) {
    if(yScale(d)<=15) {
        return h - yScale(d) - 2;
    }else{
        return h - yScale(d) + 14;
    }
})
.attr("font-family", "sans-serif")
.attr("font-size", "11px")
.attr("fill", function (d) {
   if(yScale(d)<=15){
       return "black"
   }else{
       return "white";
   }
});
//         svg.append("g")
	  //     .attr("transform", "translate(0," + h + ")")
	  //     .call(d3.axisBottom(xScale));

	  // // text label for the x axis
	  // svg.append("text")             
	  //     .attr("transform",
	  //           "translate(" + (w/2) + " ," + 
	  //                          (h + 20) + ")")
	  //     .style("text-anchor", "middle")
	  //     .text("Date");

	  // // Add the y Axis
	  // svg.append("g")
	  //     .call(d3.axisLeft(yScale));

	  // // text label for the y axis
	  // svg.append("text")
	  //     .attr("transform", "rotate(-90)")
	  //     .attr("y", 0)
	  //     .attr("x",0 - (h / 2))
	  //     .attr("dy", "1em")
	  //     .style("text-anchor", "middle")
	  //     .text("Value"); 
// var xAxis = d3.axisBottom()                                    
//     .scale(xScale); 
// svg.append('g')
// .attr('class', 'xaxis')
// .attr('transform', 'translate(0,' + h + ')')
// .call(xAxis);


//On click, update with new data
update_bar_chart=()=> {

    //New values for dataset
    

    var numValues = dataset.length;						//Count original length of dataset
    dataset = [];  						 				//Initialize empty array
    var maxValue = 10;
    for (var i = 0; i < numValues; i++) {				//Loop numValues times
        var newNumber = Math.floor(Math.random() * maxValue); //New random integer (0-24)
        dataset.push(newNumber);			 			//Add new number to array
    }

    yScale.domain([0, d3.max(dataset)]);

    //Update all rects
    svg3.selectAll("rect")
        .data(dataset)
		.transition()
        .delay(function(d, i) {
            return i * 10;
        })
		.duration(500)
		.ease(d3.easeSin)
        .attr("y", function(d) {
            return h - yScale(d);
        })
        .attr("height", function(d) {
            return yScale(d);
        })
        .attr("fill", function(d) {
        	console.log(d)
            return getDensityColor(d);
        });



    //Update all labels
    svg3.selectAll("text")
        .data(dataset)
        .transition()								// <-- Now with
        .delay(function(d, i) {
            return i * 10;
        })
        .duration(500)
		.ease(d3.easeSin)
			.text(function(d) {
            return d;
        })
        .attr("x", function(d, i) {
            return xScale(i) + xScale.bandwidth() / 2;
        })
        .attr("y", function(d) {
            if(yScale(d)<=15) {
                return h - yScale(d) - 2;
            }else{
                return h - yScale(d) + 14;
			}
        })
        .attr("fill", function (d) {
            if(yScale(d)<=15){
                return "black"
            }else{
                return "white";
            }
        });
};