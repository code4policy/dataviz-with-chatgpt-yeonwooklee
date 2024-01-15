document.addEventListener('DOMContentLoaded', function () {
  // Fetching data from the CSV file
  fetch('311_boston_data.csv')
    .then(response => response.text())
    .then(csvData => {
      const data = processData(csvData);
      createHorizontalBarChart(data);
    })
    .catch(error => console.error('Error fetching CSV file:', error));
});

function processData(csvData) {
  const rows = csvData.split('\n').slice(1); // Remove header row
  const reasons = [];
  const counts = [];

  rows.forEach(row => {
    const columns = row.split(',');
    const reason = columns[0].trim();
    const count = parseInt(columns[1]);

    reasons.push(reason);
    counts.push(count);
  });

  // Sorting data by count in descending order
  const sortedIndices = counts.map((_, i) => i).sort((a, b) => counts[b] - counts[a]);

  return {
    labels: sortedIndices.slice(0, 10).map(i => reasons[i]),
    data: sortedIndices.slice(0, 10).map(i => counts[i]),
  };
}

function createHorizontalBarChart(data) {
  const ctx = document.getElementById('barChart').getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.labels,
      datasets: [{
        data: data.data,
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      indexAxis: 'y', // Set indexAxis to 'y' for horizontal bar chart
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            font: {
              size: 16 // Adjust the font size for the x-axis (bottom)
            }
          }
        },
        y: {
          ticks: {
            font: {
              size: 16 // Adjust the font size for the y-axis (left)
            }
          }
        }
      },
      plugins: {
        legend: {
          display: false // Set display to false to hide the legend
        }
      }
    }
  });

  // Adjust the font size for chart source
  const chartSource = document.querySelector('.chart-source');
  if (chartSource) {
    chartSource.style.fontSize = '16px'; // Adjust the font size as needed
  }
}
