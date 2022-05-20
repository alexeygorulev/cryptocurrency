<template>
<div class="chart">
  <div  class="chart item1">
    <canvas  id="Portfolio" ></canvas>
  </div>
</div>
</template>

<script>
import Chart from 'chart.js/auto';
export default {
  components: {Chart},
  mounted() {
    const ctx = document.getElementById('Portfolio').getContext("2d");
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
      data: [1,5,6 ,1,24,412,4,1,412,4,21,412,43,12,3,123,12,12,3 ],
      label: 'ETH',
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
    {
      data: [1,3,1,23,1,23,123,12,3 ],
      label: 'BTC',
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
    ],
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

      let myChart = new Chart(ctx, config)
    }

  }
</script>
