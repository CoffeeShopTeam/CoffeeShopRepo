const productsElement = document.getElementById("products");
const productsString = productsElement.getAttribute("data-products");
const products = JSON.parse(productsString);

const usersElement = document.getElementById("users");
const usersString = usersElement.getAttribute("data-users");
const users = JSON.parse(usersString);

// console.log(products);
console.log(users);

function createPieChart(users) {
  // Extract the country from each user
  const countries = users.map((user) => user.country);

  // Count the occurrences of each country
  const counts = {};
  countries.forEach((country) => {
    if (counts[country]) {
      counts[country]++;
    } else {
      counts[country] = 1;
    }
  });

  // Convert the counts object into an array of objects
  const pieData = Object.keys(counts).map((country) => ({
    label: country,
    value: counts[country],
  }));

  // Set up the chart dimensions
  const width = 400;
  const height = 400;
  const radius = Math.min(width, height) / 2;

  // Select the container element
  const container = d3.select("#pieChartContainer");
  const legendContainer = d3.select("#legendContainer");

  // Create the SVG element within the container
  const svg = container
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  // Define the color scale
  // Define a custom color scale
  const colorScale = d3.scaleOrdinal().range(["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff", "#ff8000", "#8000ff", "#00ff80", "#ff0080"]);

  // Generate the pie chart layout
  const pie = d3
    .pie()
    .value((d) => d.value)
    .sort(null);

  // Generate the arc shapes based on the data
  const arc = d3.arc().innerRadius(0).outerRadius(radius);

  // Generate the pie chart slices
  const slices = svg
    .selectAll("path")
    .data(pie(pieData))
    .enter()
    .append("path")
    .attr("d", arc)
    .attr("fill", (d, i) => colorScale(i));

  // Add labels to the slices
  slices
    .append("text")
    .attr("transform", (d) => `translate(${arc.centroid(d)})`)
    .attr("dy", "0.35em")
    .text((d) => d.data.label)
    .style("text-anchor", "middle");

  // Add legend at the bottom
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

createPieChart(users);
