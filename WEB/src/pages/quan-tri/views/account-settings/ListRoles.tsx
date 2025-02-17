import { useEffect, useState } from 'react'
import { Delete } from '@mui/icons-material'
import { IconButton, Box, Checkbox, Card } from '@mui/material'
import TableComponent from 'src/@core/components/table'
import FormRoles from './FormRoles'
import { getData } from 'src/api/axios'

// ** MUI Imports
import { TabList, TabPanel, TabContext } from '@mui/lab'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'

// ** Icons Imports
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'

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

const ListRoles = () => {
  const [postSuccess, setPostSuccess] = useState(false)
  const [resData, setResData] = useState([])
  const [loading, setLoading] = useState(false)

  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState)
  }

  const columnsTable = [
    { id: 'name', label: 'Tên' },
    { id: 'isDefault', label: 'Mặc định', elm: (row: any) => <Checkbox name='isDefault' checked={row?.isDefault} /> },
    {
      id: 'actions',
      label: '#',
      elm: (row: any) => (
        <Box>
           <FormRoles data={row} isEdit={false} setPostSuccess={handlePostSuccess} />{' '}
        </Box>
      )
    }
  ]

  useEffect(() => {
    const getDataRole = async () => {
      try {
        setLoading(true)
        const data = await getData('Role/list')
        setResData(data)
      } catch (error) {
        setResData([])
      } finally {
        setLoading(false)
      }
    }

    getDataRole()
  }, [postSuccess])

  return (
    <Card>
      <TabContext value={'roles'}>
        <TabList
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}>
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
          <Box>
            <TableComponent
              columns={columnsTable}
              rows={resData}
              loading={loading}
              actions={(row: any) => (
                <Box display='flex' justifyContent='center'>
                  <IconButton aria-label='edit'>
                    <FormRoles data={row} isEdit={true} setPostSuccess={handlePostSuccess} />
                  </IconButton>
                  <IconButton aria-label='delete'>
                    <Delete className='tableActionBtn deleteBtn' />
                  </IconButton>
                </Box>
              )}
            />
          </Box>
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default ListRoles
