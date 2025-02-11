import React, { useState, useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, LayersControl, Marker, Tooltip, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import ReactLeafletKml from 'react-leaflet-kml'
import { BingLayer } from '../bingmap'
import { fetchAndParseKML } from './utils'
import { Typography } from '@mui/material'
import DoanSongPopup from './popup-river'
import { ConverterCood } from './convert-coord'
import { useRouter } from 'next/router'
import DiemQuanTracPopup from './popup-dqt'

const { BaseLayer } = LayersControl

// Create icon for map marker
const createIcon = (url: any) => {
  return new L.Icon({
    iconUrl: url,
    iconSize: [18, 18],
    iconAnchor: [18, 18],
    popupAnchor: [-9, -18]
  })
}

// Set icon for cons type
const getIcon = (type: any) => {
  if (type || type !== null) {
    switch (type) {
      case 'Thuydien':
        return createIcon('/images/icon/thuydien.png')
        break
      case 'CCN':
        return createIcon('/images/icon/cumcn.png')
        break
      case 'Yte':
        return createIcon('/images/icon/cs_benhvien.png')
        break
      case 'TTTM':
        return createIcon('/images/icon/tttm.png')
        break
      case 'Khudancu':
        return createIcon('/images/icon/khudancu.png')
        break
      case 'Cang':
        return createIcon('/images/icon/cang.png')
        break
      case 'Congty':
        return createIcon('/images/icon/congty.png')
        break
      case 'Khachsan':
        return createIcon('/images/icon/khachsan.png')
        break
      default:
        return createIcon('/images/icon/marker.png')
        break
    }
  }
}
export default function MapDoanSong({
  center,
  zoom,
  selectedKmlFile,
  mapData,
  dischargeData,
  selectedFilter,
  filterData,
  showLabel,
  filterDatas,
  industrialZoneKmlFiles
}: any) {

  const router = useRouter()
  const pathSegments = router.pathname.split('/')

  const section = pathSegments[4]

  const [bing_key] = useState('AuhiCJHlGzhg93IqUH_oCpl_-ZUrIE6SPftlyGYUvr9Amx5nzA-WqGcPquyFZl4L')
  const [defaultKmls, setDefaultKmls] = useState<(Document | null)[]>([])
  const [selectedKmlData, setSelectedKmlData] = useState<Document | null>(null)
  const [filteredKmls, setFilteredKmls] = useState<(Document | null)[]>([])
  const [industrialZoneKmls, setIndustrialZoneKmls] = useState<(Document | null)[]>([])
  //const [markers, setMarkers] = useState<{ position: [number, number]; id: string; phanDoan: string;}[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const kmlKey = useMemo(() => `kml-${Date.now()}`, [selectedKmlFile, selectedFilter,industrialZoneKmls])

  useEffect(() => {
    const kmlFiles = ['/kml/doansong/phandoansong79song_QN.kml', '/kml/tinh-quangngai.kml']
    const loadKmlFiles = async () => {
      const loadedKmls = await Promise.all(kmlFiles.map(async file => await fetchAndParseKML(file)))
      setDefaultKmls(loadedKmls.filter(kml => kml !== null))
    }
    loadKmlFiles()
  }, [])

  useEffect(() => {
    const loadIndustrialZoneKmlFiles = async () => {
      if (industrialZoneKmlFiles && industrialZoneKmlFiles.length > 0) {
        const loadedKmls = await Promise.all(
          industrialZoneKmlFiles.map(async (file: string) => {
            const kmlDoc = await fetchAndParseKML(file)
            if (kmlDoc) editLineStyleColor(kmlDoc, 'FFFF00')
              
            return kmlDoc
          })
        )
        setIndustrialZoneKmls(loadedKmls.filter(kml => kml !== null))
      } else {
        setIndustrialZoneKmls([])
      }
    }
    loadIndustrialZoneKmlFiles()
  }, [industrialZoneKmlFiles])

  useEffect(() => {
    if (selectedKmlFile) {
      const loadSelectedKml = async () => {
        const kmlDoc = await fetchAndParseKML(selectedKmlFile)
        if (kmlDoc) editLineStyleColor(kmlDoc, 'FFFF00') // Example color: yellow
        setSelectedKmlData(kmlDoc)
      }
      loadSelectedKml()
    }
  }, [selectedKmlFile])

  useEffect(() => {
    const fetchFilteredKmls = async () => {
      if (selectedFilter && dischargeData) {
        const kmlFiles = dischargeData.map((data: any) => data.fileKML) // Use fileKML field from dischargeData
        const loadedKmls: any = await Promise.all(kmlFiles.map((file: string) => fetchAndParseKML(file)))

        loadedKmls.forEach((kml: any, index: any) => {
          if (kml) {
            const data = dischargeData[index]
            const color = data[selectedFilter] < 0 ? 'ff0000ff' : 'FFFF00'
            editLineStyleColor(kml, color)
          }
        })

        setFilteredKmls(loadedKmls.filter((kml: any) => kml !== null))
      } else {
        // If selectedFilter is undefined, clear filtered KMLs
        setFilteredKmls([])
      }
    }
    fetchFilteredKmls()
  }, [selectedFilter, dischargeData])

  const editLineStyleColor = (kmlDocument: Document, newColor: string) => {
    const lineStyles = kmlDocument != null ? kmlDocument.getElementsByTagName('LineStyle') : []
    for (let i = 0; i < lineStyles.length; i++) {
      const colorElement = lineStyles[i].getElementsByTagName('color')[0]
      if (colorElement) {
        colorElement.textContent = newColor
      }
    }
  }


  return (
    <MapContainer attributionControl={false} center={center} zoom={zoom} style={{ height: '100%' }} key={kmlKey}>
      <LayersControl position='bottomright'>
        <BaseLayer name='Bản đồ hành chính'>
          <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        </BaseLayer>
        <BaseLayer name='Bản đồ đường'>
          <BingLayer bingkey={bing_key} type='Road' />
        </BaseLayer>
        <BaseLayer checked name='Bản đồ vệ tinh'>
          <BingLayer bingkey={bing_key} type='AerialWithLabels' />
        </BaseLayer>
      </LayersControl>
      {/* 
      {markers.map((marker) => (
       <Marker
       icon={createIcon(marker.dischargeIndex < 0 ? '/images/icon/marker.png' : '/images/icon/marker-bt.png')}
       key={marker.id}
       position={marker.position}
     >
          <Tooltip direction='top' offset={[-10, -18]} opacity={1}>
            {marker.phanDoan}
          </Tooltip>
        </Marker>
      ))} */}

      {showLabel &&
        dischargeData.map((river: any, index: any) => {
          if (section === 'du-lieu-nguon-thai' || section === 'du-lieu-nguon-nhan') {
            // If 'section' is 'du-lieu-nguon-thai', render using 'phanDoanSong' coordinates
            const phanDoanSongCoords = ConverterCood(river?.phanDoanSong?.xDau, river?.phanDoanSong?.yDau)
            if (!phanDoanSongCoords) return null // Return null if coordinates are invalid

            return (
              <Marker
                key={index}
                position={[
                  ConverterCood(river?.phanDoanSong.xDau, river?.phanDoanSong.yDau)[0],
                  ConverterCood(river?.phanDoanSong.xDau, river?.phanDoanSong.yDau)[1]
                ]}
                icon={createIcon('/images/icon/marker.png')}>
                <Tooltip direction='top' offset={[-10, -18]} opacity={1} permanent>
                  {river.phanDoanSong.id}
                </Tooltip>
              </Marker>
            )
          } else {
            // Otherwise, render using the regular 'river' coordinates
            const regularCoords = ConverterCood(river?.xDau, river?.yDau)
            if (!regularCoords) return null // Return null if coordinates are invalid

            return (
              <Marker
                key={index}
                position={[regularCoords[0], regularCoords[1]]}
                icon={createIcon('/images/icon/marker.png')}>
                <Tooltip direction='top' offset={[-10, -18]} opacity={1} permanent>
                  {river.id}
                </Tooltip>
              </Marker>
            )
          }
        })}

      {selectedKmlFile != null && (
        <Marker icon={createIcon('/images/icon/marker.png')} key={1} position={center}>
          <Tooltip direction='top' offset={[-10, -18]} opacity={1}>
            {section === 'kha-nang-tiep-nhan-nuoc-thai-song'
              ? mapData.phanDoan
              : section === 'tai-luong-o-nhiem'
              ? mapData.phanDoan
              : section === 'du-lieu-nguon-nhan'
              ? mapData.phanDoanSong.phanDoan
              : section === 'du-lieu-nguon-thai'
              ? mapData.phanDoanSong.phanDoan
              : ''}
          </Tooltip>

          <Popup>
            <Typography sx={{ color: '#035291', textAlign: 'center', fontWeight: 'bold', margin: '0 !important' }}>
              {section === 'kha-nang-tiep-nhan-nuoc-thai-song'
                ? mapData.phanDoan
                : section === 'tai-luong-o-nhiem'
                ? mapData.phanDoan
                : section === 'du-lieu-nguon-nhan'
                ? mapData.phanDoanSong.phanDoan
                : section === 'du-lieu-nguon-thai'
                ? mapData.phanDoanSong.phanDoan
                : ''}
            </Typography>
            <DoanSongPopup popupData={mapData} />
          </Popup>
        </Marker>
      )}

      {filterData &&
        filterData?.map((data: any) => {
          if (data.toaDoX !== null || data.toaDoY !== null) {
            return (
              <Marker
                icon={getIcon(data.loai || '')}
                key={data.id}
                position={[ConverterCood(data?.toaDoY, data?.toaDoX)[0], ConverterCood(data.toaDoY, data.toaDoX)[1]]}>
                <Popup>
                  <Typography
                    sx={{ color: '#035291', textAlign: 'center', fontWeight: 'bold', margin: '0 !important' }}>
                    {data.ten}
                  </Typography>
                  <Typography sx={{ textAlign: 'center', fontSize: 12, margin: '0 !important' }}>
                    Kinh độ (X):{data.toaDoY} &nbsp; Vĩ độ (Y):{data.toaDoX}
                  </Typography>
                  <Typography sx={{ textAlign: 'center', fontSize: 12, margin: '0 !important' }}>
                    Vị trí: {data.viTri}
                  </Typography>
                </Popup>
              </Marker>
            )
          } else return null
        })}

      {filterDatas &&
        filterDatas?.map((data: any) => {
          if (data.diemQuanTrac.toaDoX !== null || data.diemQuanTrac.toaDoY !== null) {
            return (
              <Marker
                icon={createIcon('/images/icon/marker.png')}
                key={data.id}
                position={[
                  ConverterCood(data?.diemQuanTrac.toaDoY, data?.diemQuanTrac.toaDoX)[0],
                  ConverterCood(data.diemQuanTrac.toaDoY, data.diemQuanTrac.toaDoX)[1]
                ]}>
                <Popup>
                  <Typography
                    sx={{ color: '#035291', textAlign: 'center', fontWeight: 'bold', margin: '0 !important' }}>
                    {data.diemQuanTrac.tenDiemDo}
                  </Typography>
                  <Typography sx={{ textAlign: 'center', fontSize: 12, margin: '0 !important' }}>
                    Kinh độ (X):{data.diemQuanTrac.toaDoX} &nbsp; Vĩ độ (Y):{data.diemQuanTrac.toaDoY}
                  </Typography>
                  <Typography sx={{ textAlign: 'center', fontSize: 12, margin: '0 !important' }}>
                    Vị trí điểm đo:{data.diemQuanTrac.viTriQuanTrac}
                  </Typography>
                  <DiemQuanTracPopup popupData={data} />
                </Popup>
              </Marker>
            )
          } else return null
        })}

      {defaultKmls?.map((kml, index) => kml && <ReactLeafletKml key={`default-${index}`} kml={kml} />)}
      {selectedKmlData && <ReactLeafletKml kml={selectedKmlData} key={`selected-${Date.now()}`} />}
      {filteredKmls?.map(kml => kml && <ReactLeafletKml key={`filtered-${Date.now()}`} kml={kml} />)}
      {industrialZoneKmls.map((kml) => kml && <ReactLeafletKml key={`industrial-kml-${Date.now()}`} kml={kml} />)}
    </MapContainer>
  )
}
