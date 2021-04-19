const URL = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';


document.addEventListener('DOMContentLoaded', function () {
    const w = 1000,
        h = 250;

    const svg = d3.select('#chart')
        .append('svg')
        .attr('width', w)
        .attr('height', h)

    const req = new XMLHttpRequest();
    req.open("GET", URL, true);
    req.send();
    req.onload = function () {
        const json = JSON.parse(req.responseText);
        const data = json.data
        console.log(data)
    };
})

