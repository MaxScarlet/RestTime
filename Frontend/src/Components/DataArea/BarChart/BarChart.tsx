import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./BarChart.css"
interface BarChartProps {
  data: string[];
  labels: string[];
}

const BarChart: React.FC<BarChartProps> = ({ data, labels }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels,
            datasets: [
              {
                label: "Bar Chart Example",
                data: data.map((item) => parseFloat(item)), 
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          },
        });
      }
    }
  }, [data, labels]);

  return <canvas ref={chartRef} className="barChart"/>;
};

export default BarChart;
