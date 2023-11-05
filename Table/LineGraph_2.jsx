import React, { useEffect, useState, useRef } from "react";

const LineGraph = () => {
  const canvasRef = useRef(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://example.com/api/data");
      const json = await response.json();
      setData(json);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const labels = data.map((item) => item.date);
      const values = data.map((item) => item.value);

      // Set canvas dimensions
      canvas.width = 600;
      canvas.height = 400;

      // Set line style
      ctx.strokeStyle = "#36a2eb";
      ctx.lineWidth = 2;

      // Draw x-axis
      ctx.beginPath();
      ctx.moveTo(50, 350);
      ctx.lineTo(550, 350);
      ctx.stroke();

      // Draw y-axis
      ctx.beginPath();
      ctx.moveTo(50, 50);
      ctx.lineTo(50, 350);
      ctx.stroke();

      // Draw line graph
      ctx.beginPath();
      for (let i = 0; i < values.length; i++) {
        const x = i * 50 + 50;
        const y = 350 - (values[i] / 10) * 300;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Draw x-axis labels
      for (let i = 0; i < labels.length; i++) {
        const x = i * 50 + 50;
        const y = 365;
        ctx.fillText(labels[i], x, y);
      }
    }
  }, [data]);

  return (
    <div>
      <h2>Line Graph</h2>
      {loading ? <div>Loading data...</div> : <canvas ref={canvasRef} />}
    </div>
  );
};

export default LineGraph;
