import { useState } from 'react'
import { EditNote, Add, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, TextField, CircularProgress, Box } from '@mui/material'
import DialogsControl from 'src/@core/components/dialog-control'
import { saveData } from 'src/api/axios'

interface State {
  id: number
  ten: string
  nguonNuocKhaiThac: string
  thuocHeThongSong: string
  dienTichMatNuoc: number
  dungTichToanBo: number
  dungTichHuuIch: number
  xa: string
  huyen: string
  mucDich: string
}

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [riverData, setriverData] = useState<State>({
    id: data?.id || 0,
    ten: data?.ten || '',
    nguonNuocKhaiThac: data?.nguonNuocKhaiThac || '',
    thuocHeThongSong: data?.thuocHeThongSong || '',
    dienTichMatNuoc: data?.dienTichMatNuoc || 0,
    dungTichToanBo: data?.dungTichToanBo || 0,
    dungTichHuuIch: data?.dungTichHuuIch || 0,
    xa: data?.xa || '',
    huyen: data?.huyen || '',
    mucDich: data?.mucDich || ''
  })

  const [saving, setSaving] = useState(false)

  const handleChange = (prop: keyof State) => (value: any) => {
    setriverData({ ...riverData, [prop]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      setSaving(true)
      try {
        const res = await saveData('NM_SoLuong/luu/ao-ho', riverData)
        if (res) {
          // Reset form fields
          setriverData({
            id: 0,
            ten: '',
            nguonNuocKhaiThac: '',
            thuocHeThongSong: '',
            dienTichMatNuoc: 0,
            dungTichToanBo: 0,
            dungTichHuuIch: 0,
            xa: '',
            huyen: '',
            mucDich: ''
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
    setriverData({
      id: 0,
      ten: '',
      nguonNuocKhaiThac: '',
      thuocHeThongSong: '',
      dienTichMatNuoc: 0,
      dungTichToanBo: 0,
      dungTichHuuIch: 0,
      xa: '',
      huyen: '',
      mucDich: ''
    })

    closeDialogs()
  }

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Tên'
            fullWidth
            placeholder=''
            value={riverData.ten || ''}
            onChange={event => handleChange('ten')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Nguồn nước khai thác'
            fullWidth
            placeholder=''
            value={riverData.nguonNuocKhaiThac || ''}
            onChange={event => handleChange('nguonNuocKhaiThac')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Thuộc hệ thống sông'
            fullWidth
            placeholder=''
            value={riverData.thuocHeThongSong || ''}
            onChange={event => handleChange('thuocHeThongSong')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Diện tích mặt nước'
            fullWidth
            placeholder=''
            value={riverData.dienTichMatNuoc || ''}
            onChange={event => handleChange('dienTichMatNuoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Dung tích toàn bộ'
            fullWidth
            placeholder=''
            value={riverData.dungTichToanBo || ''}
            onChange={event => handleChange('dungTichToanBo')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Dung tích hữu ích'
            fullWidth
            placeholder=''
            value={riverData.dungTichHuuIch || ''}
            onChange={event => handleChange('dungTichHuuIch')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Xã'
            fullWidth
            placeholder=''
            value={riverData.xa || ''}
            onChange={event => handleChange('xa')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Huyện'
            fullWidth
            placeholder=''
            value={riverData.huyen || ''}
            onChange={event => handleChange('huyen')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Mục đích'
            fullWidth
            placeholder=''
            value={riverData.mucDich || ''}
            onChange={event => handleChange('mucDich')(event.target.value)}
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

const Createriver = ({ data, setPostSuccess, isEdit }: any) => {
  const formTitle = isEdit ? 'Thay đổi thông tin tài khoản' : 'Thêm tài khoản mới'

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

export default Createriver
