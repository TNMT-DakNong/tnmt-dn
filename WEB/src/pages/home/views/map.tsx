import { Paper, Typography, Box, Button, Fade, FormGroup, FormControlLabel, Checkbox } from '@mui/material'
import React, { useState, useEffect, useRef } from 'react'
import { getData } from 'src/api/axios'
import { KeyboardDoubleArrowDown, KeyboardDoubleArrowUp } from '@mui/icons-material'

import MapLegend from 'src/pages/cong-trinh/views/MapLegend'

import dynamic from 'next/dynamic'

const Map = dynamic(() => import('src/@core/components/map'), { ssr: false })

const HomeMap = () => {
  const [mapCenter] = useState([12.25967, 107.798345])
  const [mapZoom] = useState(9)
  const [showLabel, setShowLabel] = useState(false)

  const [initConsType, setInitConstype] = useState<any>([
    'nuocmat',
    'thuydien',
    'hochua',
    'trambom',
    'tramcapnuoc',
    'cong',
    'nhamaynuoc',
    'nuocduoidat',
    'khaithac',
    'thamdo',
    'congtrinh_nuocduoidatkhac',
    'xathai',
    'khu_cumcn_taptrung',
    'sx_tieuthu_cn',
    'congtrinhkhac_xt'
  ])

  const [resData, setResData] = useState([])
  const [dataFiltered, setDataFiltered] = useState([])
  const [loading, setLoading] = useState<boolean>(false)
  const [selected, setSelected] = React.useState(true)

  const handleConsTypeChange = (data: any) => {
    setInitConstype(data)
  }

  const isMounted = useRef(true)

  const getDataConstruction = async () => {
    setLoading(true)
    getData('cong-trinh/danh-sach', {
      tenct: '',
      loai_ct: 0,
      huyen: 0,
      xa: 0,
      song: 0,
      luuvuc: 0,
      tieu_luuvuc: 0,
      tang_chuanuoc: 0,
      tochuc_canhan: 0,
      nguonnuoc_kt: ''
    })
      .then(data => {
        if (isMounted.current) {
          setResData(data)
        }
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    getDataConstruction()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const filteredData = resData?.filter((item: { [key: string]: any }) =>
      initConsType.some((keyword: any) =>
        item['loaiCT']?.['maLoaiCT']?.toString().toLowerCase().includes(keyword.toLowerCase())
      )
    )

    setDataFiltered(filteredData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initConsType, resData])

  return (
    <Paper elevation={3} sx={{ position: 'relative', height: 'calc(100vh - 170px)' }}>
      <Paper elevation={3} sx={{ py: 0.5, BorderRadius: 0, textAlign: 'center' }}>
        <Typography variant='overline' sx={{ fontWeight: 'bold' }}>
          Bản đồ hệ thống công trình tưới trên địa bàn tỉnh Đăk Nông
        </Typography>
      </Paper>
      <Fade in={selected}>
        <Box className='map-legend' sx={{ background: 'white', zIndex: `${loading ? -1 : 999}` }}>
          <FormGroup>
            <FormControlLabel
              sx={{ m: 0 }}
              control={<Checkbox onClick={() => setShowLabel(!showLabel)} />}
              label='Hiển thị tên công trình'
            />
          </FormGroup>
          <MapLegend onChange={handleConsTypeChange} />
        </Box>
      </Fade>

      <Button
        className='toggle-legend'
        variant='outlined'
        onClick={() => {
          setSelected(!selected)
        }}>
        {selected ? <KeyboardDoubleArrowDown /> : <KeyboardDoubleArrowUp />}
      </Button>
      <Map
        center={mapCenter}
        zoom={mapZoom}
        showLabel={showLabel}
        mapData={dataFiltered}
        loading={loading}
        type='road'
      />
    </Paper>
  )
}
export default HomeMap
