import Paper from '@mui/material/Paper'
import { Grid, Box, Button } from '@mui/material'

import { getData } from 'src/api/axios'
import { useEffect, useState } from 'react'
import BoxLoading from 'src/@core/components/box-loading'

import TableComponent, { TableColumn } from 'src/@core/components/table'

import DeleteData from 'src/@core/components/delete-data'

import dynamic from 'next/dynamic'
import { KeyboardDoubleArrowDown, KeyboardDoubleArrowUp } from '@mui/icons-material'
import React from 'react'
import ViewAmountRain1HourData from '../mua-hien-tai/form/Mua1H'
import ToolBar from '../muc-nuoc-song/toolbar'

const Map = dynamic(() => import('src/@core/components/map'), { ssr: false })

const MucNuocSong = () => {
  const [data, setData] = useState<any[]>([])

  const [loading, setLoading] = useState(false)

  const [mapCenter] = useState([15.012172, 108.676488])
  const [mapZoom] = useState(9)
  const [selected, setSelected] = React.useState(true)

  const [postSuccess, setPostSuccess] = useState(false)
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState)
  }
  useEffect(() => {
    async function getDataDuLieuTram() {
      setLoading(true)
      await getData('DuLieuTram/danh-sach')
        .then(data => {
          setData(data)
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          setLoading(false)
        })
    }

    getDataDuLieuTram()
  }, [postSuccess])

  const columnsTable: TableColumn[] = [
    {
      id: 'stt',
      label: 'STT'
    },
    {
      id: 'tenTram',
      label: 'Tên trạm ',
      align: 'left',
      minWidth: 100,
      pinned: 'left'
    },
    {
      id: 'maTram',
      label: 'Mã trạm',
      align: 'left',
      minWidth: 50,
      pinned: 'left'
    },
    {
      id: '#',
      label: 'Mực nước H (cm)',
      align: 'left',
      children: [
        { id: '#', label: 'Ngày', align: 'center' },
        { id: '7h', label: '7h', align: 'center' },
        { id: '8h', label: '8h', align: 'center' },
        { id: '9h', label: '9h', align: 'center' },
        { id: '10h', label: '10h', align: 'center' },
        { id: '11h', label: '11h', align: 'center' },
        { id: '12h', label: '12h', align: 'center' },
        { id: '13h', label: '13h', align: 'center' },
        { id: '14h', label: '14h', align: 'center' },
        { id: '15h', label: '15h', align: 'center' },
        { id: '16h', label: '16h', align: 'center' },
        { id: '17h', label: '17h', align: 'center' },
        { id: '18h', label: '18h', align: 'center' },
        { id: '19h', label: '19h', align: 'center' },
        { id: '20h', label: '20h', align: 'center' },
        { id: '21h', label: '21h', align: 'center' },
        { id: '22h', label: '22h', align: 'center' },
        { id: '23h', label: '23h', align: 'center' },
        { id: '24h', label: '24h', align: 'center' }
      ]
    },
    {
      id: '#',
      label: 'Mực nước báo động (cm)',
      align: 'left',
      minWidth: 50,
      pinned: 'left',
      children: [
        { id: '#', label: 'BĐ I', align: 'center' },
        { id: '#', label: 'BĐ II', align: 'center' },
        { id: '#', label: 'BĐ III', align: 'center' },
        { id: '#', label: 'H lũ lịch sử', align: 'center' }
      ]
    },

    { align: 'center', id: 'actions', label: 'Thao tác', minWidth: 150 }
  ]

  return (
    <Paper sx={{ p: 8 }}>
      <Grid xs={12} md={12} sx={{ height: 'calc(50vh - 82px)' }}>
        <Paper elevation={3} sx={{ height: '100%', position: 'relative' }}>
          <Button
            className='toggle-legend'
            variant='outlined'
            onClick={() => {
              setSelected(!selected)
            }}>
            {selected ? <KeyboardDoubleArrowDown /> : <KeyboardDoubleArrowUp />}
          </Button>
          <Map center={mapCenter} zoom={mapZoom} showLabel={false} mapData={null} loading={false} />
        </Paper>
      </Grid>
      <Grid className='_text_center'></Grid>
      {/* <CreateReport2 isEdit={false} setPostSuccess={handlePostSuccess}/> */}
      {loading ? (
        <BoxLoading />
      ) : (
        <Grid className='_text_center' sx={{ mt: 3 }}>
          <ToolBar tableId='luongmuahientai' />
          <TableComponent
            id='luongmuahientai'
            columns={columnsTable}
            rows={data}
            loading={loading}
            pagination
            actions={(row: any) => (
              <Box>
                <DeleteData url={'DuLieuTram'} data={row} setPostSuccess={handlePostSuccess} />
                <Button>
                  <ViewAmountRain1HourData data={row} />
                </Button>
              </Box>
            )}
          />
        </Grid>
      )}
    </Paper>
  )
}

export default MucNuocSong
