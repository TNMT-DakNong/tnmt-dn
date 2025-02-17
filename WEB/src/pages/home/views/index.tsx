import React, { useEffect, useRef, useState } from 'react'
import Grid from '@mui/material/Grid'
import ConstructionStatus from 'src/pages/home/views/cons-status'
import RealTime from 'src/pages/home/views/real-time'
import CountLicense from 'src/pages/home/views/count-license'
import CountLicenseFee from 'src/pages/home/views/count-license-fee'
import HomeMap from 'src/pages/home/views/map'
import { getData } from 'src/api/axios'
import { useRequireAuth } from 'src/@core/hooks/useRequireAuth'
import jwt_decode from 'jwt-decode'

interface DecodedToken {
  [key: string]: any
}

const HomeViews = () => {
  const [lcFee, setLicFee] = useState({ btnmt: [], ubnd: [] })
  const [lic, setLic] = useState({ total: 0, btnmt: 0, ubnd: 0 })
  const [loading, setLoading] = useState(false)

  const isMounted = useRef(true)

  const { getAuthToken } = useRequireAuth()
  const token = getAuthToken()
  const [role, setRole] = useState<string | null>(null)
  useEffect(() => {
    if (token) {
      const decodedToken = jwt_decode(token) as DecodedToken
      setRole(decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'])
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const getDataLicenseFees = async () => {
    setLoading(true)
    try {
      const btnmtData = await getData('tien-cap-quyen/danh-sach', { startDate: 0, endDate: 0, coquan_cp: 'bo-cap' })
      const ubndData = await getData('tien-cap-quyen/danh-sach', { startDate: 0, endDate: 0, coquan_cp: 'tinh-cap' })

      if (isMounted.current) {
        setLicFee({ btnmt: btnmtData, ubnd: ubndData })
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const getDataLicenses = async () => {
    try {
      const data = await getData('giay-phep/dem-theo-co-quan-cp')
      if (isMounted.current) {
        setLic({ total: data.total, btnmt: data.btnmt, ubnd: data.ubndt })
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    getDataLicenseFees()
    getDataLicenses()
  }, [])

  return role == 'Construction' ? (
    <HomeMap />
  ) : (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <RealTime />
      </Grid>
      <Grid item xs={12} md={4}>
        <Grid item xs={12} md={12}>
          <ConstructionStatus />
        </Grid>
        <Grid item xs={12} md={12} sx={{ marginTop: 5 }}>
          <CountLicense data={lic} loading={loading} />
        </Grid>
        <Grid item xs={12} md={12} sx={{ marginTop: 5 }}>
          <CountLicenseFee data={lcFee} loading={loading} />
        </Grid>
      </Grid>
      <Grid item xs={12} md={8}>
        <HomeMap />
      </Grid>
    </Grid>
  )
}

export default HomeViews
