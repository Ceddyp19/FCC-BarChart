const URL = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';


document.addEventListener('DOMContentLoaded', function () {
    const w = 2000,
        h = 500,
        padding = 30;

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
        // console.log(dataset[dataset.length - 1][1])


        //create scales
        // const xScale = d3.scaleLinear()
        // .domain([dataset[0][0], dataset[dataset.length - 1][0]])
        // .range(padding, w - padding)


        const yScale = d3.scaleLinear()
            .domain([0, dataset[dataset.length - 1][1]])
            .range([h - padding, padding])

        // create bars
        svg.selectAll('rect')
            .data(dataset)
            .enter()
            .append('rect')
            .attr("x", (d, i) => i * 18)
            .attr("y", (d, i) => h - (d[1]))
            .attr("width", 15)
            .attr("height", (d, i) => d[1]);
    };


})

