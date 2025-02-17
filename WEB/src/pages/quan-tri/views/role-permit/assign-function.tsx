import { Checkbox, Grid, Typography, CircularProgress, FormControlLabel, Box } from '@mui/material'
import { useEffect, useState, useCallback } from 'react'
import DialogsControlFullScreen from 'src/@core/components/dialog-control-full-screen'
import TableComponent from 'src/@core/components/table'
import { getData, saveData } from 'src/api/axios'

type DialogsControlCallback = (content: React.ReactNode, title: React.ReactNode) => void

const Form = ({ data }: any) => {
  const roleData = data
  const [dashData, setDashData] = useState([])
  const [loading, setLoading] = useState(false)
  const [switchLoadingMap, setSwitchLoadingMap] = useState<{ [key: string]: { [key: string]: boolean } }>({})
  const [postSuccess, setPostSuccess] = useState(false)
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState)
  }
  const roleInfoColumn = [
    { id: 'name', label: 'Tên', elm: (row: any) => <Typography py={2}>{row.name}</Typography> },
    { id: 'description', label: 'Mô tả' }
  ]

  const permitColumn = [
    { id: 'name', label: 'Màn hình chức năng' },
    { id: 'path', label: 'URL' },
    {
      id: 'permitAccess',
      label: 'Được phép truy cập',
      elm: (dash: any) => (
        <div>
          {dash.functions.map((f: any) => {
            const key = `${dash.id}-${f.id}`
            const isLoading = switchLoadingMap[key]

            return (
              <FormControlLabel
                key={f.id}
                control={
                  isLoading ? (
                    <Box padding={'9px'}>
                      <CircularProgress size={20} />{' '}
                    </Box>
                  ) : (
                    <Checkbox name={f.path} checked={f?.status} onChange={handleCheckFunction(f, dash)} />
                  )
                }
                label={f.permitName}
              />
            )
          })}
        </div>
      )
    }
  ]

  const getDataRole = useCallback(async () => {
    try {
      setLoading(true)
      const rdash = await getData(`Role/${data.id}`)
      setDashData(rdash.dashboards)
    } catch (error) {
      setDashData([])
    } finally {
      setLoading(false)
    }
  }, [data.id])

  useEffect(() => {
    getDataRole()
  }, [getDataRole, postSuccess])

  const handleCheckFunction = (f: any, dash: any) => async () => {
    const key = `${dash.id}-${f.id}`

    const item: any = {
      roleId: roleData.id,
      roleName: roleData.name,
      dashboardId: dash.id,
      functionId: f.id,
      functionName: f.permitName,
      functionCode: f.permitCode
    }

    try {
      setSwitchLoadingMap((prevState: any) => ({
        ...prevState,
        [key]: true
      }))
      if (f.status === true) {
        await saveData('Permission/delete', item)
      } else {
        await saveData('Permission/save', item)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setSwitchLoadingMap((prevState: any) => ({
        ...prevState,
        [key]: false
      }))
    }

    await getDataRole()
    setPostSuccess(true)
    handlePostSuccess()
  }

  return (
    <Box>
      <Grid container>
        <Grid item xs={12} pb={10}>
          <TableComponent columns={roleInfoColumn} loading={false} rows={[roleData]} />
        </Grid>
      </Grid>
      <TableComponent columns={permitColumn} loading={loading} rows={dashData} pagination />
    </Box>
  )
}

const AssignFunction = ({ data }: any) => {
  const formTitle = 'Thêm chức năng nhóm người dùng'

  return (
    <DialogsControlFullScreen>
      {(openDialogs: DialogsControlCallback, closeDialogs: () => void) => (
        <Typography
          className='btnShowFilePdf'
          onClick={() => openDialogs(<Form data={data} closeDialogs={closeDialogs} />, formTitle)}>
          {data.name}
        </Typography>
      )}
    </DialogsControlFullScreen>
  )
}

export default AssignFunction
