import { useEffect } from "react";
import Chart from "chart.js";
function LineChart({ labels, datasets }: { labels: string[], datasets: any[] }) {
  useEffect(() => {
    var ctx = document.getElementById("myChart") as HTMLCanvasElement | null;
    if (ctx) {
      var context = ctx.getContext("2d");
      if (context) {
        var myChart = new Chart(context, {
          type: "line",
          data: {
            labels: labels,
            datasets: datasets,
          },
        });
      }
    }
  }, [labels, datasets]);

  return (
    <div className="linechart-container">
      <div className="linechart">
        <canvas id="myChart"></canvas>
      </div>
    </div>
  );
}

export default LineChart;
