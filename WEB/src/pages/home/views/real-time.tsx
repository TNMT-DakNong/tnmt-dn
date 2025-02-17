import { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import { Paper } from '@mui/material'

const RealTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [formattedTime, setFormattedTime] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      const formatted = currentTime.toLocaleString()
      setFormattedTime(formatted)
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [currentTime])

  return (
    <Paper sx={{ py: 2, px: 3 }}>
      <Typography variant='body2' fontWeight={700}>
        THỐNG KÊ HIỆN TRẠNG TƯỚI ({formattedTime}){' '}
      </Typography>
    </Paper>
  )
}

export default RealTime
