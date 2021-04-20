const URL = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';


document.addEventListener('DOMContentLoaded', function () {
    const w = 950,
        h = 500,
        padding = 30;

    const svg = d3.select('body')
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
        console.log(dataset)
        // ***************************************************
        //REFINE DATA AND CREATE SCALES
        // ==========X-Scale===========
        let dates = dataset.map(function (d) {
            // return d[0].substr(0, 4)
            return new Date(d[0]);
        }),
            // xMax = d3.max(dates),
            xMin = d3.min(dates);
        var xMax = new Date(d3.max(dates));
        //add a few more months to max so x-axis ends a little after last bar graph--aesthetic purposes basically       
        xMax.setMonth(xMax.getMonth() + 3);

        const xScale = d3.scaleTime()
            .domain([xMin, xMax])
            .range([padding, w - padding]);

        // ==========X-Scale===========
        const yScale = d3.scaleLinear()
            .domain([0, dataset[dataset.length - 1][1]])
            .range([h, 0])
        // ***************************************************
        // create bars
        svg.selectAll('rect')
            .data(dataset)
            .enter()
            .append('rect')
            .attr("x", (d, i) => xScale(dates[i]))
            // .attr("x", (d, i) => xScale(d[0].substr(0, 4)))
            .attr("y", (d, i) => h - d[1] / 40)
            .attr("width", 3)
            .attr("height", (d) => d[1] / 40)
            .attr('class', 'bar')

        // add Axes
        const xAxis = d3.axisBottom(xScale);
        svg.append('g')
            .attr("transform", "translate(0, " + (h - padding) + ")")
            .call(xAxis)
            .attr('id', 'x-axis');
    };


})

