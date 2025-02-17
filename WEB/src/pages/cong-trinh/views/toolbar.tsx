import { Replay, Search } from '@mui/icons-material'
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Toolbar,
  Autocomplete,
  ListSubheader
} from '@mui/material'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import FormCongTrinh from 'src/pages/cong-trinh/views/form'
import { useRouter } from 'next/router'
import { getData } from 'src/api/axios'
import GetConstructionTypeId from 'src/@core/components/get-construction-type'
import ExportTableToExcel from 'src/@core/components/export-excel/export-csv'

interface ConstructionToolBarProps {
  page: string | string[] | null
}

const ConstructionToolBar: FC<ConstructionToolBarProps> = ({ page }) => {
  // const [postSucceed, setPostSucceed] = useState(false)
  const router = useRouter()
  const [consTypes, setConsTypes] = useState([])
  const [districts, setDistricts] = useState([])
  const [communes, setCommunes] = useState([])

  const [paramsFilter, setParamsFilter] = useState({
    page: page,
    tenct: '',
    loai_ct: GetConstructionTypeId(router),
    huyen: 0,
    xa: 0,
    song: 0,
    luuvuc: 0,
    tieu_luuvuc: 0,
    tang_chuanuoc: 0,
    nguonnuoc_kt: ''
  })

  const handleChange = (event: SelectChangeEvent | ChangeEvent<HTMLInputElement> | null) => (column: string) => {
    if (event) {
      if (event?.target) {
        setParamsFilter({ ...paramsFilter, [column]: event.target.value })
      } else {
        setParamsFilter({ ...paramsFilter, [column]: event })
      }
    }
  }

  // const handlePostSuccess = () => {
  //   setPostSucceed(prevState => !prevState)
  //   onChange(paramsFilter, postSucceed)
  // }

  const applyFilterChange = () => {
    router.push({
      pathname: router.pathname,
      query: paramsFilter
    })
  }

  const reloadData = () => {
    setParamsFilter(() => {
      const newParamsFilter = {
        page: page,
        tenct: '',
        loai_ct: GetConstructionTypeId(router),
        huyen: 0,
        xa: 0,
        song: 0,
        luuvuc: 0,
        tieu_luuvuc: 0,
        tang_chuanuoc: 0,
        nguonnuoc_kt: ''
      }

      return newParamsFilter
    })
  }

  useEffect(() => {
    let isMounted = true

    const getDataForSelect = async () => {
      try {
        // constructiom type
        const ConsTypesData = await getData('#')

        // district
        const districtsData = await getData('#')

        if (paramsFilter.huyen > 0) {
          // comunnes
          const comunnesData = await getData(`#`)
          if (isMounted) {
            setCommunes(comunnesData)
          }
        }

        if (isMounted) {
          setConsTypes(
            ConsTypesData.map((item: any) => {
              const section = router.pathname.split('/')[4]
              switch (section) {
                case 'nuoc-mat':
                  if (item.idCha === 1) {
                    return item
                  }
                  break
                case 'nuoc-duoi-dat':
                  if (item.idCha === 2) {
                    return item
                  }
                  break
                case 'xa-thai':
                  if (item.idCha === 3) {
                    return item
                  }
                  break
                default:
                  const children =
                    item.idCha === 0 ? ConsTypesData.filter((childItem: any) => childItem.idCha === item.id) : []
                  const res = { ...(item.idCha === 0 ? { ...item, children } : undefined) }

                  return res
                  break
              }
            })
          )
          setDistricts(districtsData)
        }
      } catch (error) {
        console.log(error)
      }
    }

    getDataForSelect()

    return () => {
      isMounted = false
    }
  }, [paramsFilter.huyen, router.pathname])

  return (
    <Toolbar variant='dense'>
      <Grid container spacing={2} sx={{ paddingY: 3 }}>
        <Grid item xs={12} md={3} py={0}>
          <TextField
            sx={{ p: 0 }}
            size='small'
            fullWidth
            variant='outlined'
            placeholder='Tên công trình...'
            onChange={(e: any) => handleChange(e)('tenct')}
          />
        </Grid>
        <Grid item xs={12} md={2} py={0}>
          <FormControl size='small' fullWidth>
            <InputLabel id='license-type-select'>Loại công trình</InputLabel>
            <Select
              labelId='license-type-select'
              id='demo-select-small'
              value={paramsFilter.loai_ct > 3 ? paramsFilter.loai_ct : GetConstructionTypeId(router)}
              label='Loại công trình'
              onChange={(e: any) => handleChange(e)('loai_ct')}>
              <MenuItem value={GetConstructionTypeId(router)}>Loại công trình</MenuItem>
              {router.pathname.split('/')[4] == 'nuoc-mat' ||
              router.pathname.split('/')[4] == 'nuoc-duoi-dat' ||
              router.pathname.split('/')[4] == 'xa-thai'
                ? consTypes
                    .filter((item: any) => item !== undefined)
                    .map((e: any, i: number) => [
                      <MenuItem key={i} value={e.id}>
                        {e.tenLoaiCT}
                      </MenuItem>
                    ])
                : consTypes
                    .filter((item: any) => item?.children)
                    .map((e: any, i: number) => [
                      <ListSubheader key={`subheader-${i}`}>{e.tenLoaiCT}</ListSubheader>,
                      ...e.children.map((child: any, j: number) => (
                        <MenuItem key={`child-${j}`} value={child.id}>
                          {child.tenLoaiCT}
                        </MenuItem>
                      ))
                    ])}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={2} py={0}>
          <Autocomplete
            size='small'
            fullWidth
            options={districts}
            getOptionLabel={(option: any) => option.tenHuyen}
            value={districts.find((item: any) => item.idHuyen === paramsFilter.huyen) || null}
            onChange={(_, newValue) => {
              handleChange(newValue?.idHuyen)('huyen')
            }}
            clearOnEscape={true}
            renderInput={params => <TextField {...params} label='Huyện' variant='outlined' />}
          />
        </Grid>
        <Grid item xs={12} md={2} py={0}>
          <Autocomplete
            size='small'
            disabled={paramsFilter.huyen <= 0}
            fullWidth
            options={communes}
            getOptionLabel={(option: any) => option.tenXa}
            value={communes.find((item: any) => item.idXa === paramsFilter.xa) || null}
            onChange={(_, newValue) => {
              handleChange(newValue?.idXa)('xa')
            }}
            clearOnEscape={true}
            renderInput={params => <TextField {...params} label='Xã' variant='outlined' />}
          />
        </Grid>
        <Grid item xs={12} md={3} py={0}>
          <TextField
            sx={{ p: 0 }}
            size='small'
            fullWidth
            variant='outlined'
            placeholder='Nguồn nước khai thác...'
            onChange={(e: any) => handleChange(e)('nguonnuoc_kt')}
          />
        </Grid>

        <Grid item xs={6} md={1.5} py={0}>
          <Button variant='outlined' size='small' fullWidth startIcon={<Search />} onClick={applyFilterChange}>
            Tìm kiếm
          </Button>
        </Grid>
        <Grid item xs={6} md={1.5} py={0}>
          <Button variant='outlined' size='small' fullWidth startIcon={<Replay />} onClick={reloadData}>
            Tải lại
          </Button>
        </Grid>

        {router.pathname.split('/')[4] == 'nuoc-mat' ||
        router.pathname.split('/')[4] == 'nuoc-duoi-dat' ||
        router.pathname.split('/')[4] == 'xa-thai' ? (
          <>
            <Grid item xs={6} md={1.5} py={0}>
              <FormCongTrinh />
            </Grid>
            <Grid item xs={6} md={1.5} py={0}>
              <ExportTableToExcel
                tableId={`${router.pathname.split('/')[3]}_${router.pathname.split('/')[4]}`}
                filename={`${router.pathname.split('/')[3]}_${router.pathname.split('/')[4]}`}
              />
            </Grid>
          </>
        ) : (
          ''
        )}
      </Grid>
    </Toolbar>
  )
}

export default ConstructionToolBar
