const URL = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';


document.addEventListener('DOMContentLoaded', function () {
    const w = 950,
        h = 500,
        padding = 60;

    const svg = d3.select('#chart')
        .append('svg')
        .attr('width', w)
        .attr('height', h)

    // make request to API for data
    const req = new XMLHttpRequest();
    req.open("GET", URL, true);
    req.send();
    req.onload = function () {
        const json = JSON.parse(req.responseText);
        const dataset = json.data
        // console.log(dataset[dataset.length - 1][0])

        // ***************************************************
        //REFINE DATA AND CREATE SCALES

        // ==========X-Scale=========== \\
        const dates = dataset.map(function (d) {
            return new Date(d[0]);
        }),
            xMin = d3.min(dates),
            xMax = new Date(d3.max(dates));

        //add a few more months to max so x-axis ends a little after last bar graph--aesthetic purposes basically       
        xMax.setMonth(xMax.getMonth() + 3);
        const xScale = d3.scaleTime()
            .domain([xMin, xMax])
            .range([padding, w - padding]);


        // ==========Y-Scale=========== \\
        const GDP = dataset.map(d => (d[1])),
            maxGDP = d3.max(GDP),
            yScale = d3.scaleLinear().domain([0, maxGDP]).range([0, h - padding]),
            scaledGDP = GDP.map(entry => (yScale(entry)));

        // ***************************************************
        // CREATE BARS
        svg.selectAll('rect')
            .data(scaledGDP)
            .enter()
            .append('rect')
            .attr('data-date', (d, i) => dataset[i][0])
            .attr('data-gdp', (d, i) => dataset[i][1])
            .attr("x", (d, i) => xScale(dates[i]))
            .attr("y", (d, i) => h - (d + padding))
            .attr("width", 3)
            .attr("height", (d) => d)
            .attr('class', 'bar')
            // .append("title")
            // .text(d => d)





        // ***************************************************
        // ADD AXES
        const xAxis = d3.axisBottom(xScale);
        svg.append('g')
            .attr("transform", `translate(0, ${h - padding})`)
            .call(xAxis)
            .attr('id', 'x-axis');

        const yAxisScale = d3.scaleLinear().domain([0, maxGDP]).range([h - padding, 0]);
        const yAxis = d3.axisLeft(yAxisScale);
        svg.append('g')
            .attr('transform', `translate(${padding}, 0)`)
            .call(yAxis)
            .attr('id', 'y-axis')


        // ***************************************************
        //ADD TOOLTIP
const tooltip = d3.select('#chart')
.append('div')
.attr('id', 'tooltip')
// .style("position", "absolute")
.style("visibility", "hidden")
.text('Hello')

// d3.select("#tooltip")
//   .on("mouseover", function(){return tooltip.style("visibility", "visible");})
//   .on("mousemove", function(){return tooltip.style("top", (event.pageY-800)+"px").style("left",(event.pageX-800)+"px");})
//   .on("mouseout", function(){return tooltip.style("visibility", "hidden");});



    };
})

