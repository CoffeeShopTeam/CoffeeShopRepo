const productsElement = document.getElementById("products");
const productsString = productsElement.getAttribute("data-products");
const products = JSON.parse(productsString);

const usersElement = document.getElementById("users");
const usersString = usersElement.getAttribute("data-users");
const users = JSON.parse(usersString);

function createPieChart(users) {
  const countries = users.map((user) => user.country);

  const counts = {};
  countries.forEach((country) => {
    if (counts[country]) {
      counts[country]++;
    } else {
      counts[country] = 1;
    }
  });

  const pieData = Object.keys(counts).map((country) => ({
    label: country,
    value: counts[country],
  }));

  const width = 300;
  const height = 300;
  const radius = Math.min(width, height) / 2;

  const container = d3.select("#pieChartContainer");
  const legendContainer = d3.select("#legendContainer");

  const svg = container
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  const colorScale = d3.scaleOrdinal().range(["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff", "#ff8000", "#8000ff", "#00ff80", "#ff0080"]);

  const pie = d3
    .pie()
    .value((d) => d.value)
    .sort(null);

  const arc = d3.arc().innerRadius(0).outerRadius(radius);

  const slices = svg
    .selectAll("path")
    .data(pie(pieData))
    .enter()
    .append("path")
    .attr("d", arc)
    .attr("fill", (d, i) => colorScale(i));

  slices
    .append("text")
    .attr("transform", (d) => `translate(${arc.centroid(d)})`)
    .attr("dy", "0.35em")
    .text((d) => d.data.label)
    .style("text-anchor", "middle");

  const legend = legendContainer.append("svg").attr("width", width).attr("height", 40);

  const legendItem = legend
    .selectAll("g")
    .data(pieData)
    .enter()
    .append("g")
    .attr("transform", (d, i) => `translate(${i * 100}, 0)`);

  legendItem
    .append("rect")
    .attr("width", 18)
    .attr("height", 18)
    .attr("fill", (d, i) => colorScale(i));

  legendItem
    .append("text")
    .attr("x", 24)
    .attr("y", 12)
    .attr("dy", "0.35em")
    .text((d) => `${d.label} (${d.value})`);
}

function createBarChart(products) {
  // Extract the category and count information from the products
  const categories = [];
  const counts = [];

  products.forEach((product) => {
    const category = product.productCategory;
    const index = categories.indexOf(category);
    if (index !== -1) {
      counts[index] += product.productQuantity;
    } else {
      categories.push(category);
      counts.push(product.productQuantity);
    }
  });

  // Set up the chart dimensions
  const width = 400;
  const height = 360;
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const container = d3.select("#barChartContainer");

  // Create the SVG element
  const svg = container.append("svg").attr("width", width).attr("height", height);

  // Create the chart container
  const chartContainer = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

  const xScale = d3.scaleBand().domain(categories).range([0, innerWidth]).padding(0.1);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(counts)])
    .range([innerHeight, 0]);

  // Create the x-axis
  const xAxis = d3.axisBottom(xScale);

  // Create the y-axis
  const yAxis = d3.axisLeft(yScale).ticks(5);

  // Append the x-axis to the chart
  chartContainer.append("g").attr("transform", `translate(0, ${innerHeight})`).call(xAxis);

  // Append the y-axis to the chart
  chartContainer.append("g").call(yAxis);

  // Create the bars
  chartContainer
    .selectAll("rect")
    .data(counts)
    .enter()
    .append("rect")
    .attr("x", (d, i) => xScale(categories[i]))
    .attr("y", (d) => yScale(d))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => innerHeight - yScale(d))
    .attr("fill", "steelblue");
}

createBarChart(products);

createPieChart(users);
