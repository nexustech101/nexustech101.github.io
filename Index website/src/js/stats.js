document.addEventListener("DOMContentLoaded", function () {
  // GitHub API URL for the repository
  const apiUrl = "https://api.github.com/repos/nexustech101/drawing-app";

  // Fetch repository stats
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const ctx = document.getElementById("repoStatsChart").getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Stars", "Forks", "Watchers", "Issues", "Pull Requests"],
          datasets: [
            {
              label: "Count",
              data: [
                data.stargazers_count,
                data.forks_count,
                data.watchers_count,
                data.open_issues_count,
                0,
              ], // Note: Pull Requests need to be fetched separately
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 205, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(54, 162, 235, 0.2)",
              ],
              borderColor: [
                "rgb(255, 99, 132)",
                "rgb(255, 159, 64)",
                "rgb(255, 205, 86)",
                "rgb(75, 192, 192)",
                "rgb(54, 162, 235)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});
