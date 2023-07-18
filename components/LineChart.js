'use client'
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import moment from 'moment';
import 'chartjs-adapter-moment';

const LineChart = ({ salesData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (salesData && salesData.length > 0) {
      const chartData = {
        labels: salesData.map((data) => moment(data.date).format('YYYY-MM-DD')),
        datasets: [
          {
            label: 'Total Price',
            data: salesData.map((data) => data.totalprice),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      };

      const chartOptions = {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Sales Line Chart',
            font: {
              size: 18,
              color: 'white'
            }
          }
        },
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
              displayFormats: {
                day: 'YYYY-MM-DD',
              },
            },
            ticks: {
              maxRotation: 45,
              minRotation: 45,
              color: 'white' // x-axis font color
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1000,
              callback: function (value) {
                return '$' + value;
              },
              color: 'white' // y-axis font color
            },
          },
        },
      };
      

      const chart = new Chart(chartRef.current, {
        type: 'line',
        data: chartData,
        options: chartOptions,
      });

      return () => {
        chart.destroy();
      };
    }
  }, [salesData]);

  return <canvas ref={chartRef} style={{ width: '800px', height: '400px' , color:"#fff"}}/>;
};

export default LineChart;

