import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab } from '@mui/material'
import { SyntheticEvent, useState } from 'react'
import CorridorRiver from './SongSuoiNoiTinh/RiverCoridorNN'
import CorridorLake from './AoHoDamPha/LakeCorridorNN'
import TangChuaNuoc from './TangChuaNuoc/TangChuaNuocNN'

const NguonNuoc = () => {
  const [value, setValue] = useState('1')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange} aria-label='ground water reserve'>
          <Tab label='Sông,suối nội tỉnh ' value='1' />
          <Tab label='Ao, hồ, đầm phá' value='2' />
          <Tab label='Tầng chứa nước' value='3' />
        </TabList>
      </Box>
      <TabPanel value='1'>
        <CorridorRiver />
      </TabPanel>
      <TabPanel value='2'>
        <CorridorLake />
      </TabPanel>
      <TabPanel value='3'>
        <TangChuaNuoc />
      </TabPanel>
    </TabContext>
  )
}
export default NguonNuoc
