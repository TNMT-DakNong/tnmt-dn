import React, { useState, SyntheticEvent } from 'react'
import { Assessment } from '@mui/icons-material'
import { Grid, IconButton, Tooltip, Box, Tab } from '@mui/material'
import DialogsControlFullScreen from 'src/@core/components/dialog-control-full-screen'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import Mua6HourData from './rain-data'
import Mua6HourChart from './rain-chart'

interface FormAmountRainProps {
  data: any
}

const FormAmountRain: React.FC<FormAmountRainProps> = props => {
  const [value, setValue] = useState('1')
  const { data } = props
  const handleChangeTab = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Grid>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChangeTab} aria-label='ground water reserve'>
            <Tab label='Số liệu vận hành' value='1' />
            <Tab label='Đồ thị vận hành' value='2' />
          </TabList>
        </Box>
        <TabPanel value='1'>
          <Mua6HourData stationdata={data} />
        </TabPanel>
        <TabPanel value='2'>
          <Mua6HourChart stationdata={data} />
        </TabPanel>
      </TabContext>
    </Grid>
  )
}

interface AmountRainProps {
  data?: any
}

const ViewAmountRain6HourData: React.FC<AmountRainProps> = ({ data }) => {
  const formTitle = 'Thông tin tổng lượng mưa theo thời đoạn mưa'

  return (
    <DialogsControlFullScreen>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void) => (
        <Box>
          {
            <Tooltip title='Xem chi tiết'>
              <IconButton onClick={() => openDialogs(<FormAmountRain data={data} />, formTitle)}>
                <Assessment className='tableActionBtn' />
              </IconButton>
            </Tooltip>
          }
        </Box>
      )}
    </DialogsControlFullScreen>
  )
}

export default ViewAmountRain6HourData
