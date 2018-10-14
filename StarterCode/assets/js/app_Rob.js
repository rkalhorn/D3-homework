// @TODO: YOUR CODE HERE!
// read the data from the csv file 

// set up the defalut views for x and y on page load
var xView = "poverty";
var yView = "obesity";

d3.csv(".\\assets\\data\\data.csv").then(function(dataset){
        
        showVisual(dataset, xView, yView); 
        
});

// Create the svg canvas height and width 

var svgHeight = 500;
var svgWidth = 900; 

// margins to move your svg to the down and to the right 

var margin = {
    top: 50, 
    right: 50,
    bottom: 20, 
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
          .attr("tranform", `translate( ${margin.left}, ${margin.top})`);


function showVisual(data, xView, yView){

    data.map(d =>{
       // I've only cleans a small sample of the data. 
       // you will need to handle the rest
        data.poverty = +d[xView];
        data.obesity = +d[yView];
        
    });

 // we need to get the min and max of x & y in the dataset to pass to .domain()
var xValues  = data.map(d => parseFloat(d[xView]));
var yValues  = data.map(d => parseFloat(d[yView])); 


// use extent to grab the min and max of the selected Scale and Axis
var xScale = d3.scaleLinear()
            .domain([0,d3.max(xValues)])
            .range([0, width]);

var yScale = d3.scaleLinear()
            .domain([0,d3.max(yValues)])
            .range([height, 0]); 


// Add the x & y Axis
var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);


// add the x & y scales to the index.html <svg> tag 
svg.append("g")
        .attr("class", "xAxis")
        .attr("transform", `translate(${margin.left},  ${height + margin.top})`)
        .call(xAxis);

svg.append("g")
        .attr("class", "yAxis")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .call(yAxis);

// Create the <circle></circle> element 

var scatter = svg.selectAll("circles")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => xScale( d[xView] )-margin.left)
            .attr("cy", d => yScale( d[yView] ))
            .attr("r", 10);

/* data[xView] is the scale that will be 
    updated on click. You will need to update the bubbles with:

    1. Text for state abbr      
    2. Event Handlers 
    3. Labels that the user will click to update the chart 
    4. colors for bubbles and abbr state letters

  */                   
 console.log("data", data[xView]);

}