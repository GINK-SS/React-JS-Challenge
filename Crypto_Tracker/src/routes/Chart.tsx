import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  const chartData = data?.map((price) => {
    return {
      x: new Date(price.time_close),
      y: [price.open, price.high, price.low, price.close],
    };
  });
  console.log(chartData);
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        // <ApexChart
        //   type="line"
        //   series={[
        //     {
        //       name: "Price",
        //       data: data?.map((price) => price.close) ?? [],
        //     },
        //   ]}
        //   options={{
        //     theme: {
        //       mode: "dark",
        //     },
        //     chart: {
        //       height: 300,
        //       width: 500,
        //       toolbar: {
        //         show: false,
        //       },
        //       background: "transparent",
        //     },
        //     grid: {
        //       show: false,
        //     },
        //     stroke: {
        //       curve: "smooth",
        //       width: 4,
        //     },
        //     yaxis: {
        //       show: false,
        //     },
        //     xaxis: {
        //       labels: { show: false, datetimeFormatter: { month: "mmm 'yy" } },
        //       axisTicks: { show: false },
        //       axisBorder: { show: false },
        //       type: "datetime",
        //       categories: data?.map((price) =>
        //         new Date(parseInt(price.time_close) * 1000).getTime()
        //       ),
        //     },
        //     fill: {
        //       type: "gradient",
        //       gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
        //     },
        //     colors: ["#0fbcf9"],
        //     tooltip: {
        //       y: {
        //         formatter: (value) => `$${value.toFixed(2)}`,
        //       },
        //     },
        //   }}
        // />
        <ApexChart
          type="candlestick"
          series={[
            {
              data: chartData ?? [],
            },
          ]}
          options={{
            colors: ["#eee", "#eee", "#eee", "#eee"],
            chart: {
              height: 700,
              width: 700,
              toolbar: { show: false },
            },
            xaxis: {
              labels: { show: false, datetimeFormatter: { month: "mmm 'yy" } },
            },
            yaxis: {
              show: false,
            },
            tooltip: {
              enabled: false,
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
