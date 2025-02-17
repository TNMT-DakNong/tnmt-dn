import React, { useEffect, useState } from 'react'
import { IconButton, Box, Toolbar, TextField, Card } from '@mui/material'
import TableComponent from 'src/@core/components/table'
import AssignPermit from './assign-permit'
import AssignFunction from './assign-function'
import { getData } from 'src/api/axios'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { AccountOutline } from 'mdi-material-ui'

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

const UserPermit = () => {
  const [resData, setResData] = useState([])
  const [loading, setLoading] = useState(false)
  const [paramFilter, setParamFilter] = useState({ UserName: '' })

  useEffect(() => {
    const getDataUser = async () => {
      try {
        setLoading(true)
        const data = await getData('User/list', paramFilter)
        setResData(data)
      } catch (error) {
        setResData([])
      } finally {
        setLoading(false)
      }
    }

    getDataUser()
  }, [paramFilter])

  const columnsTable = [
    { id: 'userName', label: 'Tên người dùng', elm: (row: any) => <AssignFunction data={row} /> },
    { id: 'fullName', label: 'Mô tả' },
    { id: 'actions', label: '#' }
  ]

  return (
    <Card>
      <TabContext value={'account'}>
        <TabList
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}>
          <Tab
            value='account'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline />
                <TabName>Người dùng(Users)</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value='account'>
          <div>
            <Toolbar variant='dense' sx={{ display: 'flex', justifyContent: 'end' }}>
              <Box>
                <TextField
                  sx={{ p: 0 }}
                  size='small'
                  fullWidth
                  variant='outlined'
                  placeholder='Tài khoản...'
                  onChange={(e: any) => setParamFilter({ ...paramFilter, UserName: e.target.value })}
                />
              </Box>
            </Toolbar>
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

export default UserPermit
