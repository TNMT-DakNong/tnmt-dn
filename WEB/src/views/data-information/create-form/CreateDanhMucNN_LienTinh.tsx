import { useState } from 'react'
import { EditNote, Add, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, TextField, CircularProgress, Box } from '@mui/material'
import DialogsControl from 'src/@core/components/dialog-control'
import { saveData } from 'src/api/axios'

interface State {
  id: number
  maSong: ''
  tenSongSuoi: ''
  chayRa: ''
  xDiemDau: number
  yDiemDau: number
  thonDiemDau: ''
  xaPhuongTTDiemDau: ''
  huyenTPDiemDau: ''
  xDiemCuoi: number
  yDiemCuoi: number
  thonDiemCuoi: ''
  xaPhuongTTDiemCuoi: ''
  huyenTPDiemCuoi: ''
  ghiChu: ''
}

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [DanhMucNN_LienTinhData, setDanhMucNN_LienTinhData] = useState<State>({
    id: data?.id || 0,
    maSong: data?.maSong || '',
    tenSongSuoi: data?.tenSongSuoi || '',
    chayRa: data?.chayRa || '',
    xDiemDau: data?.xDiemDau || 0,
    yDiemDau: data?.yDiemDau || 0,
    thonDiemDau: data?.thonDiemDau || '',
    xaPhuongTTDiemDau: data?.xaPhuongTTDiemDau || '',
    huyenTPDiemDau: data?.huyenTPDiemDau || '',
    xDiemCuoi: data?.xDiemCuoi || 0,
    yDiemCuoi: data?.yDiemCuoi || 0,
    thonDiemCuoi: data?.thonDiemCuoi || '',
    xaPhuongTTDiemCuoi: data?.xaPhuongTTDiemCuoi || '',
    huyenTPDiemCuoi: data?.huyenTPDiemCuoi || '',
    ghiChu: data?.ghiChu || ''
  })

  const [saving, setSaving] = useState(false)

  const handleChange = (prop: keyof State) => (value: any) => {
    setDanhMucNN_LienTinhData({ ...DanhMucNN_LienTinhData, [prop]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      setSaving(true)
      try {
        const res = await saveData('DanhMucNN_LienTinh/luu', DanhMucNN_LienTinhData)
        if (res) {
          // Reset form fields
          setDanhMucNN_LienTinhData({
            id: 0,
            maSong: '',
            tenSongSuoi: '',
            chayRa: '',
            xDiemDau: 0,
            yDiemDau: 0,
            thonDiemDau: '',
            xaPhuongTTDiemDau: '',
            huyenTPDiemDau: '',
            xDiemCuoi: 0,
            yDiemCuoi: 0,
            thonDiemCuoi: '',
            xaPhuongTTDiemCuoi: '',
            huyenTPDiemCuoi: '',
            ghiChu: ''
          })

          typeof setPostSuccess === 'function' ? setPostSuccess(true) : ''
          closeDialogs()
        }
      } catch (error) {
        console.log(error)
      } finally {
        6
        setSaving(false)
      }
    }

    // Call the function
    handleApiCall()
  }

  const handleClose = () => {
    setDanhMucNN_LienTinhData({
      id: 0,
      maSong: '',
      tenSongSuoi: '',
      chayRa: '',
      xDiemDau: 0,
      yDiemDau: 0,
      thonDiemDau: '',
      xaPhuongTTDiemDau: '',
      huyenTPDiemDau: '',
      xDiemCuoi: 0,
      yDiemCuoi: 0,
      thonDiemCuoi: '',
      xaPhuongTTDiemCuoi: '',
      huyenTPDiemCuoi: '',
      ghiChu: ''
    })

    closeDialogs()
  }

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Mã sông'
            fullWidth
            placeholder=''
            value={DanhMucNN_LienTinhData.maSong || ''}
            onChange={event => handleChange('maSong')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tên sông suối'
            fullWidth
            placeholder=''
            value={DanhMucNN_LienTinhData.tenSongSuoi || ''}
            onChange={event => handleChange('tenSongSuoi')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Chảy ra'
            fullWidth
            placeholder=''
            value={DanhMucNN_LienTinhData.chayRa || ''}
            onChange={event => handleChange('chayRa')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='X điểm đầu'
            fullWidth
            placeholder=''
            value={DanhMucNN_LienTinhData.xDiemDau || ''}
            onChange={event => handleChange('xDiemDau')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Y điểm đầu'
            fullWidth
            placeholder=''
            value={DanhMucNN_LienTinhData.yDiemDau || ''}
            onChange={event => handleChange('yDiemDau')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Thôn điểm đầu'
            fullWidth
            placeholder=''
            value={DanhMucNN_LienTinhData.thonDiemDau || ''}
            onChange={event => handleChange('thonDiemDau')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Xã/Phường/Thị trấn điểm đầu'
            fullWidth
            placeholder=''
            value={DanhMucNN_LienTinhData.xaPhuongTTDiemDau || ''}
            onChange={event => handleChange('xaPhuongTTDiemDau')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Huyện/Thành phố điểm đầu'
            fullWidth
            placeholder=''
            value={DanhMucNN_LienTinhData.huyenTPDiemDau || ''}
            onChange={event => handleChange('huyenTPDiemDau')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='X điểm cuối'
            fullWidth
            placeholder=''
            value={DanhMucNN_LienTinhData.xDiemCuoi || ''}
            onChange={event => handleChange('xDiemCuoi')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Y điểm cuối'
            fullWidth
            placeholder=''
            value={DanhMucNN_LienTinhData.yDiemCuoi || ''}
            onChange={event => handleChange('yDiemCuoi')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Thôn điểm cuối'
            fullWidth
            placeholder=''
            value={DanhMucNN_LienTinhData.thonDiemCuoi || ''}
            onChange={event => handleChange('thonDiemCuoi')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Xã/Phường/Thị trấn điểm cuối'
            fullWidth
            placeholder=''
            value={DanhMucNN_LienTinhData.xaPhuongTTDiemCuoi || ''}
            onChange={event => handleChange('xaPhuongTTDiemCuoi')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Huyện/Thành phố điểm cuối'
            fullWidth
            placeholder=''
            value={DanhMucNN_LienTinhData.huyenTPDiemCuoi || ''}
            onChange={event => handleChange('huyenTPDiemCuoi')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Ghi chú'
            fullWidth
            placeholder=''
            value={DanhMucNN_LienTinhData.ghiChu || ''}
            onChange={event => handleChange('ghiChu')(event.target.value)}
          />
        </Grid>
      </Grid>

      <DialogActions sx={{ p: 0, mt: 5 }}>
        <Button size='small' onClick={handleClose} className='btn cancleBtn'>
          Hủy
        </Button>
        <Button disabled={saving} className='btn saveBtn' onClick={handleSubmit}>
          {' '}
          {saving ? <CircularProgress color='inherit' size={20} /> : <Save />} &nbsp; Lưu{' '}
        </Button>
      </DialogActions>
    </Box>
  )
}

const CreateDanhMucNN_LienTinh = ({ data, setPostSuccess, isEdit }: any) => {
  const formTitle = isEdit ? 'Thay đổi thông tin' : 'Thêm mới'

  return (
    <DialogsControl>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void, closeDialogs: () => void) => (
        <Box>
          {isEdit ? (
            <Button>
              <EditNote
                className='tableActionBtn'
                onClick={() =>
                  openDialogs(
                    <Form data={data} setPostSuccess={setPostSuccess} closeDialogs={closeDialogs} />,
                    formTitle
                  )
                }
              />
            </Button>
          ) : (
            <Button
              variant='outlined'
              size='small'
              startIcon={<Add />}
              onClick={() =>
                openDialogs(<Form setPostSuccess={setPostSuccess} closeDialogs={closeDialogs} />, formTitle)
              }>
              Thêm mới
            </Button>
          )}
        </Box>
      )}
    </DialogsControl>
  )
}

export default CreateDanhMucNN_LienTinh
