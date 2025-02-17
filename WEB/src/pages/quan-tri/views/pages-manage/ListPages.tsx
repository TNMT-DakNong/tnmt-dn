import { useEffect, useState } from 'react'
import { IconButton, Box, Checkbox, Card } from '@mui/material'
import { Tv } from '@mui/icons-material'
import FormPages from './FormPages'
import TableComponent from 'src/@core/components/table'
import { getData } from 'src/api/axios'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'
import DeleteData from 'src/@core/components/delete-data'

const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const ListPages = () => {
  const [resData, setResData] = useState([])
  const [postSuccess, setPostSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState)
  }

  const columnsTable = [
    { id: 'name', label: 'Tên trang web' },
    { id: 'path', label: 'Đường dẫn' },
    { id: 'description', label: 'Mô tả' },
    {
      id: 'permitAccess',
      label: 'Được phép truy cập',
      elm: (row: any) => <Checkbox name='permitAccess' checked={row?.permitAccess} disabled />
    },
    {
      id: 'actions',
      label: '#',
      elm: (row: any) => (
        <Box>
          # <FormPages data={row} setPostSuccess={handlePostSuccess} isEdit={false} />
        </Box>
      )
    }
  ]

  useEffect(() => {
    const getDataDashboard = async () => {
      setLoading(true)
      try {
        const data = await getData('Dashboard/list')
        setResData(data)
      } catch (error) {
        setResData([])
      } finally {
        setLoading(false)
      }
    }
    getDataDashboard()
  }, [postSuccess])

  return (
    <Card>
      <TabContext value={'list-page'}>
        <TabList
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}>
          <Tab
            value='account'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tv />
                <TabName>Các trang truy cập</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value='list-page'>
          <TableComponent
            columns={columnsTable}
            rows={resData}
            pagination
            loading={loading}
            actions={(row: any) => (
              <Box>
                <IconButton aria-label='edit'>
                  <FormPages data={row} setPostSuccess={handlePostSuccess} isEdit={true} />
                </IconButton>
                <DeleteData url={'Dashboard'} data={row} setPostSuccess={handlePostSuccess} />
              </Box>
            )}
          />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default ListPages
