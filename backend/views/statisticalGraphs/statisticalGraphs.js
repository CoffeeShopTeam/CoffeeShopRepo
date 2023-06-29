const productsElement = document.getElementById("products");
const productsString = productsElement.getAttribute("data-products");
const products = JSON.parse(productsString);

console.log(products);

function createChart(products) {
  // Use D3.js to create the chart

  // Example: Create a bar chart
  const svg = d3.select("#chartContainer").append("svg").attr("width", 500).attr("height", 300);

  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const width = +svg.attr("width") - margin.left - margin.right;
  const height = +svg.attr("height") - margin.top - margin.bottom;

  const x = d3.scaleBand().rangeRound([0, width]).padding(0.2);

  const y = d3.scaleLinear().rangeRound([height, 0]);

  const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  svg
    .append("text")
    .attr("class", "chart-title")
    .attr("x", width / 2)
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .text("Number of Products by Price");

  x.domain(products.map((product) => product.productPrice));
  y.domain([0, d3.max(products, (product) => product.count)]);

  g.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x)).selectAll("text").attr("y", 0).attr("x", 9).attr("dy", ".35em").attr("transform", "rotate(90)").style("text-anchor", "start");

  g.append("g").call(d3.axisLeft(y)).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", "0.71em").attr("text-anchor", "end").text("Count");

  g.selectAll(".bar")
    .data(products)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d) => x(d.productPrice))
    .attr("y", (d) => y(d.count))
    .attr("width", x.bandwidth())
    .attr("height", (d) => height - y(d.count))
    .attr("fill", "steelblue");
}

createChart(products);
