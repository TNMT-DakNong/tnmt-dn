import { Typography, Paper, Box } from '@mui/material'
import BoxLoading from 'src/@core/components/box-loading'

export function formatVndCost(cost: number): string {
  const formattedCost = cost.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })

  return formattedCost
}

const CountLicenseFee = ({ data, loading }: any) => {
  // Calculate the total of resData.totalMoney
  const costBTNMT = data?.btnmt.reduce((sum: any, item: any) => sum + (item.tongTienCQ || 0), 0)
  const costUBND = data?.ubnd.reduce((sum: any, item: any) => sum + (item.tongTienCQ || 0), 0)

  const totalMoneySum = costBTNMT + costUBND

  return (
    <Paper elevation={3}>
      <Paper elevation={3} sx={{ py: 0.5, mb: 2, BorderRadius: 0, textAlign: 'center' }}>
        <Typography variant='overline' sx={{ fontWeight: 'bold' }}>
          Kết quả cung cấp dịch vụ thủy lợi (ha)
        </Typography>
      </Paper>
      {loading ? (
        <BoxLoading />
      ) : (
        <Box px={4} pb={4}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ fontWeight: 'bold' }}>TỔNG</Typography>
            <Typography sx={{ fontWeight: 'bold' }}> {formatVndCost(totalMoneySum)} </Typography>
          </Box>
          <Typography sx={{ textAlign: 'left' }} variant='subtitle2'>
            DT được hỗ trợ phí: {formatVndCost(costBTNMT)}{' '}
          </Typography>
          <Typography sx={{ textAlign: 'left' }} variant='subtitle2'>
            DT không được hỗ trợ phí: {formatVndCost(costUBND)}{' '}
          </Typography>
        </Box>
      )}
    </Paper>
  )
}

export default CountLicenseFee
