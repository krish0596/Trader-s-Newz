// src/utils/chartModule.js
import { createChart } from "lightweight-charts";

const createAndUpdateChart = (container) => {
  const chart = createChart(container);

  const areaSeries = chart.addAreaSeries();
  areaSeries.setData([{ time: "2018-12-31", value: 22.67 }]);

  const candlestickSeries = chart.addCandlestickSeries();
  candlestickSeries.setData([
    {
      time: "2018-12-31",
      open: 109.87,
      high: 114.69,
      low: 85.66,
      close: 111.26,
    },
  ]);

  // Update the most recent bar
  areaSeries.update({ time: "2018-12-31", value: 25 });
  candlestickSeries.update({
    time: "2018-12-31",
    open: 109.87,
    high: 114.69,
    low: 85.66,
    close: 112,
  });

  // Create a new bar
  areaSeries.update({ time: "2019-01-01", value: 20 });
  candlestickSeries.update({
    time: "2019-01-01",
    open: 112,
    high: 112,
    low: 100,
    close: 101,
  });

  return chart;
};

export default createAndUpdateChart;
