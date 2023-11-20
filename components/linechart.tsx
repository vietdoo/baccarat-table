import { useEffect } from "react";
import Chart from "chart.js";

function LineChart({ labels, datasets }) {
  useEffect(() => {
    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: datasets,
      },
    });
  }, [labels, datasets]); // Sử dụng labels và datasets là dependencies để cập nhật khi chúng thay đổi

  return (
    <div className="linechart-container">
      <div className="linechart">
        <canvas id="myChart"></canvas>
      </div>
    </div>
  );
}

export default LineChart;
