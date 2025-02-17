// import { ApexOptions } from 'apexcharts';
// import { useEffect, useState } from 'react';
// import ReactApexChart from 'react-apexcharts';
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const MonitoringDataChart = () => {
  const options = {
    series: [
      {
        name: 'Lượng mưa',
        data: [200, 210.2, 228, 184, 173, 226, 191, 220, 196, 188, 215, 210]
      },
      {
        name: 'Mực nước thượng lưu',
        data: [135, 141, 262, 242, 233, 218, 129, 137, 136, 151, 132, 135]
      },
      {
        name: 'Mực nước hạ lưu',
        data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
      },
      {
        name: 'Dung tích',
        data: [97, 87, 74, 93, 78, 58, 72, 77, 89, 46, 49, 55]
      }
    ],
    options: {
      chart: {
        height: 270,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: [5, 7, 5],
        curve: 'straight',
        dashArray: [0, 8, 5]
      },
      title: {
        text: 'Page Statistics',
        align: 'left'
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
      },
      xaxis: {
        categories: [
          '01 Jan',
          '02 Jan',
          '03 Jan',
          '04 Jan',
          '05 Jan',
          '06 Jan',
          '07 Jan',
          '08 Jan',
          '09 Jan',
          '10 Jan',
          '11 Jan',
          '12 Jan'
        ]
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function (val: any) {
                return val + ' (mins)'
              }
            }
          },
          {
            title: {
              formatter: function (val: any) {
                return val + ' per session'
              }
            }
          },
          {
            title: {
              formatter: function (val: any) {
                return val
              }
            }
          }
        ]
      },
      grid: {
        borderColor: '#f1f1f1'
      }
    }
  }

  return (
    <div>
      <div id='chart'>
        <ReactApexcharts options={options} series={options.series} height={250} />
      </div>
      <div id='html-dist'></div>
    </div>
  )
}

export default MonitoringDataChart
