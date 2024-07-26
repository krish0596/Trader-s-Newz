import React, { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Chart = () => {
  useEffect(() => {
    // Fetch stock data from your API here and format it for Highcharts
    const stockData = [
      [1, 10],
      [2, 20],
      [3, 15],
      [78,34],
      [79,1]
    ];

    // Create the Highcharts configuration object
    const options = {
      title: {
        text: "Stock Price Chart",
      },
      series: [
        {
          type: "line",
          data: stockData,
        },
      ],
    };

    // Render the Highcharts chart
    Highcharts.chart("stock-chart", options);
  }, []);

  return <div id="stock-chart"></div>;
};

export default Chart;
