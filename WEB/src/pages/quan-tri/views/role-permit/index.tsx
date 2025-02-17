import { useEffect, useState } from 'react'
import { IconButton, Box, Card } from '@mui/material'
import TableComponent from 'src/@core/components/table'
import AssignPermit from './assign-permit'
import AssignFunction from './assign-function'
import { getData } from 'src/api/axios'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { LockOpenOutline } from 'mdi-material-ui'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'

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

const RolePermit = () => {
  const [resData, setResData] = useState([])
  const [loading, setLoading] = useState(false)

  const columnsTable = [
    { id: 'name', label: 'Tên nhóm người dùng', elm: (row: any) => <AssignFunction data={row} /> },
    { id: 'description', label: 'Mô tả' },
    { id: 'actions', label: '#' }
  ]

  useEffect(() => {
    const getDataRole = async () => {
      try {
        setLoading(true)
        const data = await getData('Role/list')
        setResData(data)
      } catch (error) {
        setResData([])
      }
      setLoading(false)
    }

    getDataRole()
  }, [])

  return (
    <Card>
      <TabContext value={'roles'}>
        <TabList aria-label='roles-settings tabs' sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}>
          <Tab
            value='roles'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LockOpenOutline />
                <TabName>Nhóm người dùng(Roles)</TabName>
              </Box>
            }
          />
        </TabList>
        <TabPanel sx={{ p: 0 }} value='roles'>
          <div>
            <TableComponent
              columns={columnsTable}
              rows={resData}
              loading={loading}
              actions={(row: any) => (
                <Box>
                  <IconButton>
                    <AssignPermit data={row} />
                  </IconButton>
                </Box>
              )}
            />
          </div>
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default RolePermit
