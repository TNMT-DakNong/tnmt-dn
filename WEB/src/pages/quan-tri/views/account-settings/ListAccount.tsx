import { useEffect, useState } from 'react'
import { IconButton, Box, Toolbar, TextField, Card } from '@mui/material'
import SetRole from './AssignRole'
import FormAccount from './FormAccount'
import TableComponent from 'src/@core/components/table'
import { getData } from 'src/api/axios'
import SetPassword from '../set-password'
import { useRouter } from 'next/router'
import DeleteData from 'src/@core/components/delete-data'

// ** MUI Imports
import { TabList, TabPanel, TabContext } from '@mui/lab'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import { useRequireAuth } from 'src/@core/hooks/useRequireAuth'

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

const ListAccount = () => {
  const [postSuccess, setPostSuccess] = useState(false)
  const [resData, setResData] = useState([])
  const [loading, setLoading] = useState(false)
  const [paramFilter, setParamFilter] = useState({ UserName: '' })

  const router = useRouter()
  const routePath = router.pathname // Use router.pathname to get the current pathname

  // Split the pathname and get the part you need (in this case, the first segment)
  const routeSegment = routePath.split('/')[2]

  const [accessCreate, setAccessCreate] = useState(false)
  const [accessUpdate, setAccessUpdate] = useState(false)
  const [accessSetPassword, setAccessSetPassword] = useState(false)
  const [accessSetRole, setAccessSetRole] = useState(false)
  const [accessDelete, setAccessDelete] = useState(false)

  const { hasPermission } = useRequireAuth()

  async function getAccess() {
    setAccessCreate(await hasPermission(routeSegment, 'create'))
    setAccessUpdate(await hasPermission(routeSegment, 'edit'))
    setAccessSetRole(await hasPermission(routeSegment, 'set-role'))
    setAccessSetPassword(await hasPermission(routeSegment, 'set-password'))
    setAccessDelete(await hasPermission(routeSegment, 'delete'))
  }

  useEffect(() => {
    getAccess()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState)
  }

  const columnsTable = [
    { id: 'userName', label: 'Tài khoản(User name)' },
    { id: 'roles', label: 'Quyền hạn(Roles)', elm: (row: any) => row.role },
    { id: 'fullName', label: 'Họ tên(Full Name)' },
    { id: 'email', label: 'Email' },
    { id: 'phoneNumber', label: 'Số điện thoại(Phone Number)' },
    {
      id: 'actions',
      label: '#',
      elm: (row: any) =>
        accessCreate ? (
          <Box>
            # <FormAccount data={row} setPostSuccess={handlePostSuccess} isEdit={false} />
          </Box>
        ) : (
          <Box></Box>
        )
    }
  ]

  useEffect(() => {
    const getDataUser = async () => {
      try {
        setLoading(true)
        const data = await getData('User/list', paramFilter)
        setResData(data)
      } catch (error) {
        setResData([])
      }
      setLoading(false)
    }

    getDataUser()
  }, [paramFilter, postSuccess])

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
                <Box className='group_btn'>
                  {accessSetRole ? (
                    <IconButton aria-label='setRole'>
                      <SetRole data={row} setPostSuccess={handlePostSuccess} />
                    </IconButton>
                  ) : null}
                  {accessSetPassword ? (
                    <IconButton aria-label='setPassword'>
                      <SetPassword user={row} setPostSuccess={handlePostSuccess} />
                    </IconButton>
                  ) : null}
                  {accessUpdate ? (
                    <IconButton aria-label='edit'>
                      <FormAccount data={row} setPostSuccess={handlePostSuccess} isEdit={true} />
                    </IconButton>
                  ) : null}
                  {accessDelete ? (
                    <IconButton aria-label='delete'>
                      <DeleteData url={'User'} data={row} setPostSuccess={handlePostSuccess} />
                    </IconButton>
                  ) : null}
                </Box>
              )}
            />
          </div>
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default ListAccount
