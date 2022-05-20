import Chart from 'chart.js/auto';

let myChart = null;

export function myChartBtcToEth() {
  const ctx = document.getElementById('myChartBtcToEth').getContext("2d");

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
  "05-05.2022",
  "04-05.2022",
]
const data = {
labels,
datasets: [
{
  data: [
    14.76,
    14.58,
    14.40,
    14.52,
    14.60,
    14.45,
    14.35,
    14.53,
    14.66,
    14.68,
    14.23,
    14.56,
    14.76,
    14.69
  ],
  label: 'BTC to ETH',
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
  pointHoverRadius: 5,
  radius: 4,
  responsive: true,
  },
};

  if (myChart != null) {
    myChart.destroy()
  }
  myChart = new Chart(ctx, config)
}
