// Create the svg canvas height and width
var svgHeight = 500;
var svgWidth = 900; 

// margins to move your svg to the down and to the right 
var margin = {
    top: 50, 
    right: 150,
    bottom: 50, 
    left: 50
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

var tooltip = d3.select("#scatter").append("div")
                .attr("class", "tooltip");
                

//Set up initial scatterplot
var xVar = "income";
var yVar = "healthcare";

yLabel = "Lacks Healthcare (%)";
xLabel = "Household Income (median)";

d3.csv("./assets/data/data.csv").then(function(csvData){
    
    var data = [];
    csvData.forEach(function(element){
        data.push([+element[xVar],+element[yVar],element["state"], element["abbr"]]);
    });
    
    displayData(data, xVar, yVar, xLabel, yLabel);
});




function displayData(dataSet, xVar, yVar, xLabel, yLabel) {

    //Set up x-axis and y-axis

    //Note: that d3.extent returns [min, max] of the values passed. .domain specifies the input range
    //then .range takes the output interval. In others we map the domain interval onto the range interval
    //if this is in d3.scaleLinear() this is done as a linear map.
    //instead we will use max, so as not to skew the visualization by not including zero.
    
    var xValues = d3.extent(dataSet.map(element => element[0]));
    var xPadding = (xValues[1]-xValues[0])/25;

    var xScale = d3.scaleLinear()
                //.domain([0,d3.max(dataSet.map(element => element[0]))])
                .domain([xValues[0]-xPadding, xValues[1]+xPadding])
                .range([0, width]); 
    var xAxis = d3.axisBottom(xScale);
    
    var yValues = d3.extent(dataSet.map(element => element[1]));
    var yPadding = (yValues[1]-yValues[0])/15;
    
    var yScale = d3.scaleLinear()
                //.domain([,d3.max(dataSet.map(element => element[1]))])
                .domain([yValues[0]-yPadding, yValues[1]+yPadding])
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
    
    svg.selectAll("circles")
        .data(dataSet)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d[0])+margin.left)
        .attr("cy", d => yScale(d[1])+margin.top)
        .attr("r", 15)
        .attr("class", "circle")
        .on("click", function(d) {
            tooltip.transition()
                .duration(200)
                .style("margin-left", "5px");
            tooltip.html(`${d[2]}</br>${xVar}: $${d[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} <br/>
                ${yVar}: ${d[1]}%`)
                .style("left", d3.select(this).attr("cx")  + "px")
                .style("top", d3.select(this).attr("cy")  + "px");
        });


    svg.append("g").selectAll("text")
        .data(dataSet)
        .enter()
        .append("text")
        .attr("x", d => xScale(d[0])+margin.left)
        .attr("y", d => yScale(d[1])+margin.top+2)
        .attr("font-size", 10)
        .attr("text-anchor", "middle")
        .attr("class", "circle-text")
        .text( d => d[3] );

    // y axis
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -45+margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .classed("aText", true)
        .text(yLabel);

    // x axis
    svg.append("text")
        .attr("y", height + margin.top+20)
        .attr("x", margin.left+width / 2)
        .attr("dy", "1em")
        .classed("aText", true)
        .text(xLabel);
}

    
//Data Information:
//var keys = ["abbr", "age", "ageMoe", "healthcare", "healthcareHigh", "healthcarLow", "id", "income", "incomeMoe", "obesity", 
//"obesityHigh", "obesityLow", "poverty", "povertyMoe", "smokes", "smokesHigh", "smokesLow", "state"];
//var axisLabels = ["abbr", "Age (Median)", "Lacks-Healthcare(%)", "Household Income (Median)", "Obese (%)", "In Poverty (%)", "Smokes (%)"];





