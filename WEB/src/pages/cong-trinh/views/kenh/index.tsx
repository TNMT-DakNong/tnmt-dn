//React Imports
import React, { useState, useEffect, useRef } from 'react'

//MUI Imports
import { Box, Typography, Paper, FormGroup, FormControlLabel, Checkbox } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

//Other Imports
import dynamic from 'next/dynamic'
import { ConverterCood } from 'src/@core/components/map/convert-coord'
import { useRouter } from 'next/router'
import { getData } from 'src/api/axios'
import DeleteData from 'src/@core/components/delete-data'
import MapLegend from 'src/pages/cong-trinh/views/MapLegend'
import TableComponent, { TableColumn } from 'src/@core/components/table'
import ConstructionToolBar from 'src/pages/cong-trinh/views/toolbar'
import FormCongTrinh from 'src/pages/cong-trinh/views/form'

const Map = dynamic(() => import('src/@core/components/map'), { ssr: false })

// eslint-disable-next-line react-hooks/rules-of-hooks
const CongTrinhKenhViews = () => {
  const [mapCenter, setMapCenter] = useState([12.25967, 107.798345])
  const [mapZoom, setMapZoom] = useState(9.5)
  const [showLabel, setShowLabel] = useState(false)
  const [postSuccess, setPostSuccess] = useState(false)

  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState)
  }
  const [resData, setResData] = useState([])
  const [dataFiltered, setDataFiltered] = useState([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const initParamfilter = useState({
    page: router?.query?.page,
    tenct: '',
    loai_ct: 0,
    huyen: 0,
    xa: 0,
    song: 0,
    luuvuc: 0,
    tieu_luuvuc: 0,
    tang_chuanuoc: 0,
    nguonnuoc_kt: ''
  })
  const columnsTable: TableColumn[] = [
    { id: 'stt', label: 'STT' },
    {
      id: 'tenCT',
      label: 'Tên công trình',
      rowspan: 2,
      pinned: 'left',
      minWidth: 150,
      elm: (row: any) => (
        <Typography className='btnShowFilePdf' onClick={() => zoomConstruction(ConverterCood(row?.y, row?.x))}>
          {row?.tenCT}
        </Typography>
      )
    },
    {
      id: 'Diadiem',
      label: 'Địa điểm',
      align: 'center',
      minWidth: 200,
      colspan: 2,
      children: [
        {
              id: 'xa',
              label: (
                <span>
                  {' '}
                  Xã <br />  
                </span>
              ),
              align: 'center'
            },
          {
        id: 'huyen',
        label: (
          <span>
            {' '}
            Huyện <br />   
          </span>
        ),
        align: 'center'
      },
    ]
    },
    {
      id: 'tenCT',
      label: 'Nhiệm vụ chính',
      rowspan: 2,
      pinned: 'left',
      minWidth: 150,
   },
    {
      id: 'viTriCT',
      label: (
        <span>
          {' '}
          Tọa độ đập chính <br /> (VN2000) 
        </span>
      ),
      colspan: 2,
      children: [
        {
              id: 'BD1',
              label: (
                <span>
                  {' '}
                  X <br />  
                </span>
              ),
              align: 'center'
            },
          {
        id: 'BD2',
        label: (
          <span>
            {' '}
            Y <br />   
          </span>
        ),
        align: 'center'
      },
    ]
    },

    {
      id: 'mucnuocho',
      label: 'Thông số hồ chứa',
      colspan: 6,
      children: [
        {
              id: 'dientichLV',
              label: (
                <span>
                  {' '}
                  Diện tích <br /> lưu vực <br /> (km2)
                </span>
              ),
              align: 'center'
        },
      {
        id: 'dientichtuoi',
        label: (
          <span>
            {' '}
            Diện tích <br /> tưới <br /> (km2)
          </span>
        ),
        align: 'center'
      },

      {
        id: 'dungtichtoanbo',
        label: (
          <span>
            {' '}
            Dung tích <br /> toàn bộ <br /> (triệu m3)
          </span>
        ),
        align: 'center'
      },
      {
        id: 'mnc',
        label: (
          <span>
            {' '}
            MNC <br /> (m) <br /> 
          </span>
        ),
        align: 'center'
      },
      {
        id: 'mndbt',
        label: (
          <span>
            {' '}
            MNDBT <br /> (m) <br /> 
          </span>
        ),
        align: 'center'
      },
      {
        id: 'MNGC',
        label: (
          <span>
            {' '}
            MNGC <br /> (m) <br /> 
          </span>
        ),
        align: 'center'
      },
    ]
  },

  {
    id: 'mucnuocho',
    label: 'Đập chính',
    colspan: 3,
    children: [
      {
            id: 'dientichLV',
            label: (
              <span>
                {' '}
                Cao trình <br /> đỉnh đập <br /> (m)
              </span>
            ),
            align: 'center'
          },
    {
      id: 'chieucaodap',
      label: (
        <span>
          {' '}
          Chiều cao <br /> đập Hmax <br /> (m)
        </span>
      ),
      align: 'center'
    },

    {
      id: 'chieudaidap',
      label: (
        <span>
          {' '}
          Chiều dài <br /> đập <br /> (m)
        </span>
      ),
      align: 'center'
    }, 
  ]
},
 
   
    {
      id: 'DapPhu',
      label: (
        <span>
          {' '}
          Đập phụ <br /> (số lượng) <br /> 
        </span>
      ),
      rowspan: 2,
      align: 'left',
      minWidth: 150,
      elm: (row: any) => <span>{row?.mucDichKT}</span>
    },
   
 
    {
      id: 'thongso',
      label: 'Cống lấy nước',
      align: 'left',
      children: [
        {
          id: 'kichthuoc',
          label: 'Kích thước',
          align: 'left',
          elm: (row: any) => row?.thongso?.capCT
        },
        {
          id: 'hinthuc',
          label: (
            <span>
              hình thức
              <br />
              (có áp/không áp)
            </span>
          ),
          align: 'left',
          elm: (row: any) => row?.thongso?.dienTichLuuVuc
        },
    
      ]
    },

    //tran xa lu
    {
      id: 'giayphep',
      label: 'Tràn xả lũ',
      align: 'left',
      children: [
        {
          id: 'caotrinhnguongtran',
          label: (
            <span>
              Cao trình
              <br />
              Ngưỡng tràn
              <br />
              (m)
            </span>
          ),
          align: 'left',
          elm: (row: any) => row?.thongso?.dienTichLuuVuc
        },
        {
          id: 'kichthuoc',
          label: (
            <span>
              Kích thước
              <br />
              X * Y
              <br />
              (m)
            </span>
          ),
          align: 'left',
          elm: (row: any) => row?.thongso?.dienTichLuuVuc
        },
        {
          id: 'kichthuoc',
          label: (
            <span>
              Hình thức
              <br />            
            </span>
          ),
          align: 'left',
          elm: (row: any) => row?.thongso?.dienTichLuuVuc
        },
      ]
    },
    {
      id: 'giayphep',
      label: 'Phân loại công trình',
      align: 'left',
      children: [
        {
          id: 'lon',
          label: (
            <span>
              Lớn
              <br />
            </span>
          ),
          align: 'left',
          elm: (row: any) => row?.thongso?.dienTichLuuVuc
        },
        {
          id: 'kichthuoc',
          label: (
            <span>
              Vừa
              <br />
            </span>
          ),
          align: 'left',
          elm: (row: any) => row?.thongso?.dienTichLuuVuc
        },
        {
          id: 'kichthuoc',
          label: (
            <span>
              Nhỏ
              <br />
            </span>
          ),
          align: 'left',
          elm: (row: any) => row?.thongso?.dienTichLuuVuc
        },
      ]
    },

    {
      id: 'namxaydung',
      label: (
        <span>
          Năm xây dựng
          <br />            
        </span>
      ),
      align: 'left',
    
    },
    {
      id: 'donviquanly',
      label: (
        <span>
          Đơn vị quản lý
          <br />            
        </span>
      ),
      align: 'left',
    
    },
    { id: 'actions', label: 'Thao tác', align: 'center', pinned: 'right' }
  ]

  const [initConsType, setInitConstype] = useState<any>([
    'nuocmat',
    'thuydien',
    'hochua',
    'trambom',
    'tramcapnuoc',
    'conglaynuoc',
    'nhamaynuoc'
  ])

  const isMounted = useRef(true)

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    const getDataConstructions = async () => {
      setLoading(true)
      getData('cong-trinh/danh-sach', initParamfilter)
        .then(data => {
          if (isMounted.current) {
            setResData(data)
          }
        })
        .catch(error => {
          console.error(error)
        })
        .finally(() => {
          setLoading(false)
        })
    }
    getDataConstructions()
  }, [postSuccess, initParamfilter])

  useEffect(() => {
    const filteredData = resData.filter((item: { [key: string]: any }) =>
      initConsType.some((keyword: any) =>
        item['loaiCT']?.['maLoaiCT']?.toString().toLowerCase().includes(keyword.toLowerCase())
      )
    )
    setDataFiltered(filteredData)
  }, [initConsType, resData])

  const zoomConstruction = (coords: any) => {
    setMapCenter(coords)
    setMapZoom(13)
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  const handleConsTypeChange = (data: any) => {
    setInitConstype(data)
  }

  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={12} sx={{ height: '55vh', overflow: 'hidden' }}>
        <Paper elevation={3} sx={{ height: '100%', position: 'relative' }}>
          <Box className='map-legend' sx={{ background: 'white', px: 2, zIndex: 999, height: 'auto', top: '15px' }}>
            <FormGroup>
              <FormControlLabel
                sx={{ m: 0 }}
                control={<Checkbox sx={{ p: 1 }} onClick={() => setShowLabel(!showLabel)} />}
                label='Hiển thị tên công trình'
              />
            </FormGroup>
            <MapLegend onChange={handleConsTypeChange} />
          </Box>
          <Map center={mapCenter} zoom={mapZoom} showLabel={showLabel} mapData={dataFiltered} loading={false} />
        </Paper>
      </Grid>
      <Grid xs={12} md={12}>
        <Paper elevation={3} sx={{ p: 0, height: '100%' }}>
          <ConstructionToolBar page={router?.query?.page || null} />
          <TableComponent
            id='cong-trinh_nuoc-mat'
            columns={columnsTable}
            rows={resData}
            loading={loading}
            pagination
            actions={(row: any) => (
              <Box className='group_btn'>
                <FormCongTrinh />
                <DeleteData url={'cong-trinh'} data={row} setPostSuccess={handlePostSuccess} />
              </Box>
            )}
          />
        </Paper>
      </Grid>
    </Grid>
  )
}

export default CongTrinhKenhViews
