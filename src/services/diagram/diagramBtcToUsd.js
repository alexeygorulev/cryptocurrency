import Chart from 'chart.js/auto';


export function myChartBtcToUsd() {
  let myChart = null
  const ctx = document.getElementById('myChartBtcToUsd').getContext("2d");

let delayed;

let gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, 'rgba(22, 199, 132, 0.6)');
gradient.addColorStop(0.5, 'rgba(22, 199, 132, 0.15)');
gradient.addColorStop(1, 'rgba(22, 199, 132, 0)');


const labels = [
"17-05.2022",
"16-05.2022",
"15-05.2022",
"14-05.2022",
"13-05.2022",
"12-05.2022",
"11-05.2022",
"10-05.2022",
"09-05.2022",
"08-05.2022",
"07-05.2022",
"06-05.2022",
]
const data = {
labels,
datasets: [
{
  data: [
    29923.60,
    29924.04,
    29930.23,
    29923.23,
    29956.21,
    29923.05,
    29921.78,
    29901.02,
    29921.10,
    29940.12,
    29912.05,
    29929.30
  ],
  label: 'BTC to USD',
  fill: true,
  backgroundColor: gradient,
  borderColor: 'rgba(22, 199, 132, 1)',
  borderWidth: 1.3,
  pointBackgroundColor: 'rgba(22, 199, 132, 0.3)',
  pointBorderColor: 'rgba(22, 199, 132, 1)',
  tension: 0.05,
  animation: {
    onComplete: () => {
      delayed = true;
    },
    delay: (context) => {
      let delay = 0;
      if (context.type === "data" && context.mode === "default" && !delayed) {
        delay = context.dataIndex * 400 + context.datasetIndex * 100;
      }
      return delay
    },
  },
},
]
};
const config = {
  type: 'line',
  data: data,
  options: {
    maintainAspectRatio: false,
    pointHoverRadius: 5,
    radius: 4,
    },
  };

  if (myChart != null) {
    myChart.destroy()
  }
  myChart = new Chart(ctx, config)
}
