import { useState, useEffect, useRef } from 'react'

// ** MUI Imports

import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import { Paper } from '@mui/material'
import { getData } from 'src/api/axios'

const IsConnectedProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: `${theme.palette.success.main}`
  }
}))

const LossConnectProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: `${theme.palette.warning.main}`
  }
}))

const ErrorConnectProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: `${theme.palette.error.main}`
  }
}))

const ConstructionStatus = () => {
  //initialize state with counter variable and set it to 0

  const [counterConnected, setCounterConnected] = useState(0)
  const [counterLossConnect, setCounterLossConnect] = useState(0)
  const [counterErrorConnect, setCounterErrorConnect] = useState(0)
  const [totalConst, setTotalConst] = useState(0);
  const Connected = 15
  const ErrorConnect = 7
  const LossConect = totalConst - Connected
  const [loading, setLoading] = useState(false)

  const isMounted = useRef(true)
  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])
  useEffect(() => {
    const getDataConstructions = async () => {
      setLoading(true);
      try {
        const data = await getData('GiamSatSoLieu/danhsach');
        if (isMounted.current) {
          setTotalConst(data.length); // Cập nhật tổng số bản ghi
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getDataConstructions();
  }, [loading]);
  
  //calculate percentage and update state with result

  useEffect(() => {
    //Counter Connected

    const percentConnected = (Connected / totalConst) * 100
    setCounterConnected(percentConnected)

    //Counter LossConnect

    const percentLossConnect = (LossConect / totalConst) * 100
    setCounterLossConnect(percentLossConnect)

    //Counter ErrorConnect

    const percentErrorConnect = (ErrorConnect / totalConst) * 100
    setCounterErrorConnect(percentErrorConnect)
  }, [ErrorConnect, LossConect, Connected, totalConst])

  return (
    <Paper elevation={3}>
      <Paper elevation={3} sx={{ py: 0.5, mb: 2, BorderRadius: 0, textAlign: 'center' }}>
        <Typography variant='overline' sx={{ fontWeight: 'bold' }}>
          HIỆN TRẠNG TƯỚI (ha)
        </Typography>
      </Paper>
      <Box px={5} pb={5}>
        <Typography>Tổng diện tích yêu cầu tưới : {totalConst} </Typography>
        <Box sx={{ paddingTop: 3 }}>
          <Typography>Tổng diện tích thực: {Connected} </Typography>
          <IsConnectedProgress variant='determinate' value={counterConnected} />
        </Box>
        <Box sx={{ paddingTop: 3 }}>
          <Typography>Tưới lúa (cả năm): {LossConect} </Typography>
          <LossConnectProgress variant='determinate' value={counterLossConnect} />
        </Box>
        <Box sx={{ paddingTop: 3 }}>
          <Typography>Tưới cây công nghiệp, cây ăn quả: {ErrorConnect} </Typography>
          <ErrorConnectProgress variant='determinate' value={counterErrorConnect} />
        </Box>
        <Box sx={{ paddingTop: 3 }}>
          <Typography>Một số cây trồng khác: {ErrorConnect} </Typography>
          <ErrorConnectProgress variant='determinate' value={counterErrorConnect} />
        </Box>

      </Box>
    </Paper>
  )
}

export default ConstructionStatus
