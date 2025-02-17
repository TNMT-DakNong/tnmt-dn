// ** MUI Imports
import { Typography, Grid, Paper } from '@mui/material'
import { ApexOptions } from 'apexcharts'
import BoxLoading from 'src/@core/components/box-loading'

// ** ApexCharts
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const CountLicense = ({ data, loading }: any) => {
  const TotalLicense = data.total
  const BTNMT = data.btnmt
  const UBND = data.ubnd

  //chart
  const COLORS = ['#0088FE', '#FFBB28']
  const CHARTS_SIZE = 200
  const chartData = [
    {
      name: 'BTNMT',
      value: BTNMT
    },
    {
      name: 'UBND',
      value: UBND
    }
  ]

  const options: ApexOptions = {
    labels: chartData?.map((entry: any) => entry.name),
    colors: COLORS,
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '15px'
      },
      formatter: function (val, opt) {
        val
        const name = opt.w.globals.labels[opt.seriesIndex]
        const value = opt.w.globals.seriesTotals[opt.seriesIndex]

        return `${name}: ${value}`
      }
    },
    chart: {
      width: CHARTS_SIZE,
      type: 'pie',
      events: {
        dataPointSelection: (event, chartContext, config) => {
          console.log(config.w.config.labels[config.dataPointIndex])
        }
      }
    },
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -20
        }
      }
    },
    grid: {
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    },
    tooltip: {
      enabled: true
    },
    legend: {
      show: false
    }
  }

  const series = chartData?.map((entry: any) => entry.value)

  return (
    <Paper>
      <Paper elevation={5} sx={{ py: 0.5, mb: 2, BorderRadius: 0, textAlign: 'center' }}>
        <Typography variant='overline' sx={{ fontWeight: 'bold' }}>
          Hiện trạng công trình hồ chứa
        </Typography>
      </Paper>
      {loading ? (
        <BoxLoading />
      ) : (
        <Grid container>
          <Grid
            item
            xs={6}
            md={6}
            sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'center' }}>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Typography sx={{ fontWeight: 'bold' }} variant='h6'>
                Tổng số hồ chứa: 
              </Typography>
              <Typography sx={{ fontWeight: 'bold' }} variant='h6'>
                {TotalLicense}
              </Typography>
            </Grid>
            <Grid item xs={12} px={6}>
              <Typography variant='subtitle1'>
                <Typography sx={{ fontWeight: 'bold' }} variant='caption'>
                  Về mực nước chết: {BTNMT}
                </Typography>
              </Typography>
              <Typography variant='subtitle1'>
                <Typography sx={{ fontWeight: 'bold' }} variant='caption'>
                  Dưới mực nước chết: {UBND}
                </Typography>
              </Typography>
              <Typography variant='subtitle1'>
                <Typography sx={{ fontWeight: 'bold' }} variant='caption'>
                  Tổng dung tích hiện trạng: {UBND}
                </Typography>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={6} md={6}>
            {/* Chart */}
            <ReactApexcharts options={options} series={series} type='pie' width={CHARTS_SIZE} height={CHARTS_SIZE} />
          </Grid>
        </Grid>
      )}
    </Paper>
  )
}

export default CountLicense
