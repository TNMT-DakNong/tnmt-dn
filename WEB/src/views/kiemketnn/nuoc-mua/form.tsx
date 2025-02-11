import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  DialogActions,
  Grid,
  IconButton,
  TextField,
  Tooltip
} from '@mui/material'
import {  ReactNode, useEffect, useState } from 'react'
import { Add, Edit, Save } from '@mui/icons-material'
import DialogsControlFullScreen from 'src/@core/components/dialog-control-full-screen'
import { getData, saveData } from 'src/api/axios'
import { Props,  } from './rain-interface'

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [saving, setSaving] = useState(false)
  const [rainwater, setRainwater] = useState<Props>({
    id: data?.id || 0,
    idTram: data?.idTram || 0,
    nam: data?.nam || null,
    thang1: data?.thang1 || 0,
    thang2: data?.thang1 || 0,
    thang3: data?.thang1 || 0,
    thang4: data?.thang1 || 0,
    thang5: data?.thang1 || 0,
    thang6: data?.thang1 || 0,
    thang7: data?.thang1 || 0,
    thang8: data?.thang1 || 0,
    thang9: data?.thang1 || 0,
    thang10: data?.thang1 || 0,
    thang11: data?.thang1 || 0,
    thang12: data?.thang1 || 0
  })

  //   //state upload file
  const [tram, setTram] = useState([])

  useEffect(() => {
    const getDataForSelect = async () => {
      try {
        const dataTram = await getData('Tram_ThongTin/danh-sach')
        setTram(dataTram)
      } catch (error) {
        console.log(error)
      } 
    }
    getDataForSelect()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (prop: keyof Props) => (value: any) => {
    setRainwater({ ...rainwater, [prop]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    handleApiCall()
  }
  const handleApiCall = async () => {
    try {
      setSaving(true)
      console.log(rainwater)

      const res = await saveData('NMua_TongLuong/luu', rainwater)
      if (res) {
        setPostSuccess && setPostSuccess(true)
        closeDialogs()
      }
    } catch (error) {
      console.error(error)
    } finally {
      setSaving(false)
    }
  }
  const handleClose = () => {
    closeDialogs()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={4} rowSpacing={1}>
        <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
       
          <Autocomplete
           size="small"
           options={tram}
           getOptionLabel={(option: any) => `${option.tenTram} `}
           value={tram?.find((option:any) => option.id === rainwater.idTram) || null}
           onChange={(_, value) => handleChange('idTram')(value?.id || 0)}
           renderInput={params => <TextField {...params} fullWidth label='Chọn trạm' />}
          />
        </Grid>
      
        <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Năm'
            fullWidth
            placeholder=''
            value={rainwater.nam || ''}
            onChange={event => handleChange('nam')(event.target.value)}
          />
        </Grid>
      </Grid>
     
      <Grid container spacing={4}>
        <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Tháng 1'
            fullWidth
            placeholder=''
            value={rainwater.thang1 || ''}
            onChange={event => handleChange('thang1')(event.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Tháng 2'
            fullWidth
            placeholder=''
            value={rainwater.thang2 || ''}
            onChange={event => handleChange('thang2')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Tháng 3'
            fullWidth
            placeholder=''
            value={rainwater.thang3 || ''}
            onChange={event => handleChange('thang3')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Tháng 4'
            fullWidth
            placeholder=''
            value={rainwater.thang4 || ''}
            onChange={event => handleChange('thang4')(event.target.value)}
          />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Tháng 5'
            fullWidth
            placeholder=''
            value={rainwater.thang5 || ''}
            onChange={event => handleChange('thang5')(event.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Tháng 6'
            fullWidth
            placeholder=''
            value={rainwater.thang6 || ''}
            onChange={event => handleChange('thang6')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Tháng 7'
            fullWidth
            placeholder=''
            value={rainwater.thang7 || ''}
            onChange={event => handleChange('thang7')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Tháng 8'
            fullWidth
            placeholder=''
            value={rainwater.thang8 || ''}
            onChange={event => handleChange('thang8')(event.target.value)}
          />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Tháng 9'
            fullWidth
            placeholder=''
            value={rainwater.thang9 || ''}
            onChange={event => handleChange('thang9')(event.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Tháng 10'
            fullWidth
            placeholder=''
            value={rainwater.thang10 || ''}
            onChange={event => handleChange('thang10')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Tháng 11'
            fullWidth
            placeholder=''
            value={rainwater.thang11 || ''}
            onChange={event => handleChange('thang11')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Tháng 12'
            fullWidth
            placeholder=''
            value={rainwater.thang12 || ''}
            onChange={event => handleChange('thang12')(event.target.value)}
          />
        </Grid>
      </Grid>
      <DialogActions sx={{ p: 0, mt: 5 }}>
        <Button size='small' onClick={handleClose} className='btn cancleBtn'>
          Hủy
        </Button>
        <Button type='submit' disabled={saving} className='btn saveBtn'>
          {' '}
          {saving ? <CircularProgress color='inherit' size={20} /> : <Save />} &nbsp; Lưu{' '}
        </Button>
      </DialogActions>
    </form>
  )
}

const CreateRainWater = ({ data, isEdit, setPostSuccess }: any) => {
  const formTitle = isEdit ? 'Thay đổi thông tin tổng lượng mưa trong năm' : 'Thêm thông tin tổng lượng mưa trong năm'

  return (
    <DialogsControlFullScreen>
      {(openDialogs: (content: ReactNode, title: ReactNode) => void, closeDialogs: () => void) => (
        <Box>
          {isEdit ? (
            <Tooltip title='Chỉnh sửa thông tin'>
              <IconButton
                onClick={() =>
                  openDialogs(
                    <Form data={data} closeDialogs={closeDialogs} setPostSuccess={setPostSuccess} />,
                    formTitle
                  )
                }>
                <Edit className='tableActionBtn' />
              </IconButton>
            </Tooltip>
          ) : (
            <Button
              variant='outlined'
              fullWidth
              startIcon={<Add />}
              onClick={() =>
                openDialogs(<Form data={data} closeDialogs={closeDialogs} setPostSuccess={setPostSuccess} />, formTitle)
              }>
              Thêm mới
            </Button>
          )}
        </Box>
      )}
    </DialogsControlFullScreen>
  )
}

export default CreateRainWater
