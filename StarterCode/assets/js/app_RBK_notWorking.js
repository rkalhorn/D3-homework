// Create the svg canvas height and width
var svgHeight = 500;
var svgWidth = 900; 

// margins to move your svg to the down and to the right 
var margin = {
    top: 50, 
    right: 50,
    bottom: 50, 
    left: 50
}

 var padding = {
    top: 10,
    right: 10,
    left: 10,
    bottom: 10
 }

// Adjust your svg position 
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Append svg to the index.html 
var svg = d3.select("#scatter")
          .append("svg")
          .attr("width", width+margin.left+margin.right)
          .attr("height", height+margin.bottom+margin.top) 
          .attr("class", "scatter")
          .append("g")
          .attr("tranform", `translate(${margin.left}, ${margin.top})`);



//Set up initial scatterplot
var xVar = "income";
var yVar = "healthcare";


d3.csv("./assets/data/data.csv").then(function(csvData){
    var xDataSet = [];
    var yDataSet = [];
    var dataSet = [];

    csvData.forEach(function(element){
        dataSet.push([+element[xVar],+element[yVar]]);
        xDataSet.push(+element[xVar]);
        yDataSet.push(+element[yVar]);
    });

    //Set up x-axis and y-axis

    //Note: that d3.extent returns [min, max] of the values passed. .domain specifies the input range
    //then .range takes the output interval. In others we map the domain interval onto the range interval
    //if this is in d3.scaleLinear() this is done as a linear map.
    //instead we will use max, so as not to skew the visualization by not including zero.
    var xScale = d3.scaleLinear()
                .domain([0,d3.max(xDataSet)])
                .range([0, width]); 
    var xAxis = d3.axisBottom(xScale);
    
    var yScale = d3.scaleLinear()
                .domain([0,d3.max(yDataSet)])
                .range([height, 0]);
    var yAxis = d3.axisLeft(yScale);

    svg.append("g")
        .attr("class", "xAxis")
        .attr("transform", `translate(${margin.left},  ${margin.top+height})`)
        .call(xAxis);
  
    svg.append("g")
        .attr("class", "yAxis")
        .attr("transform", `translate(${margin.left},${margin.top})`)
        .call(yAxis);
    
    var scatter = svg.selectAll("circles")
         .data(dataSet)
         .enter()
         .append("circle")
         .attr("cx", function(d){return d[0]})
         .attr("cy", function(d){return d[1]})
         .attr("r", 10);


});


// don't want dots overlapping axis, so add in buffer to data domain
//   xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
//   yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);

//   // x-axis
//   svg.append("g")
//       .attr("class", "x axis")
//       .attr("transform", "translate(0," + height + ")")
//       .call(xAxis)
//     .append("text")
//       .attr("class", "label")
//       .attr("x", width)
//       .attr("y", -6)
//       .style("text-anchor", "end")
//       .text("Calories");

//   // y-axis
//   svg.append("g")
//       .attr("class", "y axis")
//       .call(yAxis)
//     .append("text")
//       .attr("class", "label")
//       .attr("transform", "rotate(-90)")
//       .attr("y", 6)
//       .attr("dy", ".71em")
//       .style("text-anchor", "end")
//       .text("Protein (g)");

//   // draw dots
//   svg.selectAll(".dot")
//       .data(data)
//     .enter().append("circle")
//       .attr("class", "dot")
//       .attr("r", 3.5)
//       .attr("cx", xMap)
//       .attr("cy", yMap)
//       .style("fill", function(d) { return color(cValue(d));}) 
//       .on("mouseover", function(d) {
//           tooltip.transition()
//                .duration(200)
//                .style("opacity", .9);
//           tooltip.html(d["Cereal Name"] + "<br/> (" + xValue(d) 
// 	        + ", " + yValue(d) + ")")
//                .style("left", (d3.event.pageX + 5) + "px")
//                .style("top", (d3.event.pageY - 28) + "px");
//       })
//       .on("mouseout", function(d) {
//           tooltip.transition()
//                .duration(500)
//                .style("opacity", 0);
//       });



var dataset = []; 
var keys = ["abbr", "age", "ageMoe", "healthcare", "healthcareHigh", "healthcarLow", "id", "income", "incomeMoe", "obesity", 
"obesityHigh", "obesityLow", "poverty", "povertyMoe", "smokes", "smokesHigh", "smokesLow", "state"];
//var axisLabels = ["abbr", "Age (Median)", "Lacks-Healthcare(%)", "Household Income (Median)", "Obese (%)", "In Poverty (%)", "Smokes (%)"];

d3.csv("./assets/data/data.csv").then(function(csvData){
    dataset = csvData;

});


function init(){

}




// // setup x 
// var

// // setup y
// var yValue = function(d) { return d["Protein (g)"];}, // data -> value
//     yScale = d3.scale.linear().range([height, 0]), // value -> display
//     yMap = function(d) { return yScale(yValue(d));}, // data -> display
//     yAxis = d3.svg.axis().scale(yScale).orient("left");

// // setup fill color
// var cValue = function(d) { return d.Manufacturer;},
//     color = d3.scale.category10();

// // add the graph canvas to the body of the webpage
// var svg = d3.select("body").append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// // add the tooltip area to the webpage
// var tooltip = d3.select("body").append("div")
//     .attr("class", "tooltip")
//     .style("opacity", 0);

// // load data
// d3.csv("cereal.csv", function(error, data) {

//   // change string (from CSV) into number format
//   data.forEach(function(d) {
//     d.Calories = +d.Calories;
//     d["Protein (g)"] = +d["Protein (g)"];
// //    console.log(d);
//   });

//   

//   // draw legend
//   var legend = svg.selectAll(".legend")
//       .data(color.domain())
//     .enter().append("g")
//       .attr("class", "legend")
//       .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

//   // draw legend colored rectangles
//   legend.append("rect")
//       .attr("x", width - 18)
//       .attr("width", 18)
//       .attr("height", 18)
//       .style("fill", color);

//   // draw legend text
//   legend.append("text")
//       .attr("x", width - 24)
//       .attr("y", 9)
//       .attr("dy", ".35em")
//       .style("text-anchor", "end")
//       .text(function(d) { return d;})
// });
