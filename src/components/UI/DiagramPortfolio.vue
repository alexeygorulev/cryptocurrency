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
  data() {
    return {
      movementBtc: [50231, 54230,51121,59210],
      movementEth: [45212,39232,36212,46231,41823],
      movementUsd: [30230,32423,55932,61212,36832],
      destroyNumber: 0,

    }
  },
  props: {
        currencyMovementBtc: {
          type: Array,
          default: "",
        },
        currencyMovementUsd: {
          type: Array,
          default: "",
        },
        currencyMovementEth: {
          type: Array,
          default: "",
        },
      },
  watch: {
    currencyMovementBtc: {
      handler(update) {
        this.movementBtc = update
        // this.getPortfolioDiagram(this.movementBtc, this.movementEth, this.movementUsd)
      },
      deep: true
    },
    currencyMovementEth: {
      handler(update) {
        this.movementEth = update
        // this.getPortfolioDiagram(this.movementBtc, this.movementEth, this.movementUsd)

      },
      deep: true
    },
    currencyMovementUsd: {
      handler(update) {
        this.movementUsd = update
        // const randomNumber = Math.random()
        // this.getPortfolioDiagram(this.movementBtc, this.movementEth, this.movementUsd, randomNumber)

      },
      deep: true
    },

  },

  mounted() {
    this.getPortfolioDiagram(this.movementBtc, this.movementUsd, this.movementEth,)

    },
  methods: {
    getPortfolioDiagram(data1, data2, data3, randomNumber) {
    let myChart = randomNumber
    if (myChart == this.destroyNumber) {
        myChart.destroy()
      }
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
    ]
    const data = {
    labels,
    datasets: [
    {
      data: data1,
      label: 'Btc',
      fill: false,
      backgroundColor: "rgba(247, 0, 54, 0.8)",
      borderColor: 'rgba(247, 0, 54, 0.8)',
      borderWidth: 1.3,
      pointBackgroundColor: 'rgba(247, 0, 54, 0.8)',
      pointBorderColor: 'rgba(204, 0, 0, 0.6)',
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
      data: data2,
      label: 'USD',
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
      data: data3,
      label: 'Eth',
      backgroundColor: "rgb(145, 59, 169, 0.5)",
      borderColor: 'rgb(145, 59, 169, 1)',
      borderWidth: 1.3,
      pointBackgroundColor: 'rgb(145, 59, 169, 0.4)',
      pointBorderColor: 'rgb(145, 59, 169, 1)',
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
    myChart = new Chart(ctx, config)
    this.destroyNumber = randomNumber
    }
  }

  }
</script>
